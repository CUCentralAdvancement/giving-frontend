import PropTypes from 'prop-types';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
// import FadeIn from "./FadeIn";

const PageLayout = ({ children, title, sidebar = null }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col my-3">
        <div className="bg-muted-gold w-full">
          <div className="p-4 max-w-screen-xl mx-auto grid grid-cols-5 text-center divide-x divide-gray-100 cursor-pointer">
            <Link href="/about-us/central-cu-advancement">
              <a>Central CU Advancement</a>
            </Link>

            <a className="cursor-pointer" href="#recurring-gifts">
              CU Foundation
            </a>
            <a className="cursor-pointer" href="#securities">
              FAQs
            </a>
            <a className="cursor-pointer" href="#gift-planning">
              Contact Us
            </a>
            <a className="cursor-pointer" href="#crowdfuding">
              Careers
            </a>
          </div>
        </div>

        <img
          src="https://giving.cu.edu/sites/all/themes/themekit/images/interior-banners/banner-mountains.jpg"
          className="-mb-1"
          style={{ height: '100px' }}
          alt="Mountain Backdrop"
        />

        <div className="p-4 max-w-screen-lg mx-auto flex flex-row">
          <div className="p-2 w-2/3">
            <h1>Central CU Advancement</h1>
            <hr className="mb-6" />
            </div>
            </div>
            
      </div>
      {sidebar !== null ? <div></div> : <main className="flex-grow">{children}</main>}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
