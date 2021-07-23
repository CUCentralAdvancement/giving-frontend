import React from 'react';
import Link from 'next/link';
import { defaultFundProps, fundProps } from '../../data/types';

DefaultFundInfo.propTypes = { fund: fundProps };
DefaultFundInfo.defaultProps = {fund: defaultFundProps} ;

export default function DefaultFundInfo({ fund }) {
  return (
    <div className='flex flex-col p-4 h-full'>
      <h1 data-testid='fund-title'>
        {fund.title}
      </h1>
      <div className='flex-grow'>
        <p data-testid='fund-description'>{fund.description}</p>
        <div data-testid='fund-marketing-content' dangerouslySetInnerHTML={{ __html: fund.marketingContent }}/>
      </div>
      <div className='pt-2'>
        <span className='inline-block'>Campus:&nbsp;</span>
        <Link href={`/fund-search?field_campus=${fund.campus}`}>
          <a className='text-gold' data-testid='fund-campus'>
            {fund.campus}
          </a>
        </Link>
        <br />
        <span className='inline-block'>Allocation Code:&nbsp;</span>
        <span className='inline-block text-gold' data-testid='fund-allocation-code'>
          {fund.allocation_code}
        </span>
        <br />
        <span className='inline-block'>Interest:&nbsp;</span>
        <Link href={`/fund-search?field_fund_interests=${encodeURIComponent(fund.interest)}`}>
          <a data-testid='fund-interest' className='text-gold'>
            {fund.interest}
          </a>
        </Link>
      </div>
    </div>
  );
}
