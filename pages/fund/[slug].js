import PropTypes from "prop-types";
import Layout from "../../components/global/Layout";
import FundInfo from "../../components/fund/FundInfo";
import { baseURL } from "../../data/store";
import GivingForm from '../../components/fund/GivingForm';

Fund.propTypes = {
  fund: PropTypes.object,
};

Fund.defaultProps = {
  fund: {
    id: 0,
    title: "",
    description: "",
    marketingContent: "",
    campus: "",
    interest: "950",
    allocation_code: "",
    fund_type: 'default',
  },
};

export default function Fund({ fund }) {
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
          {/*  @todo Need to add disclaimer body here. It can be derived from the allocation
           code.*/}
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
  return {
    paths: pathsList.map((el) => `/fund/${el}`),
    fallback: true,
  };
}

// This gets called on every request
export async function getStaticProps({ params }) {
  const slug = params.slug || null;

  // Need to fetch at "/funds" since Rails defaults models to plural whereas the giving site
  // currently uses "/fund".
  const res = await fetch(new URL(`${baseURL}/funds/${slug}.json`));
  const fund = await res.json();
  return { props: { fund } };
}
