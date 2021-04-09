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

        <div className="p-4 max-w-screen-lg mx-auto">
          <h1>Work for CU Advancement</h1>
          <hr className="mb-6" />
          <p>
            We are a team of about 250 colleagues working across four campuses, the central university system and the
            University of Colorado Foundation with a collective passion for inspiring donors and investing their gifts
            in what matters to them. Together we promote and ensure the university’s long-term sustainability and
            success.{' '}
            <a href="https://giving.cu.edu/about-us">
              Learn more about our structure and leadership, and what guides our work.
            </a>
          </p>
          <p>
            We hire candidates who are interested in a more fulfilling career. Explore our open positions below, and if
            you’re the right fit, apply today to join our growing team. Click on the titles below to read more about the
            position on the CU Careers page.
          </p>

          <h2>Our culture appeals to engaged and passionate colleagues.</h2>
          <p>We are growing rapidly and always looking for colleagues with skills, passion and a focus on results.</p>
          <h2>We work in a variety of exciting and fulfilling disciplines.</h2>
          <p>
            CU is proud to be the state’s largest employer of Advancement professionals and boasts a diverse group of
            colleagues with tremendous skill and expertise.
          </p>
          <p>
            About 100 of our team members are gift officers. But CU Advancement is also home to talented professionals
            in:
          </p>
          <ul>
            <li>administrative support</li>
            <li>alumni relations</li>
            <li>annual giving</li>
            <li>data and analytics</li>
            <li>donor relations</li>
            <li>events and stewardship</li>
            <li>finance and gift administration</li>
            <li>gift planning and leadership giving</li>
            <li>information technology</li>
            <li>marketing and communications</li>
            <li>operations</li>
            <li>prospect development</li>
            <li>talent management</li>
          </ul>
          <h2>We work in the best place on Earth.</h2>
          <p>
            Located in beautiful, sunny Colorado (which is awesome for so many reasons), the University of Colorado
            advances the economy, health and culture of our communities and beyond. It has educated more than 435,000
            students who have become catalysts in business, arts, health and community growth. CU’s four campuses
            feature top-tier faculty and hands-on learning opportunities in an environment where students thrive. Learn
            more about our university system here.
          </p>
          <p>
            Our campus Advancement teams at the CU Anschutz Medical Campus, CU Boulder, CU Colorado Springs and CU
            Denver, are located in Aurora, Boulder, Colorado Springs and downtown Denver, respectively. Our central
            Advancement and CU Foundation team are located in offices in downtown Denver.
          </p>
          <h2>Still not sold?</h2>
          <p>Join us at CU because you will:</p>
          <ul>
            <li>Partner with the very best donors!</li>
            <li>Work alongside creative, hardworking and passionate colleagues.</li>
            <li>Discover fantastic opportunities for professional development and training.</li>
            <li>Find ample room to grow—we love to promote internally.</li>
            <li>Have fun at regular retreats, and team-building and recreational activities.</li>
            <li>
              Receive great benefits and perks, including exceptional health care and retirement plans, time off and
              tuition reimbursement.
            </li>
          </ul>
          <p>Did we mention the sunshine?</p>
        </div>
      </div>
    </Layout>
  );
}
