import PropTypes from "prop-types";
import Link from "next/link";
import { campusColors, campusLogos } from "../../data/fundMeta";

/**
 * Description of the search results component.
 */
export default function FundCard({ result, close }) {
  return (
    <div className="flex flex-col" data-testid="fund-card-container">
      <div
        className="flex flex-row justify-end align-baseline p-3 cursor-pointer text-white text-2xl"
        style={{
          backgroundColor: campusColors[result.campus],
        }}
        data-testid="fund-card-close"
        onClick={close}
        onKeyPress={close}
        role="button"
        tabIndex="0"
      >
        <span className="mr-2">X</span>
        <span>close</span>
      </div>
      <div className="px-3 py-4" style={{ backgroundColor: '#fcfcfc' }}>
        <img
          data-testid="fund-card-campus"
          src={campusLogos[result.campus]}
          alt={`${result.campus} Logo`}
          style={{ height: '60px' }}
        />
      </div>
      <div className="p-6 bg-white">
        <h2 data-testid="fund-card-title">{result.title}</h2>
        <p data-testid="fund-card-description">{result.description}</p>
        <Link as={`fund/${result.slug}`} href="fund/[slug]">
          <a>
            <button className="bg-black p-3 text-white">Make a Gift</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

FundCard.propTypes = {
  /**
   * The name of the button.
   */
  result: PropTypes.object,
  /**
   * If disabled, the button has less opacity and can't be clicked.
   */
  close: PropTypes.func,
};

FundCard.defaultProps = {
  result: {
    title: "",
    campus: "UCCS",
  },
  close: () => {
    console.log("closed");
  },
};
