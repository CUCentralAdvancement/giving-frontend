# Authorize.net Payment Flow

This doc describes the implemented payment flow as originally described in:
https://developer.authorize.net/api/reference/features/accept_hosted.html

Notes will be made as to how the code relates to and differs from that document,
however, you should read it in detail before looking at this write-up since
you are likely trying to fix a bug and the linked documentation may have changed
rendering notes in the write-up void and useless.

## Call `getHostedPaymentPageRequest` to request a form token.

Authorize starts out with three steps they explain in more detail. At the beginning,
there needs to be a call to the Authorize payment API that returns a token that the
frontend can use while generating the payment page screen.

```javascript
// Form submission handler for /checkout.
function submitHandler(data) {
  let description = "";
  let orderTotal = 0.0;
  cart.forEach((item) => {
    // ...
  });
  data.description = description;
  data.amount = orderTotal;
  data.invoiceNumber = uuidv4().slice(0, 8);
  setGivingInfo(data);

  fetch("/api/authorize-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      setAuthorizeNetToken(data.token);
      router.push("/checkout/payment");
    });
}
```

Let's go through what happens in the code snippet step-by-ste:

1. The user fills out the `/checkout` form and the submission handler is called.
1. A few more bits of data get added to the form data and set locally.
1. The `/api/authorize-token` endpoint is called where the form data is parsed
and prefilled in the iframe form. A form token is returned afet making a Call 
   to the Authorize API. 
1. The `/checkout/payment` page loads using the token to 
The call to `getHostedPaymentPageRequest` happens in the
