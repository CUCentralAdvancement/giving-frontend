import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../data/contexts/UserContext';
import { useContext } from 'react';

LicensePlateGivingForm.propTypes = {
  fund: PropTypes.object,
};

export default function LicensePlateGivingForm({ fund }) {
  const { dispatch } = useContext(UserContext);
  const { query } = useRouter();
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      'name-on-title': query['name-on-title'],
    },
  });

  function submitHandler(action) {
    let data = getValues();
    data.allocation_code = fund.allocation_code;
    data.fund_route = router.asPath;
    data.fund_title = fund.title;
    data.fund_campus = fund.campus;
    data['giving-amount'] = 50.00;

    dispatch({ type: 'add_to_gift_basket', payload: data });

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
