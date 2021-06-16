import PropTypes from 'prop-types';
import DefaultGivingForm from './DefaultGivingForm';
import WriteInGivingForm from './WriteInGivingForm';
import LicensePlateGivingForm from './LicensePlateGivingForm';

GivingForm.propTypes = {
  fund: PropTypes.object,
};

export default function GivingForm({fund}) {
  const fundType = (typeof fund.fund_type !== 'undefined') ? fund.fund_type : 'default';
  switch (fundType) {
    case 'write_in':
      return <WriteInGivingForm fund={fund}/>;
    case 'license_plate':
      return <LicensePlateGivingForm fund={fund}/>;
    default:
      return <DefaultGivingForm fund={fund}/>;
  }
}
