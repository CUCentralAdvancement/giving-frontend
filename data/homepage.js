import {
  faGraduationCap,
  faTheaterMasks,
  faRunning,
  faUsers,
  faLightbulb,
  faHeartbeat,
  faScroll,
  faMicroscope
} from '@fortawesome/free-solid-svg-icons';

export const campusList = [
  {
    name: 'CU Anschutz',
    image: 'https://giving.cu.edu/sites/all/themes/themekit/images/campus-Anschutz-Medical.jpg',
    href: '/fund-search?field_campus=Anschutz',
    testid: 'anschutz-fund-search-link',
    bg: 'green-500'
  },
  {
    name: 'CU Boulder',
    image: 'https://giving.cu.edu/sites/all/themes/themekit/images/campus-Boulder.jpg',
    href: '/fund-search?field_campus=Boulder',
    testid: 'boulder-fund-search-link',
    bg: 'yellow-500'
  },
  {
    name: 'CU Denver',
    image: 'https://giving.cu.edu/sites/all/themes/themekit/images/campus-Denver.jpg',
    href: '/fund-search?field_campus=Denver',
    testid: 'denver-fund-search-link',
    bg: 'pink-500'
  },
  {
    name: 'UCCS',
    image: 'https://giving.cu.edu/sites/all/themes/themekit/images/campus-Colorado-Springs.jpg',
    href: '/fund-search?field_campus=UCCS',
    testid: 'uccs-fund-search-link',
    bg: 'blue-500'
  },
];

export const interestsList = [
  {
    name: 'Alumni Programs',
    icon: faGraduationCap,
    href: '/fund-search?field_fund_interests=Alumni%20Programs',
    testid: 'alumni-programs-fund-search-link'
  },
  {
    name: 'Arts & Culture',
    icon: faTheaterMasks,
    href: '/fund-search?field_fund_interests=Arts%20%26%20Culture',
    testid: 'arts-culture-fund-search-link'
  },
  {
    name: 'Athletics & Recreation',
    icon: faRunning,
    href: '/fund-search?field_fund_interests=Athletics%20%26%20Recreation',
    testid: 'athletics-recreation-fund-search-link'
  },
  {
    name: 'Community & Society',
    icon: faUsers,
    href: '/fund-search?field_fund_interests=Community%20%26%20Society',
    testid: 'community-society-fund-search-link'
  },
  {
    name: 'Enterprise & Entrepreneurship',
    icon: faLightbulb,
    href: '/fund-search?field_fund_interests=Enterprise%20%26%20Entrepreneurship',
    testid: 'enterprise-entrepr-fund-search-link'
  },
  {
    name: 'Health & Wellness',
    icon: faHeartbeat,
    href: '/fund-search?field_fund_interests=Health%20%26%20Wellness',
    testid: 'health-wellness-fund-search-link'
  },
  {
    name: 'Scholarships & Student Success',
    icon: faScroll,
    href: '/fund-search?field_fund_interests=Scholarships%20%26%20Student%20Success',
    testid: 'scholarships-student-fund-search-link'
  },
  {
    name: 'Science, Research & Innovation',
    icon: faMicroscope,
    href: '/fund-search?field_fund_interests=Science,%20Research%20%26%20Innovation',
    testid: 'science-research-fund-search-link'
  },
];
