import React from "react";
// import PropTypes from "prop-types";
import {
  Flex,
  Box,
  Button,
  TextInput,
} from "@cu-advancement/component-library";
import {
  connectCurrentRefinements,
  connectSearchBox,
  MenuSelect,
} from "react-instantsearch-dom";

const CustomClearRefinements = connectCurrentRefinements(CustomRefine);
const SearchBox = connectSearchBox(CustomSearch);

export default function SearchForm() {
  function handleSubmit() {
    console.log("submitted form");
  }

  return (
    <>
      <form onSubmit={handleSubmit()} data-testid="search-form">
        <Flex
          sx={{
            mx: -2,
            mb: [0, 3, 3],
            flexDirection: ["column", "row", "row"],
          }}
        >
          <Box sx={{ width: "100%", px: 2, pt: 2 }}>
            <MenuSelect
              attribute="campus.label"
              translations={{
                seeAllOption: "All Campuses",
              }}
            />
          </Box>
          <Box sx={{ width: "100%", px: 2, pt: 2 }}>
            <MenuSelect
              attribute="interests.label"
              translations={{
                seeAllOption: "All Interests",
              }}
            />
          </Box>
          <Box sx={{ width: "100%", px: 2, pt: 2 }}>
            <MenuSelect
              attribute="fund_type.label"
              translations={{
                seeAllOption: "Fund Type",
              }}
            />
          </Box>
        </Flex>
        <Flex sx={{ mx: -2, mb: 3, flexDirection: ["column", "row", "row"] }}>
          <Box sx={{ width: ["100%", "80%"], px: 2, pt: [2, 0, 0] }}>
            <SearchBox />
          </Box>
          <Box sx={{ width: ["100%", "20%"], px: 2, pt: [2, 0, 0] }}>
            {/* <Button
              variant="button.secondary"
              type="submit"
              mr={2}
              data-testid="search-button"
            >
              Search
            </Button> */}
            <CustomClearRefinements clearsQuery />
          </Box>
        </Flex>
      </form>
    </>
  );
}

function CustomSearch({ currentRefinement, isSearchStalled, refine }) {
  return (
    <TextInput
      name="search"
      type="search"
      onChange={(event) => refine(event.currentTarget.value)}
      data-testid="search-input"
    />
  );
}

function CustomRefine({ refine, items }) {
  if (items.length) {
    return (
      <Button
        variant="button.secondary"
        type="reset"
        data-testid="search-reset"
        onClick={() => refine(items)}
        isDisabled={!items.length}
      >
        Reset
      </Button>
    );
  } else {
    return null;
  }
}
