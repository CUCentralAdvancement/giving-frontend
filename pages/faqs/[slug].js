import Link from 'next/link';

import Layout from '../../components/global/Layout';
import { baseURL } from '../../data/store';
import { defaultFaqProps, faqProps } from '../../data/types';

Faq.propTypes = {
  faq: faqProps,
};

Faq.defaultProps = {
  faq: defaultFaqProps,
};

export default function Faq({ faq }) {
  console.log(faq);
  return (
    <Layout>
      <div className='flex flex-col'>
        <img
          src='https://giving.cu.edu/sites/all/themes/themekit/images/interior-banners/banner-mountains.jpg'
          alt='Mountain Backdrop'
        />
        <div className='max-w-screen-lg mx-auto link-blue-underline'>
          <h1 className=''>{faq.question}</h1>
          <Link href='/faqs'>
            <a>{`<--Back to All Faqs`}</a>
          </Link>
          <div data-testid='fund-description' dangerouslySetInnerHTML={{ __html: faq.answer }} />
          {faq.detailed_question && <p>{faq.detailed_question}</p>}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${baseURL}/api/paths/faq`);
  const pathsList = await res.json();
  return {
    paths: pathsList.map((el) => `/faqs/${el}`),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug || null;
  const res = await fetch(new URL(`${baseURL}/api/faqs/${slug}`));
  const faq = await res.json();
  return { props: { faq } };
}
