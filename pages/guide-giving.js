import Layout from "../components/global/Layout";

export default function GuideGiving() {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="bg-muted-gold w-full">
          <div className="p-4 max-w-screen-lg mx-auto grid grid-cols-6 text-center divide-x divide-gray-100">
            <a className="cursor-pointer" href="#one-time-gifts">
              One-Time Gifts
            </a>
            <a className="cursor-pointer" href="#recurring-gifts">Recurring Gifts</a>
            <a className="cursor-pointer" href="#securities">Securities</a>
            <a className="cursor-pointer" href="#gift-planning">Gift Planning</a>
            <a className="cursor-pointer" href="#crowdfuding">Crowdfunding</a>
            <a className="cursor-pointer">Additional Options</a>
          </div>
        </div>

        <div
          style={{
            height: '440px',
            paddingTop: '130px',
            backgroundImage: 'url(https://giving.cu.edu/sites/default/files/guidetogiving_1600x470-banner-6.jpg)',
            backgroundSize: 'cover',
          }}
        >
          <div className="p-4 max-w-screen-sm mx-auto text-center text-white">
            <h1 className="text-4xl mb-2">Guide to giving</h1>
            <span className="text-2xl">There are many ways you can support CU.</span>
            <br />
            <span className="text-2xl">All of them create a better future.</span>
            <div className="grid grid-cols-3 gap-x-4 mt-4">
              <button className="p-2 border border-white">Give Online</button>
              <button className="p-2 border border-white">Give By Mail</button>
              <button className="p-2 border border-white">Give By Phone</button>
            </div>
          </div>
        </div>

        <div className="p-4 max-w-screen-lg mx-auto">
          <p className="text-lg p-2">
            There are more than 2,400 distinct funds that benefit people, places and programs throughout the University
            of Colorado's four campuses. Some gifts enable talented students to afford CU or bolster academic programs.
            Others help us recruit and retain top faculty or spur groundbreaking research. All fill vital needs and
            strengthen CU now and well into the years ahead.
          </p>
          <p className="text-lg text-center p-2">
            Explore the flexible ways you can make a gift to support what matters to you.
          </p>
          <div className="grid grid-cols-2 gap-x-7 mt-4">
            <button className="p-2 border border-black">Explore Popular Options</button>
            <button className="p-2 border border-black">Find More Ways to Give</button>
          </div>
          <div className="flex flex-row justify-center">
            <img
              alt="pagedown-arrow-gray.png"
              src="https://giving.cu.edu/sites/default/files/icons/pagedown-arrow-gray.png"
              style={{ height: '128px', width: '300px' }}
            />
          </div>
        </div>

        <div className="w-full p-12" style={{ backgroundColor: '#e5e7ea' }} id="one-time-gifts">
          <div className="p-5 max-w-screen-lg mx-auto flex flex-row bg-muted-gold border-b-8 border-gold">
            <img
              src="https://giving.cu.edu/sites/default/files/styles/story_teaser_square/public/guidetogiving_one_time-gold400.png"
              width="379"
              height="379"
              alt=""
            />
            <div className="ml-8">
              <h2 className="text-2xl text-gold mb-3 font-bold">Make a one-time gift today</h2>
              <p>
                No matter their size, one-time gifts make a big difference at CU. To give online today, choose the fund
                you want to support, enter your gift amount and follow the simple steps within the form.
              </p>
              <button className="uppercase bg-gold font-bold cursor-pointer p-2 mt-3">Get Started</button>
            </div>
          </div>
        </div>

        <div className="w-full p-12" id="recurring-gifts">
          <div className="p-5 max-w-screen-lg mx-auto flex flex-row bg-muted-gold border-b-8 border-gold">
            <div className="ml-8">
              <h2 className="text-2xl text-gold mb-3 font-bold">Set up a recurring gift</h2>
              <p>
                When you create a recurring gift, you support CU in a sustainable and convenient way. To begin, select
                the fund you want to support, enter your gift amount and be sure to select “This is a recurring gift”
                within the form.
              </p>
              <button className="uppercase bg-gold font-bold cursor-pointer p-2 mt-3">Get Started</button>
            </div>
            <img
              src="https://giving.cu.edu/sites/default/files/styles/story_teaser_square/public/guidetogiving_recurring-gold400.png"
              width="379"
              height="379"
              alt=""
            />
          </div>
        </div>

        <div className="w-full p-12" style={{ backgroundColor: '#e5e7ea' }} id="securities">
          <div className="p-5 max-w-screen-lg mx-auto flex flex-row bg-muted-gold border-b-8 border-gold">
            <img
              src="https://giving.cu.edu/sites/default/files/styles/story_teaser_square/public/guidetogiving_stockassets-gold400.png"
              width="379"
              height="379"
              alt=""
            />
            <div className="ml-8">
              <h2 className="text-2xl text-gold mb-3 font-bold">Securities and wire transfers</h2>
              <p>
                Making a gift of stocks, bonds, mutual funds and other financial assets offers you the chance to support
                our work while realizing important benefits for yourself. Whether you are wiring funds or transferring
                securities, the CU Foundation makes it easy to get started.
              </p>
              <button className="uppercase bg-gold font-bold cursor-pointer p-2 mt-3">Get Started</button>
            </div>
          </div>
        </div>

        <div className="w-full p-12" id="gift-planning">
          <div className="p-5 max-w-screen-lg mx-auto flex flex-row bg-muted-gold border-b-8 border-gold">
            <div className="ml-8">
              <h2 className="text-2xl text-gold mb-3 font-bold">Create a planned gift</h2>
              <p>
                You can make a significant impact at CU and establish your enduring legacy through a gift of your
                assets. We offer flexible options for a wide range of circumstances, and each has distinct financial
                benefits for both you and the university.
              </p>
              <button className="uppercase bg-gold font-bold cursor-pointer p-2 mt-3">Get Started</button>
            </div>
            <img
              src="https://giving.cu.edu/sites/default/files/styles/story_teaser_square/public/guidetogiving_planned_gift-gold400.png"
              width="379"
              height="379"
              alt=""
            />
          </div>
        </div>

        <div className="w-full p-12" style={{ backgroundColor: '#e5e7ea' }} id="crowdfuding">
          <div className="p-5 max-w-screen-lg mx-auto flex flex-row bg-muted-gold border-b-8 border-gold">
            <img
              src="https://giving.cu.edu/sites/default/files/styles/story_teaser_square/public/guidetogiving_crowdfunding-gold400.png"
              width="379"
              height="379"
              alt=""
            />
            <div className="ml-8">
              <h2 className="text-2xl text-gold mb-3 font-bold">Join a crowdfunding campaign</h2>
              <p>
                Combining your gift with the generosity of others propels us closer to our goals and magnifies the
                spirit of giving. Explore our crowdfunding campaigns and team up with other CU supporters.
              </p>
              <button className="uppercase bg-gold font-bold cursor-pointer p-2 mt-3">Get Started</button>
            </div>
          </div>
        </div>

        <div className="w-full p-12 bg-muted-gold">
          <div className="p-5 max-w-screen-lg mx-auto">
            <h2 className="text-2xl text-gold mb-3 font-bold text-center">Other Giving Options</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Honorary and memorial gifts</h3>
                <p>
                  You can designate any gift in honor or memory of a loved one or influential individual. To begin,
                  choose a fund and select “Yes” under the memory and honor section when entering your gift amount.
                </p>
                <a className="text-gold font-italic">Get started.</a>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Employer matching gifts</h3>
                <p>
                  You might double or even triple the value of your gift if you work for an employer that matches gifts.
                  Use our search tool to see if your employer participates, follow the instructions and maximize your
                  impact.
                </p>
                <a className="text-gold font-italic">Get started.</a>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">CU payroll deduction</h3>
                <p>
                  CU staff and faculty can conveniently set up a recurring gift—processed automatically as a payroll
                  deduction—to support CU on a schedule that’s right for you.
                </p>
                <a className="text-gold font-italic">Learn how.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}