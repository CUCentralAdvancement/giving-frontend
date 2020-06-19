import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { campusNames, interestsOptions } from "../../data/fundMeta";
import {
  Box,
  Flex,
  Heading,
  Text,
  theme,
} from "@cu-advancement/component-library";

export default function FundInfo({ fund }) {
  return (
    <Flex sx={{ p: 4, flexDirection: "column" }}>
      <Heading as="h1" sx={{ pb: 3 }} data-testid="fund-title">
        {fund.title}
      </Heading>
      <Box sx={{ flex: "1 1 auto" }}>
        <Text as="p" data-testid="fund-description">
          {fund.description}
        </Text>
        <div
          data-testid="fund-marketing-content"
          dangerouslySetInnerHTML={{ __html: fund.marketingContent }}
        ></div>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Text sx={{ display: "inline-block" }}>Campus:&nbsp;</Text>
        <Link href={`/fund-search?field_campus=${fund.campus}`}>
          <a
            data-testid="fund-campus"
            style={{
              color: theme.colors.primary,
            }}
          >
            {campusNames[fund.campus]}
          </a>
        </Link>
        <br />
        <Text sx={{ display: "inline-block" }}>Allocation Code:&nbsp;</Text>
        <Text
          data-testid="fund-allocation-code"
          sx={{ color: "primary", display: "inline-block" }}
        >
          {fund.allocationCode}
        </Text>
        <br />
        <Text sx={{ display: "inline-block" }}>Interest:&nbsp;</Text>
        <Link href={`/fund-search?field_fund_interests=${fund.interest}`}>
          <a
            data-testid="fund-interest"
            style={{ color: theme.colors.primary }}
          >
            {(() => {
              const inter = interestsOptions.find(
                (el) => el.value === fund.interest
              );
              if (inter) {
                return inter.label;
              } else {
                return fund.interest;
              }
            })()}
          </a>
        </Link>
      </Box>
    </Flex>
  );
}

FundInfo.propTypes = {
  fund: PropTypes.exact({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    marketingContent: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    interest: PropTypes.string,
    allocationCode: PropTypes.string.isRequired,
  }),
};

FundInfo.defaultProps = {
  fund: {
    title: "",
    description: "",
    marketingContent: "",
    campus: "",
    interest: "950",
    allocationCode: "",
  },
};
