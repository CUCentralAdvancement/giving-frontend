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
  const intervalRef = useRef();
  const [containerHeight, setContainerHeight] = useState("100%");

  useEffect(() => {
    setContainerHeight(intervalRef.current.offsetHeight - 60);
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
          sx={{ mb: -1 }}
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

// This gets called on every request
export async function getServerSideProps(context) {
  const slug = context.params.slug || null;

  // Fetch data from external API
  const res = await fetch(`${baseURL}/api/fund/${slug}`);
  const fund = await res.json();

  // Pass data to the page via props
  return { props: { fund } };
}