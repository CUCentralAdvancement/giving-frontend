import PropTypes from 'prop-types';

DonationButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  updateButton: PropTypes.func,
};

export default function DonationButton({ name, label, value, selected, updateButton }) {
  return (
    <button
      onClick={() => updateButton(name, value)}
      className={selected ?
        'inline-block text-center font-medium border-2 border-black text-black bg-gray-300 px-3' +
        ' pt-2 pb-1'
        : 'inline-block text-center font-medium border-2 border-gray-500 text-gray-500 bg-white px-3' +
        ' pt-2 pb-1'}
    >
      <span className="hover:scale-110 scale-100">{label}</span>
    </button>
  );
}
