"use strict";

var ApiContracts = require("authorizenet").APIContracts;
var ApiControllers = require("authorizenet").APIControllers;

export default async (req, res) => {
  // console.log(req);
  const data = req.body;

  var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(
    process.env.AUTHORIZE_LOGIN_ID
  );
  merchantAuthenticationType.setTransactionKey(
    process.env.AUTHORIZE_TRANSACTION_KEY
  );

  var transactionRequest = new ApiContracts.TransactionRequestType();
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

  var setting1 = new ApiContracts.SettingType();
  setting1.setSettingName("hostedPaymentButtonOptions");
  setting1.setSettingValue('{"text": "Pay"}');

  var setting2 = new ApiContracts.SettingType();
  setting2.setSettingName("hostedPaymentOrderOptions");
  setting2.setSettingValue('{"show": true}');

  // @todo Add bgColor for gold highlights?

  var returnOptions = new ApiContracts.SettingType();
  const host = req.headers.host;
  returnOptions.setSettingName("hostedPaymentReturnOptions");
  returnOptions.setSettingValue(
    `{"showReceipt": false, "url": "https://${host}/checkout/complete", "cancelUrl": "https://${host}/checkout", "cancelUrlText": "Back to previous step"}`
  );

  var iframeCommURL = new ApiContracts.SettingType();
  iframeCommURL.setSettingName("hostedPaymentIFrameCommunicatorUrl");
  iframeCommURL.setSettingValue(`{"url": "https://${host}/cator.html"}`);

  var settingList = [];
  settingList.push(setting1);
  settingList.push(setting2);
  settingList.push(iframeCommURL);
  settingList.push(returnOptions);

  var alist = new ApiContracts.ArrayOfSetting();
  alist.setSetting(settingList);

  var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
  getRequest.setMerchantAuthentication(merchantAuthenticationType);
  getRequest.setTransactionRequest(transactionRequest);
  getRequest.setHostedPaymentSettings(alist);

  var ctrl = new ApiControllers.GetHostedPaymentPageController(
    getRequest.getJSON()
  );

  ctrl.execute(function () {
    var apiResponse = ctrl.getResponse();
    var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

    if (response != null) {
      if (
        response.getMessages().getResultCode() ==
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
