import React from "react";
import PropTypes from "prop-types";

export default function WriteInFundInfo({ fund }) {
  return (
    <div className="flex flex-col p-4 h-full">
      <h1 data-testid="fund-title">
        {fund.title}
      </h1>
      <div className="flex-grow">
        <div data-testid="fund-marketing-content" dangerouslySetInnerHTML={{ __html: fund.description}}></div>
      </div>
    </div>
  );
}

WriteInFundInfo.propTypes = {
  fund: PropTypes.exact({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

WriteInFundInfo.defaultProps = {
  fund: {
    id: 0,
    title: "",
    description: "",
  },
};
