import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from '../components/global/Layout';
import { useDonor } from '../data/contexts/DonorContext';

const CartSummary = dynamic(() => import('../components/cart/CartSummary'), {
  ssr: false,
});

export default function Cart() {
  // const { user, dispatch } = useContext(UserContext);
  const { giftBasket, removeFromGiftBasket } = useDonor()

  return (
    <Layout>
      <div className='bg-green-500 text-white p-3'>
        <div className='max-w-screen-lg mx-auto'>
          An alert for adding/removing items could go here.
          {/* <Close ml="auto" mr={-2} /> */}
        </div>
      </div>
      <div className='flex flex-col max-w-screen-lg mx-auto p-4'>
        { giftBasket?.length === 0 ? (
          <span>Your gift basket is empty.</span>
        ) : (
          <>
            <h1>Gift Basket Summary</h1>
            <hr />
            <CartSummary cart={giftBasket} removeCallback={removeFromGiftBasket} />
            <p>
              All gifts in support of the university are processed and receipted
              by the University of Colorado Foundation, a 501(c)(3) charitable
              entity.
            </p>
            <div className='flex flex-row justify-end font-bold pt-3'>
              <Link href='/fund-search'>
                <a>
                  <button className='bg-black text-white mr-3 p-3'
                          data-testid='add-another-gift-button'>
                    Add Another Gift
                  </button>
                </a>
              </Link>
              <Link href='/checkout'>
                <a>
                  <button
                    className='bg-black text-white mr-3 p-3'
                    data-testid='checkout-button'
                    // onClick={() => {
                    //   router.push("/checkout");
                    // }}
                  >
                    Checkout
                  </button>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
