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
  slug: '',
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
  marketing_content: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  fund_type: PropTypes.string.isRequired,
  allocation_code: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
});

export const faqProps = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  detailed_question: PropTypes.string,
};

export const defaultFaqProps = {
  question: 'What is the purpose of life?',
  answer: 'To die gracefully.',
  category: 'Angst',
  slug: 'faq/wwjd',
  detailed_question: null,
};

export const faqsProps = PropTypes.arrayOf(faqProps);
export const defaultFaqsProps = [defaultFaqProps];
