// import Head from "next/head";
import React from "react";
// import PropTypes from "prop-types";
import { Box, Flex } from "@cu-advancement/component-library";
import Layout from "../components/global/Layout";
import SearchForm from "../components/fund-search/SearchForm";
import SearchResults from "../components/fund-search/SearchResults";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, PoweredBy } from "react-instantsearch-dom";
import { motion, AnimatePresence } from "framer-motion";

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
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SearchResults />
                <Flex sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
                  <PoweredBy />
                </Flex>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Flex>
      </InstantSearch>
    </Layout>
  );
}