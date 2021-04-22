import PropTypes from "prop-types";
import Layout from "../../components/global/Layout";
import FundInfo from "../../components/fund/FundInfo";
import GivingForm from "../../components/fund/GivingForm";
import { baseURL } from "../../data/store";

Fund.propTypes = {
  fund: PropTypes.object,
};

export default function Fund({ fund }) {
  // console.log(fund);

  return (
    <Layout>
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, #fff, #fff 50%, #ebeeed 50%, #ebeeed)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        className="flex flex-col"
      >
        <img
          src="https://giving.cu.edu/sites/all/themes/themekit/images/interior-banners/banner-mountains.jpg"
          alt="Mountain Backdrop"
        />
        <div style={{minHeight: '570px'}} 
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-screen-lg mx-auto">
          <div>
            <FundInfo fund={fund} />
          </div>
          <div className="p-4 pl-8">
            <GivingForm fund={fund} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${baseURL}/paths/fund.json`);
  const pathsList = await res.json();

  // const paths = [];
  // Object.keys(pathsList).forEach((key) => {
  //   paths.push({
  //     params: { slug: pathsList[key] },
  //   });
  // });

  // const paths = require('../../data/fund-paths.json');

  return {
    paths: pathsList.map((el) => `/funds/${el}`),
    fallback: true,
  };
}

// This gets called on every request
export async function getStaticProps({ params }) {
  const slug = params.slug || null;

  // Fetch data from external API
  const res = await fetch(new URL(`${baseURL}/funds/${slug}.json`));
  const fund = await res.json();
  // const fund = require(`../../data/funds/${slug}.json`);

  // Pass data to the page via props
  return { props: { fund } };
}
