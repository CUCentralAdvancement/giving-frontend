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
  Box,
} from "@cu-advancement/component-library";
import { userCart, giftSummaryLog } from "../../data/store";
import { useSetRecoilState, useRecoilValue } from "recoil";

const CartSummary = dynamic(() => import("../../components/cart/CartSummary"), {
  ssr: false,
});

export default function Complete() {
  const setCart = useSetRecoilState(userCart);
  const giftSummary = useRecoilValue(giftSummaryLog);

  useEffect(() => {
    setCart([]);
  }, [setCart]);

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
          <Text>Gift ID:&nbsp;</Text>
          <Text data-test-id="gift-id" sx={{ pr: 3 }}>
            12345
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
        <Box as="span" sx={{ fontWeight: "bold" }}>
          Your Contact Information:
        </Box>
        <Text as="p">
          John Doe <br />
          123 Rich St. <br />
          Boulder, CO 80301
          <br />
          555-555-5555
          <br />
          ajohn.doe@cu.edu
        </Text>
        <Box as="span" sx={{ fontWeight: "bold" }}>
          Your Billing Information:
        </Box>
        <Text as="p">
          John Doe <br />
          123 Rich St. <br />
          Boulder, CO 80301
          <br />
          555-555-5555
          <br />
          ajohn.doe@cu.edu
        </Text>
        <Box as="span" sx={{ fontWeight: "bold" }}>
          Your Gift Details:
        </Box>
        <Text as="p">
          Comments:
          <br />
          Receive tax receipt by: Email
        </Text>
      </Grid>
    </Layout>
  );
}
