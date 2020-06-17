import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Text,
  Flex,
  Heading,
  Box,
  Button,
  Image,
} from "@cu-advancement/component-library";
import { campusColors, campusLogos } from "../../data/fundMeta";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Description of the search results component.
 */
export default function FundCard({ result, close }) {
  return (
    <Flex sx={{ flexDirection: "column", bg: "white" }}>
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          bg: campusColors[result.campus],
          color: "background",
          p: 3,
        }}
        onClick={close}
      >
        <Text sx={{ fontSize: 5, cursor: "pointer", mr: 2 }}>X</Text>
        <Text sx={{ fontSize: 5, cursor: "pointer" }}>close</Text>
      </Flex>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box sx={{ px: 3, py: 4, bg: "gray" }}>
            <Image src={campusLogos[result.campus]} sx={{ height: "60px" }} />
          </Box>
          <Box sx={{ p: 4 }}>
            <Heading>{result.title}</Heading>
            <Text my={4}>{result.description}</Text>
            <Link href={`/fund/${result.path}`}>
              <a>
                <Button variant="button.secondary">Make a Gift</Button>
              </a>
            </Link>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Flex>
  );
}

FundCard.propTypes = {
  /**
   * The name of the button.
   */
  result: PropTypes.object,
  /**
   * If disabled, the button has less opacity and can't be clicked.
   */
  close: PropTypes.func,
};

FundCard.defaultProps = {
  result: {
    title: "",
    campus: "UCCS",
  },
  close: () => {
    console.log("closed");
  },
};
