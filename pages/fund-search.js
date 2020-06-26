// import Head from "next/head";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "@cu-advancement/component-library";
import Layout from "../components/global/Layout";
import SearchForm from "../components/fund-search/SearchForm";
import SearchResults from "../components/fund-search/SearchResults";
import { baseURL } from "../data/store";

export default function FundSearch({ searchData, count }) {
  const [results, setResults] = useState(searchData);
  const [resultCount, setResultCount] = useState(count);

  // useEffect(() => {
  //   async function fetchFullResults() {
  //     const result = await fetch(
  //       `http://localhost:3000/api/funds`
  //     );
  //     const data = await result.json();
  //     setResults(data.realSearchData);
  //   }
  //   fetchFullResults();
  // }, []);

  function submitHandler(values) {
    console.log(values);
    const newResults = searchData.filter((res) => {
      if (values.campus !== "All") {
        return res.campus === values.campus;
      }
      if (values.interest !== "All") {
        return res.interests === values.interest;
      }
      if (values.fundType !== "All") {
        return res.fund_type === values.fundType;
      }
      if (values.search !== "") {
        return res.title.toLowerCase().includes(values.search.toLowerCase());
      }
      return true;
    });
    setResults(newResults);
    setResultCount(newResults.length);
  }
  return (
    <>
      <Layout>
        <Flex sx={{ flexDirection: "column" }}>
          <Box sx={{ bg: "gray", width: "100%" }}>
            <Box sx={{ p: 3, maxWidth: "960px", mx: "auto" }}>
              <SearchForm
                submitHandler={submitHandler}
                resetHandler={() => {
                  setResults(searchData);
                  setResultCount(count);
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{ p: 3, maxWidth: "1280px", mx: "auto" }}
            data-testid="search-results"
          >
            <SearchResults results={results} count={resultCount} />
          </Box>
        </Flex>
      </Layout>
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `${baseURL}/sites/default/files/small_fund_data.json`
  );
  const searchData = await res.json();

  const count = await fetch(`${baseURL}/api/funds/count`);
  const fundsCount = await count.json();

  const realSearchData = [];
  Object.keys(searchData).forEach((key, index) => {
    if (searchData[key].featured == true) {
      realSearchData.unshift(searchData[key]);
    } else {
      if (index < 40) {
        realSearchData.push(searchData[key]);
      }
    }
  });

  // Pass data to the page via props
  return { props: { searchData: realSearchData, count: fundsCount } };
}

FundSearch.propTypes = {
  searchData: PropTypes.arrayOf(
    PropTypes.exact({
      alloc_code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fund_type: PropTypes.string,
      featured: PropTypes.string.isRequired,
      campus: PropTypes.string.isRequired,
      interests: PropTypes.string.isRequired,
      keywords: PropTypes.arrayOf(PropTypes.string),
      additional_keywords: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.string.isRequired,
    })
  ),
  count: PropTypes.number.isRequired,
};

FundSearch.defaultProps = {
  searchData: [
    {
      alloc_code: "",
      title: "",
      description: "",
      fund_type: "All",
      featured: "",
      campus: "All",
      interests: "All",
      keywords: [],
      additional_keywords: [],
      path: "",
    },
  ],
  count: 1924,
};
