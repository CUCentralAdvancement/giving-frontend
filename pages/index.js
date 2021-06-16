import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/global/Layout';
import { campusList, interestsList } from '../data/homepage';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  function submitHandler(data) {
    router.push('/fund/[slug]', `${data['featured-fund-select']}?amount=${data['giving-amount']}`);
  }

  return (
    <Layout>
      <div className='container mx-auto py-3 h-60 md:h-96'>
        <div className='flex flex-col justify-between bg-cover h-full' style={{
          backgroundImage: 'url(\'https://giving.cu.edu/sites/default/files/ir20-giving_site-webbanner_12-min.jpg\')',
        }}>
          <div className='flex flex-row-reverse pr-64 pt-12'>
            <div className='flex flex-col p-4 bg-gradient-to-b from-gray-500 to-transparent md:bg-opacity-60 hidden md:block'>
              <span className='text-white text-2xl'>Make a gift now.</span>
              <div className='grid grid-cols-2 gap-2 py-3'>
                <div className='px-4 py-2 bg-white text-gray-600'>Featured Funds</div>
                <Link href='/fund-search'>
                  <a data-testid='search-funds-link' className='px-4 py-2 text-white border-2 border-white'>Search Funds</a>
                </Link>
              </div>
              <form onSubmit={handleSubmit(submitHandler)} className='grid grid-cols-1 gap-3'>
                <select {...register('featured-fund-select')} className='w-full'>
                  <option value='_none'>Select a featured fund</option>
                  <option value='/fund/bridge-forward-scholarship'>Bridge Forward Scholarship Endowment</option>
                  <option value='/fund/cancer-research-general-fund'>Cancer Research General Fund</option>
                </select>
                <input {...register('giving-amount')} type='text' className='w-full' placeholder='$' />
                <input {...register('give-now')} type='submit' value='Give Now' className='w-full text-white bg-black py-2' />
              </form>
            </div>
          </div>
          <div className='py-4 text-center text-white bg-black bg-opacity-80 md:bg-opacity-40'>
            <a className='underline' href='https://essential.cu.edu/impact-reports/onward?utm_campaign=2020ImpactReport&utm_source=GivingWeb'>
              Learn how your gifts make a difference at CU. →
            </a>
          </div>
        </div>
      </div>
      <div className='max-w-screen-lg mx-auto p-2 md:p-4 flex flex-col text-center'>
        <h2 className='py-2 md:py-4'>Select a CU campus you want to support.</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {campusList.map((el, index) => (
            <Link href={el.href} key={index}>
              <a data-testid={el.testid}>
                <div
                  className='h-32'
                  style={{
                    backgroundImage: `url(${el.image})`,
                    // filter: 'brightness(.6)'
                  }}>
                  <div className={`flex flex-col justify-center items-center bg-transparent hover:bg-${el.bg} hover:w-full h-32 transition duration-500 ease-in-out`}>
                    <span className='text-white'>{el.name}</span>
                  </div>
                </div>
                <div className={`w-full bg-${el.bg}`}>&nbsp;</div>
              </a>
            </Link>
          ))}
        </div>
        <h2 className='py-4'>Find a fund that fits your passion.</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pb-4'>
          {interestsList.map((el, index) => (
            <Link href={el.href} key={index}>
              <a data-testid={el.testid}>
                <div className='flex flex-col justify-center items-center h-32 bg-gray-400 hover:bg-gold hover:text-white'>
                  <FontAwesomeIcon className='text-3xl mb-2' icon={el.icon} />
                  <span className=''>{el.name}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
