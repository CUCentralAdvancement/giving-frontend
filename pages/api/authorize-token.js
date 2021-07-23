'use strict';

const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;

export default async (req, res) => {
  console.log(req);
  const data = req.body;

  const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(process.env.AUTHORIZE_LOGIN_ID);
  merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZE_TRANSACTION_KEY);

  const transactionRequest = new ApiContracts.TransactionRequestType();
  transactionRequest.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
  transactionRequest.setAmount(data.amount);
  transactionRequest.setOrder({
    invoiceNumber: data.invoiceNumber,
    description: data.description,
  });
  transactionRequest.setBillTo({
    firstName: data['first-name'],
    lastName: data['last-name'],
    company: data['company-name'],
    address: data['address-one'],
    city: data['address-city'],
    state: data['address-state'],
    zip: data['address-zip'],
    country: data['address-country'],
    phoneNumber: data['preferred-phone'],
  });

  const buttonOptions = new ApiContracts.SettingType();
  buttonOptions.setSettingName('hostedPaymentButtonOptions');
  buttonOptions.setSettingValue('{"text": "Pay"}');

  const orderOptions = new ApiContracts.SettingType();
  orderOptions.setSettingName('hostedPaymentOrderOptions');
  orderOptions.setSettingValue('{"show": true}');

  // @todo Add bgColor for gold highlights?

  const host = req.headers.host;
  const returnOptions = new ApiContracts.SettingType();
  returnOptions.setSettingName('hostedPaymentReturnOptions');
  returnOptions.setSettingValue(
    `{"showReceipt": false, "url": "https://${host}/checkout/complete", "cancelUrl": "https://${host}/checkout", "cancelUrlText": "Back to previous step"}`,
  );

  const iframeCommURL = new ApiContracts.SettingType();
  iframeCommURL.setSettingName('hostedPaymentIFrameCommunicatorUrl');
  let iframeCommunicatorURL = process.env.AUTHORIZE_IFRAME_COMMUNICATOR_URL ?? 'https://localhost:3000/cator.html';
  iframeCommURL.setSettingValue(`{"url": "${iframeCommunicatorURL}"}`);

  const settingList = [];
  settingList.push(buttonOptions);
  settingList.push(orderOptions);
  settingList.push(iframeCommURL);
  settingList.push(returnOptions);

  const alist = new ApiContracts.ArrayOfSetting();
  alist.setSetting(settingList);

  const getRequest = new ApiContracts.GetHostedPaymentPageRequest();
  getRequest.setMerchantAuthentication(merchantAuthenticationType);
  getRequest.setTransactionRequest(transactionRequest);
  getRequest.setHostedPaymentSettings(alist);

  const ctrl = new ApiControllers.GetHostedPaymentPageController(
    getRequest.getJSON(),
  );

  ctrl.execute(function() {
    const apiResponse = ctrl.getResponse();
    const response = new ApiContracts.GetHostedPaymentPageResponse(apiResponse);

    if (response != null) {
      if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
        // console.log("Hosted payment page token :");
        // console.log(response);
        const token = response.getToken();
        res.statusCode = 200;
        res.json({ token: token });
      } else {
        //console.log('Result Code: ' + response.getMessages().getResultCode());
        console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
        console.log('Error message: ' + response.getMessages().getMessage()[0].getText(),);
      }
    } else {
      console.log('Null response received');
    }
  });
};
