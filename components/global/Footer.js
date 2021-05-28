import Link from 'next/link';

const Footer = () => (
  <footer className="bg-black p-4 text-white">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="flex flex-col items-center text-center">
        <Link href="/fund-search">
          <a>
            <button className="p-3 text-black font-bold bg-gold text-lg" data-testid="footer-give-button">
              Give Now
            </button>
          </a>
        </Link>
        <div className="p-3">
          CU Advancement | CU Foundation
          <br />
          1800 Grant Street | Denver, CO 80203
          <br />
          303-541-1290 | giving@cu.edu
          <br />
          <a className="underline text-blue-500" href="https://www.cu.edu/privacy-policy">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a className="underline text-blue-500" href="https://www.cu.edu/terms-service">
            Terms of Service
          </a>
        </div>
      </div>
      <div>
        <h3>About Us</h3>
        <ul className="list-none">
          <li>
            <Link href="/about-us/central-cu-advancement">
              <a>Central CU Advancement</a>
            </Link>
          </li>
          <li>
            <Link href="/about-us/university-colorado-foundation">
              <a>CU Foundation</a>
            </Link>
          </li>
          <li>
            <Link href="/about-us/cu-foundation/cu-foundation-financial-and-investment-documents">
              <a>CU Foundation Reports &amp; Financials</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>Quicklinks</h3>
        <ul className="list-none">
          <li>
            <Link href="/guide-giving">
              <a>Guide to Giving</a>
            </Link>
          </li>
          <li>
            <Link href="/faq/make-gift-mail">
              <a>Give by Mail/Check</a>
            </Link>
          </li>
          <li>
            <Link href="/faq/make-gift-phone">
              <a>Give by Phone</a>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <a>FAQs</a>
            </Link>
          </li>
          <li>
            <Link href="/about-us/careers">
              <a>Careers</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>Campus Offices</h3>
        <ul className="list-none">
          <li>
            <a href="https://supportcuanschutz.ucdenver.edu/">
              Anschutz
            </a>
          </li>
          <li>
            <a href="https://www.colorado.edu/advancement/">
              Boulder
            </a>
          </li>
          <li>
            <a href="https://www.uccs.edu/~advancement/">
              Colorado Springs
            </a>
          </li>
          <li>
            <a href="https://www.ucdenver.edu/offices/office-of-advancement">
              Denver
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
