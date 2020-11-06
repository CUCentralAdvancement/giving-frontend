import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Layout from "../../components/global/Layout";
import { URL } from "whatwg-url";
import { Box, Flex, Image } from "@cu-advancement/component-library";
import FundInfo from "../../components/fund/FundInfo";
import GivingForm from "../../components/fund/GivingForm";
import { baseURL } from "../../data/store";

Fund.propTypes = {
  fund: PropTypes.object,
};

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
          alt="Mountain Backdrop"
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
  const res = await fetch(`${baseURL}/api/funds/paths`);
  const pathsList = await res.json();

  const paths = [];
  Object.keys(pathsList).forEach((key) => {
    paths.push({
      params: { slug: pathsList[key] },
    });
  });

  return {
    paths: paths,
    fallback: true,
  };
}

// This gets called on every request
export async function getStaticProps({ params }) {
  const slug = params.slug || null;

  // Fetch data from external API
  const res = await fetch(new URL(`${baseURL}/api/fund/${slug}`));
  const fund = await res.json();

  // Pass data to the page via props
  return { props: { fund }, revalidate: 60 };
}
