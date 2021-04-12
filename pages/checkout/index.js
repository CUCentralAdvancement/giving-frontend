import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Layout from "../../components/global/Layout";
import {
  addressTypeOptions,
  giftStateOptions,
  phoneTypeOptions,
  giftNamePrefixOptions,
  countryOptionsList,
} from "../../data/donationForm";
import { userCart, authorizeNetToken, givingFormInfo } from "../../data/store";
import { useRecoilValue, useSetRecoilState } from "recoil";

const CartSummary = dynamic(() => import("../../components/cart/CartSummary"), {
  ssr: false,
});

export default function Checkout() {
  const cart = useRecoilValue(userCart);
  const setAuthorizeNetToken = useSetRecoilState(authorizeNetToken);
  const setGivingInfo = useSetRecoilState(givingFormInfo);
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      'matching-gifts': 'no',
      'individual-company': 'individual',
      'tax-receipt': 'email',
    }
  });
  const type = watch("individual-company");
  const includeSpouse = watch("include-spouse");
  const giftsMatched = watch("matching-gifts");

  function submitHandler(data) {
    let description = "";
    let orderTotal = 0.0;
    cart.forEach((item) => {
      description += item.fund_title + " (" + item.allocation_code + ")";
      // @todo Add to parse for floats, since the format is in dollars AND cents.
      orderTotal =
        parseFloat(orderTotal) + parseFloat(`${item["giving-amount"]}.00`);
    });
    data.description = description;
    data.amount = orderTotal;
    data.invoiceNumber = uuidv4().slice(0, 8);
    setGivingInfo(data);

    fetch("/api/authorize-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setAuthorizeNetToken(data.token);
          router.push("/checkout/payment");
        } else {
          // @todo Throw error.
        }
      });
  }

  return (
    <Layout>
      <div className="flex flex-col max-w-screen-lg mx-auto p-4">
        <h1>Gift Basket Summary</h1>
        <hr />
        <CartSummary cart={cart} removeCallback={null} />
        <div className="flex flex-row justify-end font-bold pt-3">
          <button
            className="bg-black text-white p-3 mr-3"
            onClick={() => {
              router.push('/cart');
            }}
          >
            Edit Gift Basket
          </button>
        </div>
      </div>
      <div style={{ backgroundColor: '#EBEDED' }}>
        <div className="max-w-screen-lg mx-auto p-4">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="max-w-screen-lg mx-auto p-4 grid grid-cols-1 gap-2">
              <div>
                <h2>Contact Information</h2>
                <span>I am giving as an:</span>
                <br />
                <span className="text-sm italic">
                  To list a spouse or partner on this gift, please use the comments box below.
                </span>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <label>
                    <input {...register('individual-company')} type="radio" value="individual" className="mr-2" />
                    Individual
                  </label>
                  <label>
                    <input
                      {...register('individual-company')}
                      type="radio"
                      value="company"
                      className="col-span-2 mr-2"
                    />
                    Company/Organization
                  </label>
                </div>
                <input
                  {...register('company-name')}
                  type="text"
                  placeholder="Name of Organization or Company"
                  className={'w-full ' + (type == 'company' ? 'visible' : 'hidden')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <select {...register('title')}>
                  {giftNamePrefixOptions.map((el) => (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </select>
                <input {...register('first-name')} placeholder="First Name" type="text" />
                <input {...register('last-name')} placeholder="Last Name" type="text" />
              </div>
              <select {...register('address-type')}>
                {addressTypeOptions.map((el) => (
                  <option key={el.label} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              <select {...register('address-country')}>
                {countryOptionsList.map((el) => (
                  <option key={el.label} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </select>
              <input {...register('address-one')} placeholder="Address / Thoroughfare" type="text" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input {...register('address-city')} placeholder="City / Locality" type="text" />
                <select {...register('address-state')}>
                  {giftStateOptions.map((el) => (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </select>
                <input {...register('address-zip')} placeholder="Postal Code" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <select {...register('phone-type')}>
                  {phoneTypeOptions.map((el) => (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </select>
                <input
                  {...register('preferred-phone')}
                  placeholder="Preferred Phone"
                  className="col-span-2"
                  type="text"
                />
              </div>
              <input {...register('email')} placeholder="Email" type="text" />
              <label>
                <input {...register('include-spouse')} className="mr-2" type="checkbox" />
                Include Spouse/Partner in your gift?
              </label>
              <input
                {...register('spouse-name')}
                placeholder="Full name of spouse/partner"
                className={includeSpouse ? 'visible' : 'hidden'}
                type="text"
              />
              <hr />
              <div>
                <span>Does your employer match charitable gifts?</span>
                <br />
                <span className="text-sm italic">
                  Not sure?{' '}
                  <a href="https://giving.cu.edu/take-advantage-matching-gift-program">Click here to find out.</a>
                </span>
              </div>
              <div data-testid="matching-gifts-radios">
                <div className="grid grid-cols-1 md:grid-cols-4 my-1">
                  <label>
                    <input {...register('matching-gifts')} type="radio" value="no" className="mr-2" />
                    No
                  </label>
                  <label>
                    <input {...register('matching-gifts')} type="radio" value="yes" className="mr-2 cols-span-3" />
                    Yes
                  </label>
                </div>
                <input
                  {...register('employer-name')}
                  placeholder="Name of your Employer"
                  className={"w-full " + (giftsMatched == 'yes' ? 'visible' : 'hidden')}
                  type="text"
                />
              </div>
              <hr />
              <h3>Comments</h3>
              <div>
                <span className="text-sm italic">
                  If you chose the Write-In option, please include any information about the intended fund in the
                  comments box below.
                </span>
              </div>
              <textarea {...register('gift-comments')} rows="4" data-testid="comments-textarea" />
              <hr />
              <h3>Tax Receipt</h3>
              <div>
                <span>How would you like to receive your gift tax receipt?</span>
                <br />
                <span className="text-sm italic">
                  This is separate from your gift confirmation and will be sent to you within 2 business days.
                </span>
              </div>
              <div data-testid="tax-receipt-radios">
                <div className="grid grid-cols-1 md:grid-cols-4 my-1">
                  <label>
                    <input {...register('tax-receipt')} type="radio" value="email" className="mr-2" />
                    Email
                  </label>
                  <label>
                    <input {...register('tax-receipt')} type="radio" value="mail" className="mr-2 col-span-3" />
                    Mail
                  </label>
                </div>
              </div>
              <label>
                <input {...register('update-profile')} className="mr-2" type="checkbox" />
                Update my profile with this information
              </label>
              <hr />
              <div className="flex flex-row items-center mt-2">
                <div className="mr-2">
                  <button className="bg-black text-white p-3" type="submit" data-testid="continue-button">
                    Continue to next step
                  </button>
                </div>
                <span className="mr-2">or</span>
                <Link href={`/checkout`}>
                  <a className="underline">Cancel</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
