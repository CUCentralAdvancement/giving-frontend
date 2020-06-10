import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
// import { useSpring, animated, config } from "react-spring";
import {
  Card,
  Text,
  Flex,
  Heading,
  // Link as CULink,
  Box,
  Grid,
  Button,
} from "@cu-advancement/component-library";
import { campusColors, campusNames, interests } from "../../data/fundMeta";
// import Portal from "../Portal";
// import FundCard from "./FundCard";
import RightArrow from "../global/RightArrow";
// import { useWindowDimensions } from "../../utils/hooks";

/**
 * Description of the search results component.
 */
export default function SearchResults({ results, ...props }) {
  const [fundCardResult, setFundCardResult] = useState({
    title: "",
    campus: "UCCS",
  });
  const [open, setOpen] = useState(false);
  // const containerWidthRef = useRef();
  // const dimensions = useWindowDimensions();

  // useEffect(() => {
  //   console.log(containerWidthRef.current.offsetWidth);
  //   // setContainerHeight(intervalRef.current.offsetHeight - 60);
  // }, []);

  // const contentProps = useSpring({
  //   // config: config.stiff,
  //   transform: open ? "translateX(-100%)" : "translateX(0%)",
  //   opacity: open ? 1 : 0,
  //   height: "100%",
  //   position: "fixed",
  //   top: 0,
  //   left: "100%",
  //   zIndex: 1000,
  //   width: dimensions.width < 1000 ? "100%" : "40%",
  //   overflowY: "scroll",
  //   background: "#fff",
  //   boxShadow: "-3px 0 10px rgba(20,20,20,.1)",
  // });

  return (
    <>
      <Box p={3}>
        <Header results={results} />
      </Box>
      <Grid gap={3} columns={[1, 2, 3, 4]}>
        {results.map((res, index) => (
          <Card
            data-testid="search-result"
            key={res.alloc_code.toString()}
            sx={{ width: ["70%", "85%", "100%"], mx: ["auto", 0] }}
            onClick={(e) => {
              // e.preventDefault();
              if (!open) {
                setOpen(true);
              }
              setFundCardResult(res);
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                minHeight: 231,
                color: "text",
                cursor: "pointer",
              }}
            >
              <Box
                bg={campusColors[res.campus]}
                mx={-2}
                mt={-2}
                color="background"
              >
                <Flex>
                  <Text
                    sx={{ flexGrow: 1, pl: 3, pt: 3, pb: 3, fontSize: 1 }}
                    data-testid="result-campus"
                  >
                    {campusNames[res.campus]}
                  </Text>
                  {res.featured == true && (
                    <FeaturedFund res={res}></FeaturedFund>
                  )}
                </Flex>
              </Box>
              <Heading
                sx={{ mt: 2, p: 2, flexGrow: 1, fontSize: 3 }}
                data-testid="result-title"
              >
                {res.title}
              </Heading>
              <Text
                sx={{
                  p: 2,
                  fontSize: 2,
                  fontWeight: 700,
                  color: "#4D5259",
                  lineHeight: 1.2,
                }}
                data-testid="result-interest"
              >
                {interests[res.interests]}
              </Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Flex
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Button
          variant="button.outline"
          sx={{
            color: "secondary",
            mr: 2,
            border: "1px solid",
            fontWeight: 500,
          }}
          data-testid="load-more-button"
        >
          Load more funds...
        </Button>
        <Button
          variant="button.outline"
          sx={{ color: "secondary", border: "1px solid", fontWeight: 500 }}
          data-testid="refine-search-button"
        >
          Refine my search
        </Button>
      </Flex>

      {/* <Portal>
        <animated.div style={contentProps}>
          <FundCard
            result={fundCardResult}
            close={() => {
              setOpen(false);
              // setFundCardResult({
              //   title: "",
              //   campus: "UCCS",
              // });
            }}
          />
        </animated.div>
      </Portal> */}
    </>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
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

SearchResults.defaultProps = {
  results: [
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

function FeaturedFund({ res }) {
  return (
    <Box
      bg="black"
      sx={{ mr: -2, my: 2, height: "38px" }}
      data-testid="featured-fund"
    >
      <Flex sx={{ flexDirection: "row" }}>
        <Box sx={{ height: "100%" }}>
          <RightArrow fillColor={campusColors[res.campus]} />
        </Box>
        <Text sx={{ ml: "auto", p: 2, fontSize: 1 }}>Featured Fund</Text>
      </Flex>
    </Box>
  );
}

function Header({ results }) {
  return (
    <>
      <Text data-testid="search-result-count" color="primary" mb={2}>
        {results.length} Results
      </Text>
      <Text sx={{ display: "inline-block", fontStyle: "italic" }} mr={2}>
        Can't find what you're looking for?
      </Text>
      <Link href="/fund/write-fund">
        <a
          style={{
            display: "inline-block",
            fontStyle: "italic",
            textDecoration: "none",
            color: "#298FCE",
            ":hover": 'text-decoration: "underline"',
          }}
          data-testid="write-in-link"
        >
          Click here to use our write-in fund option.
        </a>
      </Link>
    </>
  );
}
