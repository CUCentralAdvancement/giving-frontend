"use strict";

var ApiContracts = require("authorizenet").APIContracts;
var ApiControllers = require("authorizenet").APIControllers;
// var utils = require('../utils.js');
// var constants = require('../constants.js');

function getAnAcceptPaymentPage() {}

// if (require.main === module) {
// 	getAnAcceptPaymentPage(function(){
// 		console.log('getAnAcceptPaymentPage call complete.');
// 	});
// }

// module.exports.getAnAcceptPaymentPage = getAnAcceptPaymentPage;

export default async (req, res) => {
  var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(
    process.env.NEXT_PUBLIC_AUTHORIZE_LOGIN_ID
  );
  merchantAuthenticationType.setTransactionKey(
    process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY
  );

  var transactionRequestType = new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transactionRequestType.setAmount(50.0);

  var setting1 = new ApiContracts.SettingType();
  setting1.setSettingName("hostedPaymentButtonOptions");
  setting1.setSettingValue('{"text": "Pay"}');

  var setting2 = new ApiContracts.SettingType();
  setting2.setSettingName("hostedPaymentOrderOptions");
  setting2.setSettingValue('{"show": false}');

  var returnOptions = new ApiContracts.SettingType();
  returnOptions.setSettingName("hostedPaymentReturnOptions");
  returnOptions.setSettingValue(
    '{"showReceipt": false, "url": "http://localhost:3000/checkout/complete", "cancelUrl": "http://localhost:3000/checkout/complete", "cancelUrlText": "Back to previous step"}'
  );

  var iframeCommURL = new ApiContracts.SettingType();
  iframeCommURL.setSettingName("hostedPaymentIFrameCommunicatorUrl");
  iframeCommURL.setSettingValue('{"url": "http://localhost:3000/cator.html"}');

  var settingList = [];
  settingList.push(setting1);
  settingList.push(setting2);
  settingList.push(iframeCommURL);
  settingList.push(returnOptions);

  var alist = new ApiContracts.ArrayOfSetting();
  alist.setSetting(settingList);

  var getRequest = new ApiContracts.GetHostedPaymentPageRequest();
  getRequest.setMerchantAuthentication(merchantAuthenticationType);
  getRequest.setTransactionRequest(transactionRequestType);
  getRequest.setHostedPaymentSettings(alist);

  //console.log(JSON.stringify(getRequest.getJSON(), null, 2));

  var ctrl = new ApiControllers.GetHostedPaymentPageController(
    getRequest.getJSON()
  );

  ctrl.execute(function () {
    var apiResponse = ctrl.getResponse();

    var response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

    //pretty print response
    //console.log(JSON.stringify(response, null, 2));

    if (response != null) {
      if (
        response.getMessages().getResultCode() ==
        ApiContracts.MessageTypeEnum.OK
      ) {
        console.log("Hosted payment page token :");
        const token = response.getToken();
        console.log(token);
        // console.log(response);
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

    // callback(response);
  });
};
