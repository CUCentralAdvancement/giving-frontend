# Donation Lifecycle

This doc describes the lifecycle of an online donation. We have decided to represent it as a state machine using the AASM module syntax for Ruby (with some liberties taken). You can [view the AASM documentation here](https://github.com/aasm/aasm) and [check out this blog post](https://medium.com/geogo-in/state-machines-in-rails-5-45259a4f42da), but the general format is as follows:

- define all possible **_states_**
- define **_events_** together with their supported **_transitions_** (state changes)
- _events_ and _transitions_ can have one or more **_guards_**, or conditionals, that must return `true` or the event/transition will be denied.
  - We have used `if:` for these and not AASM's `guard:`. Both are technically supported, though.
- **_Callbacks_** can be added to _states_, _events_ and _transitions_ and triggered at various points in the event, like entering/exiting a state or after event has run.

```ruby
class Donation
  aasm do
  # --DEFINE STATES--
    state :gift_basket, initial: true
    state :checkout
    state :payment
    state :pending # => echeck donations only
    state :complete
    state :processed
    state :cancelled # => indicates pending/complete donation is cancelled/refunded, can be purged
    state :purge # => optional: indicates incomplete donation can be purged (criteria TBD)
    state :archive # => optional: indicates processed donation can be archived (process TBD)

    # --DEFINE EVENTS--

    # user can leave checkout flow at any point and add/remove/modify gifts
    event :modify_gifts do
      transitions from: [:gift_basket, :checkout, :payment], to: :gift_basket
    end
    
    event :checkout do
      # ":has_gifts" ensures they can't move to checkout if they've removed all gifts from basket
      transitions from: :gift_basket to: :checkout, if :has_gifts?
      # user can go back to previous step (checkout) from payment form, assumes ":has_gifts?" = true
      transitions from: :payment, to: :checkout
    end
    
    # ":checkout_valid" is placeholder for necessary validation (e.g. billing info complete)
    event :pay, if :checkout_valid? do
      # enable eCheck option ("Bank Account") if donation meets eCheck criteria
      transitions from: :checkout, to: :payment, if :meets_echeck_criteria? do
        after do
          loadPaymentForm({ echeck: enabled }) # pseudo-code for payment form function
        end
        # else load with eCheck option disabled.
      transitions from: :checkout, to: :payment do
        after do
          loadPaymentForm({ echeck: disabled })
        end
    end
    
    # on successful payment, change state based on payment accountType
    # after, run completion tasks (e.g. send donor notification emails)
    event :complete, if :payment_successful? do
      after do
        runCompletionTasks
      end
      # if echeck payment, use "pending" but still process donor notifications
      transitions from: :payment, to: :pending, if :is_echeck_payment?
      transitions from: :payment, to: :complete
    end
    
    # ---The following likely all happens in the Gateway app---

    # ":is_funded?" could be boolean on donation record
    # updates to true when payment hits bank account, which triggers event
    # could be determined via API, but may be manual at first (via checkbox on donation?)
    event :complete_echeck, if [:is_echeck_payment?, :is_funded?] do
      transitions from: :pending, to: :complete
    end
    
    # "process" event assumes a regular process of loading completed donations in Advance/Ascend
    # until Ascend is live, may require manual update from gifts team
    event :process do
      transitions from: :complete, to: :processed
    end
    
    # complete/pending donations may need to be "cancelled"
    # once cancelled, donation can safely be purged
    event :cancel do
      # if cancellation requires refund (most will), use API to trigger refund
      transitions from: [:pending, :complete], to: :cancelled, if: :requires_refund? do
        after do
          refundPayment
        end
      end
      # if no refund is required for some reason, just change state
      transitions from: [:pending, :complete], to: :cancelled
    end
    
    # any Donation not pending, complete or processed is subject to purge (criteria TBD)
    event :purge do
      transitions from: [:gift_basket, :checkout, :payment, :cancelled], to: :purge
    end
    
    # only Donations that reach "Processed" can be archived (process TBD)
    event :archive do
      transitions from: :processed, to: :archive
    end
    
    # ---PSEUDO-METHODS FOR CALLBACKS USED ABOVE---

    def meets_echeck_criteria?
      # run echeck criteria validation
        # - donation total <= $10k
        # - donation is not recurring
        # - gifts do not include license plate fund
    end
    
    def payment_successful?
      payment.last["responseCode"] == 1
    end
    
    def is_echeck_payment?(paymentAccountType)
      paymentAccountType == :eCheck
    end

    def requires_refund?
      # not sure where/how this would be indicated. In future, Ascend likely has status or trigger.
      donation.refund == true
    end

    def is_funded?
      donation.funded == true
    end

  end
end

# --RUN EVENTS AND VALIDATE RESPONSE--

# CREATE NEW ORDER
donation = Order.new
donation.aasm.current_state # => gift_basket
donation.may_modify_gifts? # => true
donation.may_checkout?  # => true
donation.may_pay? # => false
donation.may_complete? # => false
donation.may_complete_echeck? # => false
donation.may_process? # => false
donation.may_cancel? # => false
donation.may_purge? # => true
donation.may_archive? # => false

# MODIFY GIFT BASKED
donation.modify_gifts
donation.aasm.current_state # => gift_basket
donation.may_modify_gifts? # => true
donation.may_checkout?  # => true
donation.may_pay? # => false
donation.may_complete? # => false
donation.may_complete_echeck? # => false
donation.may_process? # => false
donation.may_cancel? # => false
donation.may_purge? # => true
donation.may_archive? # => false

# PROCEED TO CHECKOUT
donation.checkout
donation.aasm.current_state # => checkout
donation.may_modify_gifts? # => true
donation.may_pay? # => true
donation.may_complete? # => false
donation.may_complete_echeck? # => false
donation.may_process? # => false
donation.may_cancel? # => false
donation.may_purge? # => true
donation.may_archive? # => false

# PROCEED TO PAYMENT
donation.pay
donation.aasm.current_state # => payment
donation.may_modify_gifts? # => true
donation.may_checkout?  # => true
donation.may_complete? # => true
donation.may_complete_echeck? # => false
donation.may_process? # => false
donation.may_cancel? # => false
donation.may_purge? # => true
donation.may_archive? # => false

# COMPLETE PAYMENT -- CREDIT CARD
donation.complete(:Visa)
donation.aasm.current_state # => complete
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete_echeck? # => false
donation.may_process? # => true
donation.may_purge? # => true
donation.may_archive? # => false
donation.may_cancel? # => true
donation.may_purge? # => false
donation.may_archive? # => false

# COMPLETE PAYMENT -- ECHECK
donation.complete(:eCheck)
donation.aasm.current_state # => pending
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete_echeck? # => true
donation.may_process? # => false
donation.may_cancel? # => true
donation.may_purge? # => false
donation.may_archive? # => false

# MOVE PENDING TO COMPLETED -- CREDIT CARD
donation.complete_echeck(:Visa) # => raises AASM::InvalidTransition

# MOVE PENDING TO COMPLETED -- ECHECK
donation.complete_echeck(:eCheck)
donation.aasm.current_state # => complete
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete # => false
donation.may_process? # => true
donation.may_cancel? # => true
donation.may_purge? # => false
donation.may_archive? # => false

# PROCESS DONATION
donation.process
donation.aasm.current_state # => processed
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete # => false
donation.may_complete_echeck? # => false
donation.may_cancel? # => false
donation.may_purge? # => false
donation.may_archive? # => true

# CANCEL DONATION
donation.cancel
donation.aasm.current_state # => cancelled
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete # => false
donation.may_complete_echeck? # => false
donation.may_purge? # => true
donation.may_archive? # => false

# PURGE DONATION
donation.purge
donation.aasm.current_state # => purge
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete # => false
donation.may_complete_echeck? # => false
donation.may_cancel? # => false
donation.may_archive? # => false

# ARCHIVE DONATION
donation.archive
donation.aasm.current_state # => archive
donation.may_modify_gifts? # => false
donation.may_checkout?  # => false
donation.may_pay? # => false
donation.may_complete # => false
donation.may_complete_echeck? # => false
donation.may_cancel? # => false
donation.may_purge? # => false
```
