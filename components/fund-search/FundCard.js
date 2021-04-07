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

/**
 * Description of the search results component.
 */
export default function FundCard({ result, close }) {
  return (
    <Flex
      sx={{ flexDirection: "column", bg: "white" }}
      data-testid="fund-card-container"
    >
      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "baseline",
          bg: campusColors[result.campus],
          color: "background",
          p: 3,
        }}
        data-testid="fund-card-close"
        onClick={close}
      >
        <Text sx={{ fontSize: 5, cursor: "pointer", mr: 2 }}>X</Text>
        <Text sx={{ fontSize: 5, cursor: "pointer" }}>close</Text>
      </Flex>
      <Box sx={{ px: 3, py: 4, bg: "gray" }}>
        <Image
          data-testid="fund-card-campus"
          src={campusLogos[result.campus]}
          alt={`${result.campus.label} Logo`}
          sx={{ height: "60px" }}
        />
      </Box>
      <Box sx={{ p: 4 }}>
        <Heading data-testid="fund-card-title">{result.title}</Heading>
        <Text data-testid="fund-card-description" my={4}>
          {result.description}
        </Text>
        <Link as={`fund/${result.slug}`} href="fund/[slug]">
          <a>
            <Button variant="button.secondary">Make a Gift</Button>
          </a>
        </Link>
      </Box>
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
