import PropTypes from 'prop-types';
import DefaultFundInfo from './DefaultFundInfo';
import WriteInFundInfo from './WriteInFundInfo';

GivingFormTriage.propTypes = {
  fund: PropTypes.object,
};

export default function GivingFormTriage({fund}) {
  console.log(fund);
  switch (fund.fund_type) {
    case 'write_in':
      return <WriteInFundInfo fund={fund}/>;
    case 'license_plate':
    default:
      return <DefaultFundInfo fund={fund}/>;
  }
}
