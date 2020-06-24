import React from "react";
import Link from "next/link";
import { Text, Flex, Button, Box } from "@cu-advancement/component-library";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSummary({ cart, removeCallback }) {
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
              data-testid="cart-item"
              sx={{
                borderBottom: "2px dotted #dddddf",
                p: 3,
                alignItems: "baseline",
              }}
            >
              <Box
                sx={{
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
                  width: removeCallback ? "22%" : "inherit",
                  justifyContent: "space-around",
                  alignItems: "baseline",
                  flexShrink: 0,
                }}
              >
                {removeCallback && (
                  <Button
                    onClick={() => {
                      removeCallback(item);
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
        <Text
          sx={{ ml: 3, pr: removeCallback ? 4 : 3 }}
          data-testid="order-total"
        >
          ${orderTotal}
        </Text>
      </Flex>
    </AnimatePresence>
  );
}
