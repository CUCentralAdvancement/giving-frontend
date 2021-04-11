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
            <a className="cursor-pointer" href="#recurring-gifts">
              CU Foundation
            </a>
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
          <div className="p-2 w-2/3 link-blue-underline">
            <h1>University of Colorado Foundation</h1>
            <hr className="mb-6 mr-3" />
            <h3>Our Mission</h3>
            <p>
              We receive, manage and prudently invest private support for the benefit of the University of Colorado and
              support the University’s philanthropic endeavors through donor stewardship.
            </p>
            <h3>Our Vision</h3>
            <p>
              We promote private support for the University of Colorado through donor stewardship. We manage and grow
              the endowment. We ensure the appropriate use of funds. We engage volunteer leadership. We pursue the best
              governance practices.
            </p>
            <h3>Our Values</h3>
            <ul>
              <li>We act with integrity</li>
              <li>We deliver exceptional customer service</li>
              <li>We are innovative and efficient every day</li>
              <li>We value and respect the thoughts and opinions of others</li>
              <li>We are excellent stewards of the financial resources entrusted to us</li>
              <li>furnishing technological improvements</li>
              <li>attracting the top-flight talent who ensure our success</li>
            </ul>

            <h2 className="mt-8">About the University of Colorado Foundation</h2>
            <p>
              For over 50 years, the University of Colorado Foundation has partnered with the University of Colorado to
              enhance philanthropic support for CU. Private support for the University, given through the philanthropic
              portal of the Foundation, enables the University to transform lives through education, research, clinical
              care and community engagement. See the{' '}
              <a href="https://essential.cu.edu/impact-reports/onward/?utm_campaign=2020ImpactReport&utm_source=GivingWeb">
                Annual Report to Investors 2019-20
              </a>{' '}
              and the{' '}
              <a href="https://giving.cu.edu/sites/default/files/pdfs/cu_foundation_audited_financials_2020.pdf">
                Foundation’s Audited Financial Statements
              </a>{' '}
              CU for highlights of the Foundation’s fiscal year ending June 30, 2020. See{' '}
              <a href="https://giving.cu.edu/about-us/cu-foundation/cu-foundation-financial-and-investment-documents">
                CU Foundation’s Financial and Investment Documents{' '}
              </a>{' '}
              for additional years, fiscal policies and guides.
            </p>
            <p>
              The Foundation was founded in 1967 by a group of dedicated alumni and community leaders who sought to
              raise and invest private funding for the University to augment its other revenue streams. The CU
              Foundation is a legally separate 501(c)(3) charitable organization that functions as a part of CU
              Advancement.
            </p>
            <p>
              The Foundation focuses its efforts on donor stewardship through customer service and assurance in gift
              acceptance, processing and administration. During fiscal year 2020, the Foundation processed 65,811 gifts
              and commitments. The Foundation invests and allocates gift funds in a manner consistent with the purposes
              established by donors, and distributes dollars from its managed funds to support a wide variety of
              programs and activities throughout the University system and on its four campuses.
            </p>
            <h3>Financial Highlights</h3>
            <p>
              As of Dec. 31, 2020, the Foundation managed more than $2 billion in assets for the benefit of the
              University of Colorado, including more than 3,000 current fund accounts and more than 3,000 endowment
              funds. The endowments collectively were valued at $1.8 billion, and the Foundation’s Long Term Investment
              Pool (the “LTIP”) was valued at $2.2 billion.
            </p>
            <p>
              For the six months ending Dec. 31, 2020, the LTIP increased in value by 16.74%. The LTIP’s 3-year
              annualized investment performance was +10.0%, its 7-year performance was +8.6%, its 10-year performance
              was +8.8%, and its 15-year performance was +8.0%. See the{' '}
              <a href="https://giving.cu.edu/sites/default/files/pdfs/cuf21_winter_2021_ltip_report.pdf">
                Investment Update
              </a>{' '}
              for a current report on the LTIP’s recent investment performance.
            </p>
            <h3>Governance and Staffing</h3>
            <p>
              The Foundation is governed by an elected Board of Directors. Board committees include an Investment Policy
              Committee, a Finance/Operations Committee and an Audit Committee.{' '}
              <a href="https://giving.cu.edu/about-us/cu-foundation/board-directors">
                See a list of board members and committee chairs.
              </a>
            </p>
            <p>
              The Foundation’s day-to-day operations are overseen by Jack Finlaw, its President and CEO, who works with
              an administrative staff of 20 employees.{' '}
              <a href="https://giving.cu.edu/about-us/cu-foundation/cu-foundation-leadership">
                Read more about the Foundation’s executive team.
              </a>
            </p>
            <p>
              The Foundation follows an outsourced chief investment officer model (OCIO) and contracts investment
              management services through Agility, a private investment management firm. The Foundation’s Investment
              Policy Committee establishes the investment policy parameters within which the OCIO operates, and monitors
              the OCIO’s performance with an independent consultant’s assistance.
            </p>
            <h3>Operating Budget</h3>
            <p>The Foundation generates revenue from three primary sources:</p>
            <ul>
              <li>an assessment on endowed funds in the LTIP;</li>
              <li>a distribution from the Foundation’s short term investment pool;</li>
              <li>and a distribution from a board-designated quasi-endowment.</li>
            </ul>
            <p>
              Of the $35 million in revenue budgeted for fiscal year 2021, the Foundation will retain $5 million to fund
              its operations and transfer $30 million to CU as a contribution towards funding CU Advancement’s operating
              expenses and IT infrastructure investments.
            </p>
            <h3>Endowment Spending Policy</h3>
            <p>
              The Foundation’s Board of Directors has established an Endowment Spending Policy that sets the parameters
              for spending from the endowments the Foundation holds for the University’s benefit. The board is committed
              to investing and administering all endowment funds in compliance with applicable federal and state laws
              and industry standards.
            </p>
            <p>
              The Endowment Spending Policy’s objective is to achieve a balance between the University’s present and
              future needs. This means balancing the needs of current beneficiaries and the University’s advancement
              operations, while preserving an endowment’s purchasing power to support future beneficiaries. The policy
              aims to provide the University with perpetual, growing and consistent revenue and to preserve each
              endowment’s real value, net of annual distributions and fees.
            </p>
            <p>The Endowment Spending Policy has three components:</p>
            <ul>
              <li>
                <strong>A distribution formula - </strong> The annual distribution to a CU program from an endowment is
                paid on the first day of each fiscal year (July 1) in an amount equal to 4% of the endowment’s trailing
                36-month market value as of the prior December 31
              </li>
              <li>
                <strong>An assessment to fund advancement operations - </strong> The annual assessment to fund CU
                Advancement operations is 1.5% of the market value of each endowment. The fee is calculated as of
                December 31 and paid on the following July 1 of each year.
              </li>
              <li>
                <strong>Rules relating to the suspension of distributions - </strong> The Foundation suspends
                distributions from pure endowments when the endowment’s market value is less than 90% of its historic
                gift value.
              </li>
            </ul>
            <h3>Trustees</h3>
            <p>
              On behalf of CU Advancement, the Foundation convenes quarterly meetings of Trustees who are members of a
              national philanthropic council for the University of Colorado. Trustees serve as informed advocates for
              higher education and as ambassadors for CU. Trustees work with CU Advancement staff to help identify,
              cultivate and solicit prospective donors to CU. Trustees also commit to making personal gifts to CU at a
              level that reflects that CU is among their top philanthropic priorities.{' '}
              <a href="https://giving.cu.edu/about-us/cu-foundation/trustees">See a list of Trustees.</a>
            </p>
          </div>
          <div className="p-2 w-1/3 text-center">
            <a href="https://essential.cu.edu/impact-reports/onward?utm_campaign=2020ImpactReport&amp;utm_source=GivingWeb">
              <img
                alt="Impact Report 20202"
                src="https://res.cloudinary.com/hrhyukubx/image/upload/v1617912680/giving/IR20-Medallions-nocampus-min_1_pcbms2.png"
              />
            </a>
            <a href="https://essential.cu.edu/impact-reports/onward?utm_campaign=2020ImpactReport&amp;utm_source=GivingWeb">
              <button className="p-4 mt-6 text-xl font-bold border-black border-2 hover:bg-gray hover:text-white">
                Learn more
              </button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
