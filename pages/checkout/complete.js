import React, { useEffect, useState } from "react";
// import Link from "next/link";
import dynamic from "next/dynamic";
import Layout from "../../components/global/Layout";
import {
  Heading,
  Flex,
  Divider,
  Text,
  Grid,
  // Box,
} from "@cu-advancement/component-library";
import {
  userCart,
  giftSummaryLog,
  transactionDetails,
  givingFormInfo,
  baseURL,
} from "../../data/store";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

const CartSummary = dynamic(() => import("../../components/cart/CartSummary"), {
  ssr: false,
});

export default function Complete() {
  const setCart = useSetRecoilState(userCart);
  const [transaction, setTransactionDetails] = useRecoilState(
    transactionDetails
  );
  const giftSummary = useRecoilValue(giftSummaryLog);
  const givingInfo = useRecoilValue(givingFormInfo);

  useEffect(() => {
    setCart([]);
    window.localStorage.setItem("userCart", JSON.stringify([]));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        givingInfo: givingInfo,
        giftSummary: giftSummary,
        transaction: transaction,
      }),
      mode: "no-cors",
      // redirect: "follow",
    };

    const url = `${baseURL}/api/order/create?${process.env.NEXT_PUBLIC_AUTHORIZE_ORDER_API_KEY_NAME}=${process.env.NEXT_PUBLIC_AUTHORIZE_ORDER_API_KEY}`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Layout>
      <Grid
        gap={2}
        columns={1}
        sx={{
          maxWidth: 960,
          mx: "auto",
          py: 4,
        }}
      >
        <Heading>Gift Summary</Heading>
        <Divider />
        <CartSummary cart={giftSummary} removeCallback={null} />
        <Flex
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            fontWeight: "bold",
          }}
        >
          <Text sx={{ pr: 3 }}>
            Transaction ID:&nbsp;
            <span data-test-id="gift-id">{transaction.transId}</span>
            <br />
            Invoice Number:&nbsp;
            {transaction.orderInvoiceNumber}
          </Text>
        </Flex>
        <Divider />
        <Heading as="h3" sx={{ py: 1 }}>
          Thank you for your generous gift to the University of Colorado.
        </Heading>
        <Text as="p">
          Your gift helps us explore and address the issues of today and educate
          the leaders of tomorrow. Because of your support, the University of
          Colorado continues to blaze new trails in education, research, public
          service and health care. Your gift will have a lasting impact on
          current and future CU students.
        </Text>
        <Text as="p">
          Your gift supporting CU is processed and receipted by the CU
          Foundation, whose tax ID is 84-6049811. You should receive email
          confirmation of your gift shortly, and your gift receipt for tax
          purposes will be sent to you within two business days. If you do not
          receive either of these, please contact us at{" "}
          <a href="tel:+13035411290">303-541-1290</a>.
        </Text>
        <Text as="p">
          We&apos;d also love to know what you think of the new site!{" "}
          <a
            href="https://www.surveymonkey.com/r/36QSBRZ"
            target="_blank"
            rel="noreferrer"
          >
            Click here to fill out our survey &gt;
          </a>
        </Text>
        <Heading as="h3" sx={{ mt: 3 }}>
          Your Contact Information:
        </Heading>
        <Text as="p">
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
        </Text>
        <Heading as="h3" sx={{ mt: 3 }}>
          Your Billing Information:
        </Heading>
        <Text as="p">
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
        </Text>
        <Heading as="h3" sx={{ mt: 3 }}>
          Your Gift Details:
        </Heading>
        <Text as="p">
          <strong>Comments: </strong>
          <br /> {givingInfo.giftComments}
        </Text>

        <Text as="p">
          <strong>Receive tax receipt by:</strong>&nbsp;{givingInfo.taxReceipt}
        </Text>
      </Grid>
    </Layout>
  );
}
