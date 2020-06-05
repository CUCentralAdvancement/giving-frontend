// import Head from "next/head";
import PropTypes from "prop-types";
<<<<<<< HEAD
import { Button, Flex, Heading } from "@cu-advancement/component-library";
=======
import { Button, Flex } from "@cu-advancement/component-library";
>>>>>>> master
import Layout from "../components/Layout";

export default function FundSearch({ searchData }) {
  return (
    <Layout>
      <Flex
        sx={{
          maxWidth: "960px",
          mx: "auto",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Heading as="h1">Search Results</Heading>
        <Heading
          data-testid="search-result-count"
          as="h2"
        >{`Results Count: ${searchData.length}`}</Heading>
        <ul>
          {searchData.map((result) => {
            return (
              <li data-testid="search-result" key={result.title}>
                {`${result.title} - ${
                  result.featured === "1" ? "Featured Fund" : ""
                }`}
              </li>
            );
          })}
        </ul>
        <Button
          variant="button.outline"
          sx={{ color: "secondary" }}
          data-testid="load-more-button"
        >
          Load more funds...
        </Button>
        <Button
          variant="button.outline"
          sx={{ color: "secondary" }}
          data-testid="refine-search-button"
        >
          Refine my search
        </Button>
      </Flex>
    </Layout>
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
