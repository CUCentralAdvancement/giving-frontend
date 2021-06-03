import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { userCart, giftSummaryLog } from '../../data/store';
import { useRecoilState, useSetRecoilState } from 'recoil';

LicensePlateGivingForm.propTypes = {
  fund: PropTypes.object,
};

export default function LicensePlateGivingForm({ fund }) {
  const [cart, setCart] = useRecoilState(userCart);
  const setGiftSummary = useSetRecoilState(giftSummaryLog);
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm();

  function submitHandler(action) {
    let data = getValues();
    data.allocation_code = fund.allocation_code;
    data.fund_route = router.asPath;
    data.fund_title = fund.title;
    data.fund_campus = fund.campus;
    data['giving-amount'] = 50.00;


    setCart([...cart, data]);
    setGiftSummary([...cart, data]);
    window.localStorage.setItem('userCart', JSON.stringify([...cart, data]));

    switch (action) {
      case 'add to basket':
        router.push('/cart');
        break;
      case 'give now':
        router.push('/checkout');
        break;
    }
  }

  function dummySubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(dummySubmit)}>
      <label htmlFor='name-on-title'>Name as it appears on Vehicle Title:</label>
      <input {...register('name-on-title')} className='w-full' type='text' />
      <div className='grid grid-cols-1 md:grid-cols-2 mt-3 gap-4'>
        <button
          className='bg-black text-white p-2'
          data-testid='add-to-basket-button'
          onClick={() => {
            submitHandler('add to basket');
          }}
        >
          Add to Basket
        </button>
        <button
          className='bg-black text-white p-2'
          data-testid='give-now-button'
          onClick={() => {
            submitHandler('give now');
          }}
        >
          Give Now
        </button>
      </div>
    </form>
  );
}
