import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  countryOptionsList,
  giftNamePrefixOptions,
  giftStateOptions,
  reocurringGiftFrequencyOptions,
} from '../../data/donationForm';
import DonationButton from '../forms/DonationButton';
import { fundProps } from '../../data/types';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../data/contexts/UserContext';

DefaultGivingForm.propTypes = {
  fund: fundProps,
};

export default function DefaultGivingForm({ fund }) {
  const { query } = useRouter();
  const { dispatch } = useContext(UserContext);
  const router = useRouter();
  const { register, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      'giving-amount': query.amount ?? '50',
      'in-honor-of': 'No',
      'honor-memory-select': 'memory',
      'gift-country': 'US',
      'recurring-gift': typeof query.recurring !== 'undefined',
    },
  });
  const [givingAmount, setGivingAmount] = useState(query.amount ?? fund.suggested_amount ?? '50');
  const [suggestedAmount, setSuggestedAmount] = useState(fund.suggested_amount);
  const [defaultGivingAmounts, setDefaultGivingAmounts] = useState(['50', '100', '250', '500']);
  const [inHonorOf, setInHonorOf] = useState('No');
  const honorMemorySelect = watch('honor-memory-select');
  const recurringGift = watch('recurring-gift');

  // Set form values from query parameters.
  useEffect(() => {
    if (query.amount) {
      // Remove the amount from the list and place in "suggested amount".
      if (defaultGivingAmounts.includes(query.amount)) {
        setDefaultGivingAmounts(defaultGivingAmounts.filter((el) => el !== query.amount));
      }
      setSuggestedAmount(query.amount);
      setGivingAmount(query.amount);
    }

    if (query.recurring) {
      setValue('recurring-gift', true);
      setValue('recurring-gift-frequency', reocurringGiftFrequencyOptions.map(el => el.value).includes(query.recurring) ? query.recurring : '_none');
    }
  }, [defaultGivingAmounts, query.amount, query.recurring, setValue]);

  function updateTheButton(name, value) {
    switch (name) {
      case 'giving-amount':
      case 'suggested-amount':
        setGivingAmount(value);
        break;
      case 'in-honor-of':
        setInHonorOf(value);
        break;
    }
  }

  function submitHandler(action) {
    let data = getValues();
    data.allocation_code = fund.allocation_code;
    data.fund_route = router.asPath;
    data.fund_title = fund.title;
    data.fund_campus = fund.campus;

    // Two conditions for the amount. Suggested amount always === givingAmount.
    if (data['other-amount'] !== '') {
      data['giving-amount'] = data['other-amount'];
    } else {
      data['giving-amount'] = givingAmount;
    }

    dispatch({ type: 'add_to_gift_basket', payload: data });

    switch (action) {
      case 'add_to_basket':
        router.push('/cart');
        break;
      case 'give_now':
        router.push('/checkout');
        break;
    }
  }

  function dummySubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(dummySubmit)}>
      <h3 className='mb-3 text-xl'>I would like to give:</h3>
      <div data-testid='giving-amount-options'>
        <div className={suggestedAmount !== null
          ? 'visible grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-2'
          : 'hidden grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-2'}>
          <DonationButton
            key='other'
            name='suggested-amount'
            testId='suggested-amount'
            label={`$${suggestedAmount}`}
            value={suggestedAmount}
            selected={suggestedAmount === givingAmount}
            updateButton={updateTheButton}
          />
          <span className='col-span-3 text-xl font-bold pt-2 text-gray-600'>Suggested Amount</span>
        </div>
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-2'>
          {defaultGivingAmounts.map((value) => (
            <DonationButton
              key={value}
              name='giving-amount'
              testId={`giving-amount-${value}`}
              label={`$${value}`}
              value={value}
              selected={givingAmount === value}
              updateButton={updateTheButton}
            />
          ))}
        </div>
      </div>
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-2'>
        <DonationButton
          key='other'
          name='giving-amount'
          testId='other-amount'
          label='Other'
          value='other'
          selected={givingAmount === 'other'}
          updateButton={updateTheButton}
        />
        <input
          {...register('other-amount')}
          className={givingAmount === 'other' ? 'visible col-span-3' : 'hidden'}
          type='text'
          placeholder='Other Amount'
        />
      </div>
      <div className='my-2'>
        <label>
          <input {...register('recurring-gift')} className='mr-2' type='checkbox' />
          Make this a recurring gift
        </label>
        <div className={'mt-2 ' + (recurringGift === true ? 'visible' : 'hidden')}>
          <select {...register('recurring-gift-frequency')} className='w-full' data-testid='recurring-gift-frequency'>
            {reocurringGiftFrequencyOptions.map((el, ind) => {
              return <option key={ind} value={el.value}>{el.label}</option>;
            })}
          </select>
          <div className='italic my-2 p-1 text-sm'>
            Please note: This will apply to all gifts in your Gift Basket. To make a separate one-time gift, or one
            with a different recurring schedule, you will need to complete this gift first.
          </div>
        </div>
      </div>
      <label className='align-middle'>
        <input {...register('pledge-payment')} type='checkbox' className='mr-2 align-middle' />
        This is a pledge payment
      </label>
      <div className='mt-2'>
        <h3 className='mt-4 mb-2 text-xl'>In Honor/Memory of:</h3>
        <label htmlFor='inHonorOf'>Is this gift in honor of or in memory of someone?</label>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 my-2'>
          {['No', 'Yes'].map((value) => (
            <DonationButton
              key={value}
              name='in-honor-of'
              testId={`in-honor-of-${value}`}
              label={value}
              value={value}
              selected={inHonorOf === value}
              updateButton={updateTheButton}
            />
          ))}
        </div>
        <div className={inHonorOf === 'Yes' ? 'visible' : 'hidden'}>
          <select {...register('honor-memory-select')} className='w-full'>
            <option value='memory'>In memory of</option>
            <option value='honor'>In honor of</option>
          </select>
          <div className='italic my-2 p-1 text-sm'>
            Only the honoree&apos;s name is required. All other fields below are optional, and allow us to notify the
            honoree, next of kin or contact.
          </div>
          <input
            {...register('honoree-name')}
            type='text'
            className={'w-full ' + (honorMemorySelect === 'memory' ? 'visible' : 'hidden')}
            placeholder="Honoree's Name"
          />
          <h3 className='mt-3'>
            {honorMemorySelect === 'honor' ? 'Honoree\'s Information' : 'Next of Kin/Contact Information'}
          </h3>
          <div className='grid grid-cols-1 gap-2 my-2'>
            <select {...register('gift-name-prefix')}>
              {giftNamePrefixOptions.map((el) => (
                <option key={el.label} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
            <div className='grid grid-cols-2 gap-2'>
              <input {...register('gift-first-name')} type='text' placeholder='First Name' />
              <input {...register('gift-last-name')} type='text' placeholder='Last Name' />
            </div>
            <select {...register('gift-country')}>
              {countryOptionsList.map((el) => (
                <option key={el.label} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
            <input {...register('gift-address-one')} type='text' placeholder='Address 1' />
            <input {...register('gift-address-two')} type='text' placeholder='Address 2' />
            <input {...register('gift-city')} type='text' placeholder='City' />
            <div className='grid grid-cols-2 gap-2'>
              <select name='gift-state'>
                {giftStateOptions.map((el) => (
                  <option key={el.label} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              <input {...register('gift-zip-code')} type='text' placeholder='Zip Code' />
            </div>
            <input {...register('email')} type='text' placeholder='Email' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-3 gap-4'>
        <button
          className='bg-black text-white p-2'
          data-testid='add-to-basket-button'
          onClick={() => {
            submitHandler('add_to_basket');
          }}
        >
          Add to Basket
        </button>
        <button
          className='bg-black text-white p-2'
          data-testid='give-now-button'
          onClick={() => {
            submitHandler('give_now');
          }}
        >
          Give Now
        </button>
      </div>
    </form>
  );
}

