import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Box,
  Button,
  SelectInput,
  TextInput,
} from "@cu-advancement/component-library";
import { useForm } from "react-hook-form";
import {
  campusOptions,
  interestsOptions,
  fundTypeOptions,
} from "../../data/fundMeta";

export default function SearchForm({ submitHandler, resetHandler }) {
  const { register, handleSubmit, setValue } = useForm();
  const [campus, setCampus] = useState({ value: "All", label: "All Campuses" });
  const [interest, setInterest] = useState({
    value: "All",
    label: "All Interests",
  });
  const [fundType, setFundType] = useState({
    value: "All",
    label: "Fund Type",
  });

  const resetSelects = () => {
    setFundType({ value: "All", label: "Fund Type" });
    setValue("fundType", "All");
    setInterest({ value: "All", label: "All Interests" });
    setValue("interest", "All");
    setCampus({ value: "All", label: "All Campuses" });
    setValue("campus", "All");
  };

  useEffect(() => {
    register({ name: "campus" });
    register({ name: "interest" });
    register({ name: "fundType" });
    register({ name: "search" });
  }, [register]);

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} data-testid="search-form">
        <Flex
          sx={{
            mx: -2,
            mb: [0, 3, 3],
            flexDirection: ["column", "row", "row"],
          }}
        >
          <Box sx={{ width: "100%", px: 2, pt: 2 }}>
            <SelectInput
              name="campus"
              data-testid="campus-select"
              value={campus}
              options={campusOptions}
              onChange={(selectedOption) => {
                setValue("campus", selectedOption.value);
                setCampus(selectedOption);
              }}
            />
          </Box>
          <Box sx={{ width: "100%", px: 2, pt: 2 }}>
            <SelectInput
              name="interest"
              data-testid="interests-select"
              value={interest}
              options={interestsOptions}
              onChange={(selectedOption) => {
                setValue("interest", selectedOption.value);
                setInterest(selectedOption);
              }}
            />
          </Box>
          <Box sx={{ width: "100%", px: 2, pt: 2 }}>
            <SelectInput
              name="fundType"
              data-testid="fundType-select"
              value={fundType}
              options={fundTypeOptions}
              onChange={(selectedOption) => {
                setValue("fundType", selectedOption.value);
                setFundType(selectedOption);
              }}
            />
          </Box>
        </Flex>
        <Flex sx={{ mx: -2, mb: 3, flexDirection: ["column", "row", "row"] }}>
          <Box sx={{ width: ["100%", "70%"], px: 2, pt: [2, 0, 0] }}>
            <TextInput
              // autoFocus={true}
              name="search"
              type="text"
              onChange={(e) => setValue("search", e.target.value)}
              data-testid="search-input"
            />
          </Box>
          <Box sx={{ width: ["100%", "30%"], px: 2, pt: [2, 0, 0] }}>
            <Button
              variant="button.secondary"
              type="submit"
              mr={2}
              data-testid="search-button"
            >
              Search
            </Button>
            <Button
              variant="button.secondary"
              type="reset"
              data-testid="search-reset"
              onClick={() => {
                resetHandler();
                resetSelects();
              }}
            >
              Reset
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}

SearchForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  resetHandler: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  submitHandler: (data) => alert(data),
  resetHandler: () => alert("Clicked reset handler."),
};
