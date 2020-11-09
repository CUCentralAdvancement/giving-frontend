import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
import Layout from "../components/global/Layout";
import {
  Text,
  Flex,
  Heading,
  Button,
  Box,
  Divider,
  Alert,
} from "@cu-advancement/component-library";
import { userCart, giftSummaryLog } from "../data/store";
import { useRecoilState, useSetRecoilState } from "recoil";

const CartSummary = dynamic(() => import("../components/cart/CartSummary"), {
  ssr: false,
});

export default function Cart() { 
  // const router = useRouter();
  const [cart, setCart] = useRecoilState(userCart);
  const setGiftSummary = useSetRecoilState(giftSummaryLog);
  // console.log(cart);

  const removeIt = (item) => {
    const newCart = cart.filter((cartItem) => {
      return cartItem.allocationCode != item.allocationCode;
    });
    setCart(newCart);
    setGiftSummary(newCart);
    window.localStorage.setItem("userCart", JSON.stringify(newCart));
  };

  return (
    <Layout>
      <Alert sx={{ bg: "#4BC995" }}>
        <Box sx={{ maxWidth: 960, mx: "auto" }}>
          An alert for adding/removing items could go here.
          {/* <Close ml="auto" mr={-2} /> */}
        </Box>
      </Alert>
      <Flex
        sx={{
          flexDirection: "column",
          maxWidth: 960,
          mx: "auto",
          p: 4,
        }}
      >
        {cart.length === 0 ? (
          <Text>Your gift basket is empty.</Text>
        ) : (
          <>
            <Heading pb="3">Gift Basket Summary</Heading>
            <Divider />
            <CartSummary cart={cart} removeCallback={removeIt} />
            <Text sx={{ pt: 3 }}>
              All gifts in support of the university are processed and receipted
              by the University of Colorado Foundation, a 501(c)(3) charitable
              entity.
            </Text>
            <Flex
              sx={{
                flexDirection: "row",
                justifyContent: "flex-end",
                fontWeight: 700,
                pt: 3,
              }}
            >
              <Link href="/fund-search">
                <a>
                  <Button
                    variant="button.secondary"
                    data-testid="add-another-gift-button"
                    sx={{ mr: 3 }}
                  >
                    Add Another Gift
                  </Button>
                </a>
              </Link>
              <Link href="/checkout">
                <a>
                  <Button
                    variant="button.secondary"
                    data-testid="checkout-button"
                    sx={{ mr: 3 }}
                    // onClick={() => {
                    //   router.push("/checkout");
                    // }}
                  >
                    Checkout
                  </Button>
                </a>
              </Link>
            </Flex>
          </>
        )}
      </Flex>
    </Layout>
  );
}
