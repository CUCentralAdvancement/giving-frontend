# Authorize.net Payment Flow

This doc describes the implemented payment flow as originally described in:
https://developer.authorize.net/api/reference/features/accept_hosted.html

Notes will be made as to how the code relates to and differs from that document, however, you should read it
in detail before looking at this write-up since you are likely trying to fix a bug, and the linked
documentation may have changed rendering notes in the write-up void and useless.

## Call `getHostedPaymentPageRequest` to request a form token.

Authorize starts out with three steps they explain in more detail. At the beginning, there needs to be a call
to the Authorize Payment API that returns a token that the frontend can use while generating the payment page
screen.

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

1. The user fills out the `/checkout` form, and the submission handler is called.
1. A few more bits of data get added to the form data and set locally.
1. The `/api/authorize-token` endpoint is called where the form data is parsed and prefilled in the call to 
   `getHostedPaymentPageRequest`. A form token is returned from the Authorize API and sent back to the 
   frontend.

## Payment Page Load

To load the payment form, the Authorize API needs to communicate via an intermediary iframe to meet SAQ-A 
requirements. All the "magic" happens in a `useEffect` hook after the `/checkout/payment` screen loads.

```javascript
  useEffect(() => {
   // Don't run this code on the server.
   if (typeof document !== "undefined") {
      // Submits the form with token received from the Authorize API.
      document.querySelector("#send_token").submit();

      if (!window.AuthorizeNetIFrame) {
         window.AuthorizeNetIFrame = {};
         window.AuthorizeNetIFrame.onReceiveCommunication = function (querystr) {
            const params = parseQueryString(querystr);
            let iframe = {};
            let w = 0;
            let h = 0;
            switch (params["action"]) {
               case "successfulSave":
                  break;
               case "cancel":
                  router.push("/checkout").then(r => console.log(r));
                  break;
               case "resizeWindow":
                  w = parseInt(params["width"]);
                  h = parseInt(params["height"]);
                  iframe = document.getElementById("add_payment");
                  iframe.style.width = w.toString() + "px";
                  iframe.style.height = h.toString() + "px";
                  break;
               case "transactResponse":
                  iframe = document.getElementById("add_payment");
                  iframe.style.display = "none";

                  setTransactionDetails(JSON.parse(params["response"]));
                  router.push("/checkout/complete").then(r => console.log(r));
            }
         };
      }
   }
}, [router, setTransactionDetails]);
```

The different case statements are pretty self-explanatory. If the user cancels, they are sent back to the 
checkout screen. If the transaction succeeds, the user is sent to the checkout completion screen and 
payment information gets loaded from 

## Handling Errors

Handling errors is less straightforward.

@todo There needs to be a case for errors and tests for that: 
See. https://developer.authorize.net/api/reference/features/accept_hosted.html#Error_and_Fraud_Filter_Handling 

