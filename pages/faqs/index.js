import Layout from '../../components/global/Layout';
import { baseURL } from '../../data/store';
import { defaultFaqProps, faqProps } from '../../data/types';

Index.propTypes = {
  faqs: faqProps,
};

Index.defaultProps = {
  faqs: defaultFaqProps,
};

export default function Index({ faqs }) {
  return (
    <Layout>
      <div className='flex flex-col'>
        <img
          src='https://giving.cu.edu/sites/all/themes/themekit/images/interior-banners/banner-mountains.jpg'
          alt='Mountain Backdrop'
        />
        <div className='max-w-screen-xl mx-auto link-blue-underline'>
          <h1 className="text-center">Frequently Asked Questions</h1>
          {Object.keys(faqs).map((category, index) => {
            return (
              <div className="p-2" key={index}>
                <span className="text-2xl font-bold mt-4">{category}</span>
                <hr className="p-2" />
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  list-none">
                  {faqs[category].map((faq, ind) => {
                    return (
                      <li key={ind}>
                        <a href={`#${faq.slug}`}>{faq.question}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
          <ul className='list-none'>
            {Object.keys(faqs).map((category, index) => {
              return (
                <li key={index}>
                  <h2>{category}</h2>
                  <hr />
                  <ul className='list-none'>
                    {faqs[category].map((faq, ind) => {
                      return (
                        <li key={ind}>
                          <h3 id={faq.slug}>{faq.question}</h3>
                          <div className='md:pl-3' dangerouslySetInnerHTML={{ __html: faq.answer }} />
                          { ind < faqs[category].length - 1 && <hr /> }
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(new URL(`${baseURL}/api/faqs`));
  const faqs = await res.json();
  return { props: { faqs } };
}
