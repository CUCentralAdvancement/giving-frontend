import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { campusColors } from '../../data/fundMeta';
import FundCard from './FundCard';
import RightArrow from '../global/RightArrow';
import { useWindowDimensions } from '../../utils/hooks';
import { connectStats, connectInfiniteHits } from 'react-instantsearch-dom';

// The portal can't render server-side.
const Portal = dynamic(() => import('../global/Portal'), {
  ssr: false,
});

const CustomHits = connectInfiniteHits(CardContents);
const Header = connectStats(CustomStats);

/**
 * Description of the search results component.
 */
export default function SearchResults() {
  // console.log(results);
  const [fundCardResult, setFundCardResult] = useState({
    title: '',
    campus: 'UCCS',
  });
  const [open, setOpen] = useState(false);
  const dimensions = useWindowDimensions();

  const styleProps = {
    height: '100%',
    position: 'fixed',
    top: 0,
    left: '100%',
    zIndex: 1000,
    width: dimensions.width < 1000 ? '100%' : '40%',
    overflowY: 'scroll',
    background: '#fff',
    boxShadow: '-3px 0 10px rgba(20,20,20,.1)',
  };

  return (
    <div className='container mx-auto'>
      <div className='p-3'>
        <Header />
      </div>
      <CustomHits setResult={setFundCardResult} setOpen={setOpen} open={open} />
      <Portal>
        <AnimatePresence>
          {
            // @todo Adbstract this into a component and use a recoil atom to share the current fund being opened.
            open && (
              <motion.div
                style={styleProps}
                key={1}
                initial={{ transform: 'translateX(0%)' }}
                animate={{ transform: 'translateX(-100%)' }}
                exit={{ transform: 'translateX(0%)' }}
                transition={{ duration: 0.3 }}
              >
                <FundCard
                  result={fundCardResult}
                  close={() => {
                    setOpen(false);
                  }}
                />
              </motion.div>
            )
          }
        </AnimatePresence>
      </Portal>
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.exact({
      alloc_code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fund_type: PropTypes.string,
      featured: PropTypes.string.isRequired,
      campus: PropTypes.string.isRequired,
      interests: PropTypes.string.isRequired,
      keywords: PropTypes.arrayOf(PropTypes.string),
      additional_keywords: PropTypes.arrayOf(PropTypes.string),
      path: PropTypes.string.isRequired,
    }),
  ),
};

SearchResults.defaultProps = {
  results: [
    {
      alloc_code: '',
      title: '',
      description: '',
      fund_type: '',
      featured: '',
      campus: '',
      interests: '',
      keywords: [],
      additional_keywords: [],
      path: '',
    },
  ],
};

FeaturedFund.propTypes = {
  res: PropTypes.object,
};

function FeaturedFund({ res }) {
  return (
    <div
      className='bg-black -mr-2 my-2'
      style={{ height: '38px' }}
      data-testid='featured-fund'
    >
      <div className='flex flex-row'>
        <div className='h-full'>
          <RightArrow fillColor={campusColors[res.campus]} />
        </div>
        <span className='ml-auto p-2 text-sm'>Featured Fund</span>
      </div>
    </div>
  );
}

CustomStats.propTypes = {
  processingTimeMS: PropTypes.number,
  nbHits: PropTypes.number,
};

function CustomStats({ processingTimeMS, nbHits }) {
  return (
    <>
      <span className='mb-2 color-gold'>
        <span data-testid='search-result-count'>{nbHits}</span> Results
        {process.env.NODE_ENV !== 'production' && ` in ${processingTimeMS}ms`}
      </span>
      <br />
      <span className='italic mr-2'>
        Can&apos;t find what you&apos;re looking for?
      </span>
      <Link href='/fund/write-fund'>
        <a className='inline-block italic no-underline hover:underline'
           style={{ color: '#298FCE' }}
           data-testid='write-in-link'
        >
          Click here to use our write-in fund option.
        </a>
      </Link>
    </>
  );
}

CardContents.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object),
  hasMore: PropTypes.bool,
  refineNext: PropTypes.func,
  setOpen: PropTypes.func,
  setResult: PropTypes.func,
  open: PropTypes.bool,
};

function CardContents({ hits, hasMore, refineNext, setOpen, setResult, open }) {
  return (
    <>
      <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {hits.map((res) => (
          <div
            className='p-2 border border-gray shadow'
            data-testid='search-result'
            key={res.allocation_code.toString()}
            role='link'
            tabIndex='0'
            onClick={() => {
              setOpen(!open);
              setResult(res);
            }}
            onKeyPress={() => {
              setOpen(!open);
              setResult(res);
            }}
          >
            <div
              className='flex flex-col cursor-pointer'
              style={{
                minHeight: 231,
              }}
            >
              <div className='-mx-2 -mt-2 text-white' style={{ backgroundColor: campusColors[res.campus] }}>
                <div className='flex justify-between align-center'>
                  <span className='text-lg pl-2 py-3' data-testid='result-campus'>
                    {res.campus}
                  </span>
                  {res.featured_fund && <FeaturedFund res={res}></FeaturedFund>}
                </div>
              </div>
              <h3 className='flex-grow' data-testid='result-title'>
                {res.title}
              </h3>
              <span
                className='p-2 font-bold text-sm'
                style={{
                  color: '#4D5259',
                  lineHeight: 1.2,
                }}
                data-testid='result-interest'
              >
                {res.interest}
                <div className='pt-1 text-xs' style={{ color: '#A0A3A5' }}>
                  {res.keywords || <span className='text-white'>&nbsp;</span>}
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-row items-center justify-center py-4'>
        <button
          className='p-3 mr-2 border font-semibold'
          data-testid='load-more-button'
          disabled={!hasMore}
          onClick={refineNext}
        >
          Load more funds...
        </button>
        <a href='#top'>
          <button className='p-3 border font-semibold' data-testid='refine-search-button'>
            Refine my search
          </button>
        </a>
      </div>
    </>
  );
}
