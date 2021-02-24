import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
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
import { campusColors, interests } from "../../data/fundMeta";
import FundCard from "./FundCard";
import RightArrow from "../global/RightArrow";
import { useWindowDimensions } from "../../utils/hooks";
import { connectStats, connectInfiniteHits } from "react-instantsearch-dom";

// The portal can't render server-side.
const Portal = dynamic(() => import("../global/Portal"), {
  ssr: false,
});

const CustomHits = connectInfiniteHits(CardContents);
const Header = connectStats(CustomStats);

/**
 * Description of the search results component.
 */
export default function SearchResults() {
  // console.log(results);
  const [fundCardResult, setFundCardResult] = useState({
    title: "",
    campus: "UCCS",
  });
  const [open, setOpen] = useState(false);
  const dimensions = useWindowDimensions();

  const styleProps = {
    height: "100%",
    position: "fixed",
    top: 0,
    left: "100%",
    zIndex: 1000,
    width: dimensions.width < 1000 ? "100%" : "40%",
    overflowY: "scroll",
    background: "#fff",
    boxShadow: "-3px 0 10px rgba(20,20,20,.1)",
  };

  return (
    <>
      <Box p={3}>
        <Header />
      </Box>
      <CustomHits setResult={setFundCardResult} setOpen={setOpen} open={open} />
      <Portal>
        <AnimatePresence>
          {
            // @todo Adbstract this into a component and use a recoil atom to share the current fund being opened.
            open && (
              <motion.div
                style={styleProps}
                key={1}
                initial={{ transform: "translateX(0%)" }}
                animate={{ transform: "translateX(-100%)" }}
                exit={{ transform: "translateX(0%)" }}
                transition={{ duration: 0.3 }}
              >
                <FundCard
                  result={fundCardResult}
                  close={() => {
                    setOpen(false);
                  }}
                />
              </motion.div>
            )
          }
        </AnimatePresence>
      </Portal>
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
      keywords: PropTypes.arrayOf(PropTypes.string),
      additional_keywords: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.string.isRequired,
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
      keywords: [],
      additional_keywords: [],
      path: "",
    },
  ],
};

FeaturedFund.propTypes = {
  res: PropTypes.object,
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
          <RightArrow fillColor={campusColors[res.campus.value]} />
        </Box>
        <Text sx={{ ml: "auto", p: 2, fontSize: 1 }}>Featured Fund</Text>
      </Flex>
    </Box>
  );
}

CustomStats.propTypes = {
  processingTimeMS: PropTypes.number,
  nbHits: PropTypes.number,
};

function CustomStats({ processingTimeMS, nbHits }) {
  return (
    <>
      <Text color="primary" mb={2}>
        <span data-testid="search-result-count">{nbHits}</span> Results
        {process.env.NODE_ENV !== "production" && ` in ${processingTimeMS}ms`}
      </Text>
      <Text sx={{ display: "inline-block", fontStyle: "italic" }} mr={2}>
        Can&apos;t find what you&apos;re looking for?
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

CardContents.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object),
  hasMore: PropTypes.bool,
  refineNext: PropTypes.func,
  setOpen: PropTypes.func,
  setResult: PropTypes.func,
  open: PropTypes.bool,
};

function CardContents({ hits, hasMore, refineNext, setOpen, setResult, open }) {
  return (
    <>
      <Grid gap={3} columns={[1, 2, 3, 4]}>
        {hits.map((res) => (
          <Card
            data-testid="search-result"
            key={res.alloc_code.toString()}
            sx={{ width: ["100%", "85%", "100%"], mx: ["auto", 0] }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
              setResult(res);
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
                bg={campusColors[res.campus.value]}
                mx={-2}
                mt={-2}
                color="background"
              >
                <Flex>
                  <Text
                    sx={{ flexGrow: 1, pl: 3, pt: 3, pb: 3, fontSize: 1 }}
                    data-testid="result-campus"
                  >
                    {res.campus.label}
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
                <Box sx={{ color: "#A0A3A5", fontSize: 0, pt: 1 }}>
                  {/* {getKeywords(res)} */}
                </Box>
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
          isDisabled={!hasMore}
          onClick={refineNext}
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
    </>
  );
}

// function getKeywords(res) {
//   let keywords = [];
  
//   if (typeof res.keywords !== "undefined") {
//     res.keywords.forEach((el) => {
//       keywords.push(el.label);
//     });
//   }

//   if (typeof res.additional_keywords !== "undefined") {
//     res.additional_keywords.forEach((el) => {
//       keywords.push(el.label);
//     });
//   }

//   return keywords.length > 0 ? keywords.join(", ") : '';
// }
