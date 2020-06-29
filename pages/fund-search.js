// import Head from "next/head";
import React from "react";
// import PropTypes from "prop-types";
import { Box, Flex } from "@cu-advancement/component-library";
import Layout from "../components/global/Layout";
import SearchForm from "../components/fund-search/SearchForm";
import SearchResults from "../components/fund-search/SearchResults";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, PoweredBy } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_KEY
);

export default function FundSearch() {
  return (
    <Layout>
      <InstantSearch searchClient={searchClient} indexName="Funds">
        <Flex sx={{ flexDirection: "column" }}>
          <Box sx={{ bg: "gray", width: "100%" }}>
            <Box sx={{ p: 3, maxWidth: "960px", mx: "auto" }}>
              <SearchForm />
            </Box>
          </Box>
          <Box
            sx={{ p: 3, maxWidth: "1280px", mx: "auto" }}
            data-testid="search-results"
          >
            <SearchResults />
            <Flex sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <PoweredBy />
            </Flex>
          </Box>
        </Flex>
      </InstantSearch>
    </Layout>
  );
}
