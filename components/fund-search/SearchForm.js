import React from "react";
import PropTypes from "prop-types";
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
        <div className="mb-3 flex flex-row">
          <div className="w-full px-2 pt-2" data-testid="campus-select-list">
            <MenuSelect
              attribute="campus.label"
              translations={{
                seeAllOption: 'All Campuses',
              }}
            />
          </div>
          <div className="w-full px-2 pt-2" data-testid="interests-select-list">
            <MenuSelect
              attribute="interests.label"
              translations={{
                seeAllOption: 'All Interests',
              }}
            />
          </div>
          <div className="w-full px-2 pt-2" data-testid="fund-type-select-list">
            <MenuSelect
              attribute="fund_type.label"
              translations={{
                seeAllOption: 'Fund Type',
              }}
            />
          </div>
        </div>
        <div className="mb-3 flex flex-row">
          <div className="w-4/5 px-2">
            <SearchBox />
          </div>
          <div className="w-1/5 px-2">
            <CustomClearRefinements clearsQuery />
          </div>
        </div>
      </form>
    </>
  );
}

CustomSearch.propTypes = {
  refine: PropTypes.func,
};

function CustomSearch({ refine }) {
  return (
    <input
      className="w-full p-2"
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
      <button
        className="bg-black text-white rounded py-2 px-4"
        type="reset"
        data-testid="search-reset"
        onClick={() => refine(items)}
        isDisabled={!items.length}
      >
        Reset
      </button>
    );
  } else {
    return null;
  }
}
