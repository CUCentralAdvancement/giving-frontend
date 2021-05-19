"use strict";

const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;

export default async (req, res) => {
  // console.log(req);
  const data = req.body;

  const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(
    process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN_ID
  );
  merchantAuthenticationType.setTransactionKey(
    process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY
  );

  const transactionRequest = new ApiContracts.TransactionRequestType();
  transactionRequest.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transactionRequest.setAmount(data.amount);
  transactionRequest.setOrder({
    invoiceNumber: data.invoiceNumber,
    description: data.description,
  });
  transactionRequest.setBillTo({
    firstName: data.firstName,
    lastName: data.lastName,
    company: data.companyName,
    address: data.addressLine1,
    city: data.addressCity,
    state: data.addressState,
    zip: data.addressZip,
    country: data.addressCountry,
    phoneNumber: data.preferredPhone,
  });

  const paymentButtonOptions = new ApiContracts.SettingType();
  paymentButtonOptions.setSettingName("hostedPaymentButtonOptions");
  paymentButtonOptions.setSettingValue('{"text": "Pay"}');

  const billingAddressOptions = new ApiContracts.SettingType();
  billingAddressOptions.setSettingName("hostedPaymentBillingAddressOptions");
  billingAddressOptions.setSettingValue('{"show": false}');

  const paymentOrderOptions = new ApiContracts.SettingType();
  paymentOrderOptions.setSettingName("hostedPaymentOrderOptions");
  paymentOrderOptions.setSettingValue('{"show": true}');

  // @todo Add bgColor for gold highlights?

  const returnOptions = new ApiContracts.SettingType();
  const host = req.headers.host;
  returnOptions.setSettingName("hostedPaymentReturnOptions");
  returnOptions.setSettingValue(
    `{"showReceipt": false, "url": "https://${host}/checkout/complete", "cancelUrl": "https://${host}/checkout", "cancelUrlText": "Back to previous step"}`
  );

  const iframeCommunicatorSettings = new ApiContracts.SettingType();
  const iframeCommURL = process.env.AUTHORIZE_IFRAME_COMMUNICATOR_URL ? process.env.AUTHORIZE_IFRAME_COMMUNICATOR_URL : `https://${host}/cator.html`;
  iframeCommunicatorSettings.setSettingName("hostedPaymentIFrameCommunicatorUrl");
  iframeCommunicatorSettings.setSettingValue(`{"url": ${iframeCommURL}`);

  const settingList = [];
  settingList.push(paymentButtonOptions);
  settingList.push(billingAddressOptions);
  settingList.push(paymentOrderOptions);
  settingList.push(iframeCommunicatorSettings);
  settingList.push(returnOptions);

  const alist = new ApiContracts.ArrayOfSetting();
  alist.setSetting(settingList);

  const getRequest = new ApiContracts.GetHostedPaymentPageRequest();
  getRequest.setMerchantAuthentication(merchantAuthenticationType);
  getRequest.setTransactionRequest(transactionRequest);
  getRequest.setHostedPaymentSettings(alist);

  const ctrl = new ApiControllers.GetHostedPaymentPageController(
    getRequest.getJSON()
  );

  ctrl.execute(function () {
    const apiResponse = ctrl.getResponse();
    const response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

    if (response != null) {
      if (
        response.getMessages().getResultCode() ===
        ApiContracts.MessageTypeEnum.OK
      ) {
        // console.log("Hosted payment page token :");
        // console.log(response);
        const token = response.getToken();
        res.statusCode = 200;
        res.json({ token: token });
      } else {
        //console.log('Result Code: ' + response.getMessages().getResultCode());
        console.log(
          "Error Code: " + response.getMessages().getMessage()[0].getCode()
        );
        console.log(
          "Error message: " + response.getMessages().getMessage()[0].getText()
        );
      }
    } else {
      console.log("Null response received");
    }
  });
};
