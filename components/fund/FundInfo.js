import DefaultFundInfo from './DefaultFundInfo';
import WriteInFundInfo from './WriteInFundInfo';
import { fundProps } from '../../data/types';

FundInfo.propTypes = {
  fund: fundProps,
};

export default function FundInfo({fund}) {
  const fundType = (typeof fund.fund_type !== 'undefined') ? fund.fund_type : 'default';
  switch (fundType) {
    case 'write_in_fund':
      return <WriteInFundInfo fund={fund}/>;
    case 'license_plate_fund':
    default:
      return <DefaultFundInfo fund={fund}/>;
  }
}
