import React from "react";
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
import {
  connectCurrentRefinements,
  connectSearchBox,
  MenuSelect,
} from "react-instantsearch-dom";

const CustomClearRefinements = connectCurrentRefinements(CustomRefine);
const SearchBox = connectSearchBox(CustomSearch);

export default function SearchForm() {
  const { query } = useRouter();
  console.log(query);
  function handleSubmit() {
    console.log("submitted form");
  }

  return (
    <>
      <form onSubmit={handleSubmit()} data-testid="search-form">
        <div className="mb-3 flex flex-row">
          <div className="w-full px-2 pt-2" data-testid="campus-select-list">
            <MenuSelect
              attribute="campus"
              defaultRefinement={query.campus ? query.campus : ''}
              translations={{
                seeAllOption: 'All Campuses',
              }}
            />
          </div>
          <div className="w-full px-2 pt-2" data-testid="interests-select-list">
            <MenuSelect
              attribute="interest"
              defaultRefinement={query.field_fund_interests ? decodeURIComponent(query.field_fund_interests) : ''}
              translations={{
                seeAllOption: 'All Interests',
              }}
            />
          </div>
          <div className="w-full px-2 pt-2" data-testid="fund-type-select-list">
            <MenuSelect
              attribute="fund_type"
              defaultRefinement={query.fund_type ? query.fund_type : ''}
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
        disabled={!items.length}
      >
        Reset
      </button>
    );
  } else {
    return null;
  }
}
