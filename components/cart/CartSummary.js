import React from "react";
import Link from "next/link";
import { Text, Flex, Button, Box } from "@cu-advancement/component-library";
import { motion, AnimatePresence } from "framer-motion";
import { userCart } from "../../data/store";
import { useRecoilState } from "recoil";

export default function CartSummary({ editable }) {
  const [cart, setCart] = useRecoilState(userCart);

  const removeIt = (item) => {
    const newCart = cart.filter((cartItem) => {
      return cartItem.allocationCode != item.allocationCode;
    });
    setCart(newCart);
    window.localStorage.setItem("userCart", JSON.stringify(newCart));
  };

  let orderTotal = 0;
  cart.forEach((item) => {
    orderTotal += parseInt(item["giving-amount"]);
  });
  return (
    <AnimatePresence>
      {cart.map((item) => {
        return (
          <motion.div
            key={item.allocationCode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              sx={{
                // alignItems: "center",
                borderBottom: "2px dotted #dddddf",
                p: 3,
                // justifyContent: "space-around",
                // alignContent: "center",
                alignItems: "baseline",
              }}
            >
              <Box
                sx={{
                  // width: "82%",
                  flex: "1 0 auto",
                }}
              >
                <Link href="/fund/[slug]" as={item.fundRoute}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#298FCE",
                    }}
                  >
                    <Box
                      as="span"
                      sx={{ ":hover": { textDecoration: "underline" } }}
                    >
                      {item.fundTitle} ({item.fundCampus})
                    </Box>
                  </a>
                </Link>
              </Box>

              <Flex
                sx={{
                  width: editable ? "22%" : "inherit",
                  justifyContent: "space-around",
                  alignItems: "baseline",
                  flexShrink: 0,
                  // pl: 2,
                }}
              >
                {editable && (
                  <Button
                    onClick={() => {
                      removeIt(item);
                    }}
                    variant="button.secondary"
                    data-testid="remove-from-cart-button"
                  >
                    Remove
                  </Button>
                )}
                <Text sx={{}}>${item["giving-amount"]}</Text>
              </Flex>
            </Flex>
          </motion.div>
        );
      })}
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          fontWeight: 700,
          pt: 3,
        }}
      >
        <Text>Total:</Text>
        <Text sx={{ ml: 3, pr: editable ? 4 : 3 }} data-testid="order-total">
          ${orderTotal}
        </Text>
      </Flex>
    </AnimatePresence>
  );
}
