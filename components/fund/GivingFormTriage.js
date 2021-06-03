import PropTypes from 'prop-types';
import DefaultGivingForm from './DefaultGivingForm';
import WriteInGivingForm from './WriteInGivingForm';
import LicensePlateGivingForm from './LicensePlateGivingForm';

GivingFormTriage.propTypes = {
  fund: PropTypes.object,
};

export default function GivingFormTriage({fund}) {
  switch (fund.fund_type) {
    case 'write_in':
      return <WriteInGivingForm fund={fund}/>;
    case 'license_plate':
      return <LicensePlateGivingForm fund={fund}/>;
    default:
      return <DefaultGivingForm fund={fund}/>;
  }
}
