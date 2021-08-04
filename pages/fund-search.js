// import Head from "next/head";
import React from "react";
// import PropTypes from "prop-types";
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
      <InstantSearch searchClient={searchClient} indexName="funds">
        <div className="flex flex-col">
          <div className="bg-gray-300 w-full">
            <div className="p-4 max-w-screen-lg mx-auto">
              <SearchForm />
            </div>
          </div>
          <div className="p-3 max-w-screen-xl mx-auto" data-testid="search-results">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SearchResults />
                <div className="flex flex-row justify-end">
                  <PoweredBy />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </InstantSearch>
    </Layout>
  );
}
