import PropTypes from 'prop-types';
import DefaultFundInfo from './DefaultFundInfo';
import WriteInFundInfo from './WriteInFundInfo';

FundInfo.propTypes = {
  fund: PropTypes.object,
};

export default function FundInfo({fund}) {
  const fundType = (typeof fund.fund_type !== 'undefined') ? fund.fund_type : 'default';
  switch (fundType) {
    case 'write_in':
      return <WriteInFundInfo fund={fund}/>;
    case 'license_plate':
    default:
      return <DefaultFundInfo fund={fund}/>;
  }
}
