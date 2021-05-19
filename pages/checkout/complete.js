import React, { useEffect } from "react";
// import Link from "next/link";
import dynamic from "next/dynamic";
import Layout from "../../components/global/Layout";
import {
  userCart,
  giftSummaryLog,
  transactionDetails,
  givingFormInfo,
  baseURL,
} from "../../data/store";
import { useSetRecoilState, useRecoilValue } from "recoil";

const CartSummary = dynamic(() => import("../../components/cart/CartSummary"), {
  ssr: false,
});

export default function Complete() {
  const setCart = useSetRecoilState(userCart);
  const transaction = useRecoilValue(transactionDetails);
  const giftSummary = useRecoilValue(giftSummaryLog);
  const givingInfo = useRecoilValue(givingFormInfo);

  useEffect(() => {
    setCart([]);
    window.localStorage.setItem("userCart", JSON.stringify([]));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const theBody = JSON.stringify({
      givingInfo: givingInfo,
      giftSummary: giftSummary,
      transaction: transaction,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: theBody,
      mode: "no-cors",
      // redirect: "follow",
    };

    const url = process.env.ORDER_CREATION_URL ? process.env.ORDER_CREATION_URL : `${baseURL}/api/order/create`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, [giftSummary, givingInfo, setCart, transaction]);

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-2 max-w-screen-lg mx-auto py-4">
        <h1>Gift Summary</h1>
        <hr />
        <CartSummary cart={giftSummary} removeCallback={null} />
        <div className="flex flex-row justify-end font-bold">
          <span className="pr-3">
            Transaction ID:&nbsp;
            <span data-test-id="gift-id">{transaction.transId}</span>
            <br />
            Invoice Number:&nbsp;
            {transaction.orderInvoiceNumber}
          </span>
        </div>
        <hr />
        <h3>
          Thank you for your generous gift to the University of Colorado.
        </h3>
        <p>
          Your gift helps us explore and address the issues of today and educate
          the leaders of tomorrow. Because of your support, the University of
          Colorado continues to blaze new trails in education, research, public
          service and health care. Your gift will have a lasting impact on
          current and future CU students.
        </p>
        <p>
          Your gift supporting CU is processed and receipted by the CU
          Foundation, whose tax ID is 84-6049811. You should receive email
          confirmation of your gift shortly, and your gift receipt for tax
          purposes will be sent to you within two business days. If you do not
          receive either of these, please contact us at{" "}
          <a href="tel:+13035411290">303-541-1290</a>.
        </p>
        <p>
          We&apos;d also love to know what you think of the new site!{" "}
          <a
            href="https://www.surveymonkey.com/r/36QSBRZ"
            target="_blank"
            rel="noreferrer"
          >
            Click here to fill out our survey &gt;
          </a>
        </p>
        <h3>
          Your Contact Information:
        </h3>
        <p>
          {transaction.billTo.firstName}&nbsp;{transaction.billTo.lastName}
          <br />
          {transaction.billTo.address} <br />
          {transaction.billTo.city},&nbsp;{transaction.billTo.state}&nbsp;
          {transaction.billTo.zip}
          <br />
          {transaction.billTo.country}
          <br />
          <br />
          {transaction.billTo.phoneNumber}
          <br />
          ajohn.doe@cu.edu
        </p>
        <h3>
          Your Billing Information:
        </h3>
        <p>
          {transaction.billTo.firstName}&nbsp;{transaction.billTo.lastName}
          <br />
          {transaction.billTo.address} <br />
          {transaction.billTo.city},&nbsp;{transaction.billTo.state}&nbsp;
          {transaction.billTo.zip}
          <br />
          {transaction.billTo.country}
          <br />
          <br />
          {transaction.billTo.phoneNumber}
          <br />
          ajohn.doe@cu.edu
        </p>
        <h3>
          Your Gift Details:
        </h3>
        <p>
          <strong>Comments: </strong>
          <br /> {givingInfo.giftComments}
        </p>
        <p>
          <strong>Receive tax receipt by:</strong>&nbsp;{givingInfo.taxReceipt}
        </p>
      </div>
    </Layout>
  );
}
