import PropTypes from 'prop-types';

export const defaultFundProps = {
    id: 0,
    title: '',
    description: '',
    // marketingContent: '',
    campus: '',
    interest: '950',
    allocation_code: '',
    keywords: '',
    suggested_amount: '50',
    marketing_content: {},
    created_at: '',
    updated_at: '',
    fund_type: 'default',
    url: '',
  };

export const fundProps = PropTypes.exact({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // marketingContent: PropTypes.string.isRequired,
  campus: PropTypes.string.isRequired,
  interest: PropTypes.string,
  keywords: PropTypes.string,
  suggested_amount: PropTypes.string,
  marketing_content: PropTypes.object,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  fund_type: PropTypes.string.isRequired,
  allocation_code: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
