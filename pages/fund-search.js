// import Head from "next/head";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "@cu-advancement/component-library";
import Layout from "../components/global/Layout";
// import SearchForm from "../components/fund-search/SearchForm";
import SearchResults from "../components/fund-search/SearchResults";

export default function FundSearch({ searchData }) {
  const [results, setResults] = useState(searchData);
  function submitHandler(values) {
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
  }
  return (
    <>
      <Layout>
        <Flex sx={{ flexDirection: "column" }}>
          {/* <Box sx={{ bg: "gray", width: "100%" }}>
            <Box sx={{ p: 3, maxWidth: "960px", mx: "auto" }}>
              <SearchForm
                submitHandler={submitHandler}
                resetHandler={() => setResults(searchData)}
              />
            </Box>
          </Box> */}
          <Box sx={{ p: 3, maxWidth: "1280px", mx: "auto" }}>
            <SearchResults results={results} />
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
    //`http://cu-giving.lndo.site/sites/default/files/small_fund_data.json`
    `https://385-i-cu-giving.pantheonsite.io/sites/default/files/small_fund_data.json`
  );
  const searchData = await res.json();

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
  return { props: { searchData: realSearchData } };
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
    })
  ),
};

FundSearch.defaultProps = {
  searchData: [
    {
      alloc_code: "",
      title: "",
      description: "",
      fund_type: "",
      featured: "",
      campus: "",
      interests: "",
    },
  ],
};
