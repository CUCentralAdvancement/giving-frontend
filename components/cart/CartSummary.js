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
              sx={{
                alignItems: "center",
                borderBottom: "2px dotted #dddddf",
                p: 3,
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Box sx={{ width: "80%", flex: "1 1 auto" }}>
                <Link href="/fund/[slug]" as={item.fundRoute}>
                  <a>
                    {item.fundTitle} ({item.fundCampus})
                  </a>
                </Link>
              </Box>
              {removeCallback !== null && (
                <Flex
                  sx={{
                    width: "20%",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Button
                    onClick={() => {
                      removeCallback(item);
                    }}
                    variant="button.secondary"
                    data-testid="remove-from-cart-button"
                  >
                    Remove
                  </Button>
                  <Text sx={{}}>${item["giving-amount"]}</Text>
                </Flex>
              )}
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
        <Text sx={{ ml: 3, pr: 3 }} data-testid="order-total">
          ${orderTotal}
        </Text>
      </Flex>
    </AnimatePresence>
  );
}
