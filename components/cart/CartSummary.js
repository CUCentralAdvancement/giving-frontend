import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

CartSummary.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  removeCallback: PropTypes.func,
};

export default function CartSummary({ cart = [], removeCallback }) {

  let orderTotal = 0;
  console.log(cart);
  cart.forEach((item) => {
    orderTotal += parseInt(item['giving-amount']);
  });


  return (
    <>
      <div className='animate-fade-in-up'>
        {cart.map((item) => {
          return (
            <div
              key={item.allocation_code}
              data-testid='cart-item'
              className='flex flex-row border-b-2 border-dotted p-3 align-baseline'
            >
              <div className='flex-grow'>
                <Link href='/fund/[slug]' as={item.fund_route}>
                  <a className='no-underline hover:underline'>
                    {item.fund_title} ({item.fund_campus})
                  </a>
                </Link>
              </div>
              <div className='flex flex-row justify-around align-baseline'>
                <button
                  className={'bg-black text-white p-2 ' + (removeCallback !== null ? 'visible' : 'hidden')}
                  onClick={() => {
                    removeCallback(item);
                  }}
                  name='remove-from-cart'
                  data-testid='remove-from-cart-button'
                >
                  Remove
                </button>
                <span className='ml-2'>${item['giving-amount']}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex flex-row justify-end font-bold pt-3'>
        <span>Total:</span>
        <span className='ml-3 pr-4' data-testid='order-total'>
          ${orderTotal}
        </span>
      </div>
    </>
  );
}
