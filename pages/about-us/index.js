import Layout from "../../components/global/Layout";
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

        <div className="p-4 max-w-screen-lg mx-auto">
          <h1>About Us</h1>
          <hr className="mb-6" />
          <p>
            The University of Colorado serves the state, nation and world by providing the highest levels of education,
            professional training, public service, research and health care. The Office of Advancement and the
            University of Colorado Foundation support this vision by inspiring philanthropy and investing those gifts in
            the university.
          </p>
          <p>
            Advancement guides a vital and clear mission: We aspire to unite benefactors with their passions, elevate
            grand ideas and prudently manage philanthropy—all to spark enduring support of a university that creates
            transformative impact in our communities and around the world.
          </p>

          <h2>Our Roles and Responsibilities</h2>
          <ul>
            <li>We engage benefactors to assist them in discovering and investing in ideas that matter to them.</li>
            <li>
              We promote investment in academic endeavors, scholarship needs, medical research, community enrichment,
              artistic expression and scientific breakthroughs.
            </li>
            <li>We build affinity for the university among our local communities and global partners.</li>
            <li>We collaborate with faculty to best reflect their work to university benefactors.</li>
            <li>We prudently manage and invest gifts, and ensure they are allocated to match benefactors’ intent.</li>
            <li>We do these things and more to augment CU in enhancing lives and boosting ambitious ideas.</li>
          </ul>

          <h2>Our Structure</h2>
          <p>
            CU Advancement comprises a team of about 250 working at four campuses, a central university office and at
            the CU Foundation—six distinct jurisdictions that collectively promote the university’s mission and success.
          </p>
          <img
            className="mx-auto my-8"
            alt="CU Advancement Organization Structure"
            src="https://res.cloudinary.com/hrhyukubx/image/upload/c_scale,w_900,f_auto,fl_lossy,q_auto/v1617908520/giving/pages/about-us/about-cu-advancement_qydhzb.png"
          />

          <h2>Our Leadership</h2>
          <div className="grid grid-cols-2 gap-6 mt-6 link-blue-underline">
            <div>
              <strong>Jack Finlaw</strong>
              <br />
              CEO and President of the CU Foundation
              <br />
              <a href="http://cufund.org">Learn more about the CU Foundation.</a>
            </div>

            <div>
              <strong>Deb Coffin</strong>
              <br />
              Vice Chancellor of Advancement at CU Boulder
              <br />
              <a href="http://www.colorado.edu/advancement/">Learn more about Advancement at CU Boulder.</a>
            </div>

            <div>
              <strong>Martin Wood</strong>
              <br />
              Vice Chancellor of Advancement at UCCS
              <br />
              <a href="http://www.uccs.edu/~advancement/">Learn more about Advancement at UCCS.</a>
            </div>

            <div>
              <strong>Melisa Baldwin</strong>
              <br />
              Vice Chancellor of Advancement at CU Denver
              <br />
              <a href="https://www.ucdenver.edu/offices/office-of-advancement">
                Learn more about Advancement at CU Denver.
              </a>
            </div>

            <div>
              <strong>Scott Arthur</strong>
              <br />
              Vice Chancellor of Advancement at CU Anschutz Medical Campus
              <br />
              <a href="http://supportcuanschutz.ucdenver.edu/">
                Learn more about Advancement at CU Anschutz Medical Campus.
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}