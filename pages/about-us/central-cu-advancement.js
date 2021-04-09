import Layout from '../../components/global/Layout';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <Layout>
      <div className="flex flex-col my-3">
        <div className="bg-muted-gold w-full">
          <div className="p-4 max-w-screen-xl mx-auto grid grid-cols-5 text-center divide-x divide-gray-100 cursor-pointer">
            <Link href="/about-us/central-cu-advancement">
              <a>Central CU Advancement</a>
            </Link>
            <Link href="/about-us/university-colorado-foundation">
              <a>CU Foundation</a>
            </Link>
            <a className="cursor-pointer" href="#securities">
              FAQs
            </a>
            <a className="cursor-pointer" href="#gift-planning">
              Contact Us
            </a>
            <Link href="/about-us/careers">
              <a>Careers</a>
            </Link>
          </div>
        </div>

        <img
          src="https://giving.cu.edu/sites/all/themes/themekit/images/interior-banners/banner-mountains.jpg"
          className="-mb-1"
          alt="Mountain Backdrop"
        />

        <div className="p-4 max-w-screen-lg mx-auto flex flex-row">
          <div className="p-2 w-2/3">
            <h1>Central CU Advancement</h1>
            <hr className="mb-6" />
            <h2>About Central Advancement Operations</h2>
            <p>
              Central Advancement works closely with CU’s four campus Advancement offices and the University of Colorado
              Foundation to advance the university’s mission.
            </p>
            <p>
              Our mission is both imaginative and pragmatic: We assist benefactors in discovering how their passions
              create lasting support for the university. We aim to boost our Advancement colleagues, too, by creating
              central services that tactically blend innovation, efficiency and expertise, and by developing strategies
              that connect donors to their dreams.
            </p>
            <p>
              In pursuit of this vision, our services are built and conceived in collaboration with our campus partners
              and the University of Colorado Foundation to advance CU by:
            </p>
            <ul>
              <li>engaging and inspiring constituents</li>
              <li>stewarding donors and their gifts</li>
              <li>increasing the sophistication and coordination of gift solicitation</li>
              <li>enabling development officers to work efficiently and effectively</li>
              <li>providing insight into giving trends and strategies</li>
              <li>furnishing technological improvements</li>
              <li>attracting the top-flight talent who ensure our success</li>
            </ul>

            <h2 className="mt-8">Central Advancement Leadership</h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div>
                <strong>Annie C. Baccary</strong>
                <br />
                Advancement Administration Officer &amp; Associate Vice President
              </div>

              <div>
                <strong>Jason Hunter</strong>
                <br />
                CIO and Associate Vice President for Data &amp; Technology
              </div>

              <div>
                <strong>Katy Kotlarczyk</strong>
                <br />
                Assistant Vice President for Gift Planning &amp; Annual Giving
              </div>

              <div>
                <strong>Raychel Roy</strong>
                <br />
                Assistant Vice President for Research, Analytics &amp; Prospect Development
              </div>
            </div>
          </div>
          <div className="p-2 w-1/3 text-center">
            <a href="https://essential.cu.edu/impact-reports/onward?utm_campaign=2020ImpactReport&amp;utm_source=GivingWeb">
              <img
                alt="Impact Report 20202"
                src="https://res.cloudinary.com/hrhyukubx/image/upload/v1617912680/giving/IR20-Medallions-nocampus-min_1_pcbms2.png"
              />
            </a>
            <a href="https://essential.cu.edu/impact-reports/onward?utm_campaign=2020ImpactReport&amp;utm_source=GivingWeb">
              <button className="p-4 mt-6 text-xl font-bold border-black border-2 hover:bg-gold">Learn more</button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
