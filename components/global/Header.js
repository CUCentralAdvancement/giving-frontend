import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useAnimation } from 'framer-motion';
import { useDonor } from '../../data/contexts/DonorContext';

export default function Header() {
  const { giftBasket,  } = useDonor();
  const [cartItems, setCartItems] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    setCartItems(parseInt(giftBasket?.length));
    controls.start({
      scale: 1,
      transition: {
        type: 'spring',
        velocity: 70,
        stiffness: 300,
        damping: 100,
      },
    });
  }, [giftBasket, controls]);

  return (
    <header role='banner' className='flex flex-row max-w-screen-lg mx-auto items-center justify-between pt-3'>
      <div className='p-2 mr-3'>
        <Link href="/">
          <a>
            <img
              src='https://giving.cu.edu/sites/all/themes/themekit/images/logo.svg'
              style={{ width: '317px' }}
              data-testid='header-cu-logo'
              alt='University of Colorado Logo'
            />
          </a>
        </Link>
      </div>
      <div className='text-lg uppercase p-2 grid gap-4 grid-cols-3 text-center divide-x divide-gray-400'>
        <Link href='/guide-giving'>
          <a className='hover:underline'>Guide to Giving</a>
        </Link>
        <a className='hover:underline pl-2' href='https://essential.cu.edu' rel='noreferrer' target='_blank'>
          Essential CU
        </a>
        <Link href='/about-us'>
          <a className='hover:underline text-left pl-3'>About Us</a>
        </Link>
      </div>
      <div>
        <div className='flex flex-col items-center justify-items-center'>
          <span style={{ marginLeft: '20px', height: '40px' }}>
            <Link href='/cart'>
              <a
                className='cart-items-total'
                style={{
                  textDecoration: 'none',
                  color: '#000',
                  fontWeight: 700,
                }}
              >
                <div style={{ marginRight: '6px', display: 'inline' }}>
                  <FontAwesomeIcon style={{ height: '20px' }} icon={faShoppingBasket} />
                </div>
                Gift Basket
                <div
                  className='ml-2 text-center text-white inline-block align-top'
                  data-testid='cart-items-total'
                  style={{
                    borderRadius: '50%',
                    height: '27px',
                    width: '27px',
                    backgroundColor: cartItems > 0 ? '#000' : '#fff',
                  }}
                >
                  {cartItems}
                </div>
              </a>
            </Link>
          </span>
          <Link href='/fund-search'>
            <a>
              <button className='uppercase bg-gold font-bold cursor-pointer p-2'>Give Now</button>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
