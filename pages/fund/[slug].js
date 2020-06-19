import React, { useRef, useEffect, useState } from "react";
import Layout from "../../components/global/Layout";
import fetch from "node-fetch";
import { Box, Flex, Image } from "@cu-advancement/component-library";
import FundInfo from "../../components/fund/FundInfo";
import GivingForm from "../../components/fund/GivingForm";

// const baseURL = "http://cu-giving.lndo.site";
const baseURL = "https://385-i-cu-giving.pantheonsite.io";
// const baseURL = "https://stormy-caverns-60033.herokuapp.com";

export default function Fund({ fund }) {
  // console.log(fund);
  const intervalRef = useRef();
  const [containerHeight, setContainerHeight] = useState("100%");

  useEffect(() => {
    setContainerHeight(intervalRef.current.offsetHeight - 40);
  }, []);
  return (
    <Layout ref={intervalRef}>
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
        }}
      >
        <Image
          src="https://giving.cu.edu/sites/all/themes/themekit/images/interior-banners/banner-mountains.jpg"
          sx={{ mb: -1, height: "86px" }}
        />
        <Flex
          sx={{
            flexDirection: ["column", "row"],
            minHeight: ["100%", containerHeight],
          }}
        >
          <Box sx={{ pl: [0, 0, 0, "20%"], width: ["100%", "100%", "55%"] }}>
            <FundInfo fund={fund} />
          </Box>
          <Box
            sx={{
              bg: "#ECEDED",
              width: ["100%", "100%", "45%"],
              pr: [0, 0, 0, "20%"],
            }}
          >
            <Box sx={{ p: 4 }}>
              <GivingForm fund={fund} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    // `http://cu-giving.lndo.site/sites/default/files/small_fund_data.json`
    `https://385-i-cu-giving.pantheonsite.io/sites/default/files/small_fund_data.json`
  );
  const searchData = await res.json();

  const paths = [];
  Object.keys(searchData).forEach((key) => {
    if (searchData[key].path.includes("alzheimer") === false) {
      paths.push({ params: { slug: searchData[key].path.split("/")[1] } });
    }
  });

  return {
    paths: paths,
    fallback: true,
  };
}

// This gets called on every request
export async function getStaticProps({ params }) {
  console.log(params.slug);
  // const slug = params.slug || null;

  const realSlug = params.slug.replace("%E2%80%99", "'");

  // Fetch data from external API
  const res = await fetch(`${baseURL}/api/fund/${realSlug}`);
  const fund = await res.json();

  // Pass data to the page via props
  return { props: { fund }, unstable_revalidate: 60 };
}
