import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Heading,
  Text,
  Grid,
  // Radio,
  TextInput,
  SelectInput,
  Button,
} from "@cu-advancement/component-library";
import { Checkbox, Label, Radio } from "theme-ui";
import { userCart, giftSummaryLog } from "../../data/store";
import { useRecoilState, useSetRecoilState } from "recoil";
import { campusNames } from "../../data/fundMeta";
import {
  giftNamePrefixOptions,
  givingAmounts,
  reocurringGiftFrequencyOptions,
  honorMemorySelectorOptions,
  giftStateOptions,
  countryOptionsList,
} from "../../data/donationForm";

GivingForm.propTypes = {
  fund: PropTypes.object,
};

export default function GivingForm({ fund }) {
  const [cart, setCart] = useRecoilState(userCart);
  const setGiftSummary = useSetRecoilState(giftSummaryLog);
  const router = useRouter();
  // console.log(router);
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      "giving-amount": 50,
      inHonorOf: 0,
    },
  });
  const givingAmount = watch("giving-amount");
  const inHonorOf = watch("inHonorOf");
  const pledgePayment = watch("pledgePayment");
  const [reocurringGift, setReocurringGift] = useState(false);
  const [reocurringGiftFrequency, setReocurringGiftFrequency] = useState({
    value: "_none",
    label: "How Often?",
  });
  const [honorMemorySelector, setHonorMemorySelector] = useState({
    value: "memory",
    label: "In Memory Of",
  });
  const [giftNamePrefix, setGiftNamePrefix] = useState({
    value: "_none",
    label: "Prefix",
  });
  const [giftState, setGiftState] = useState({
    value: "none",
    label: "State",
  });
  const [giftCountry, setGiftCountry] = useState({
    value: "US",
    label: "United States",
  });

  function submitHandler(action) {
    let data = getValues();
    data.allocationCode = fund.allocationCode;
    data.fundRoute = router.asPath;
    data.fundTitle = fund.title;
    data.fundCampus = campusNames[fund.campus];

    if (data["giving-amount"] === "other") {
      data["giving-amount"] = data["other-amount"];
    }

    setCart([...cart, data]);
    setGiftSummary([...cart, data]);
    window.localStorage.setItem("userCart", JSON.stringify([...cart, data]));

    switch (action) {
      case "add to basket":
        router.push("/cart");
        break;
      case "give now":
        router.push("/checkout");
        break;
    }
  }

  function dummySubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    register({ name: "giving-amount" });
    register({ name: "other-amount" });
    register({ name: "reocurringGift" });
    register({ name: "reocurringGiftFrequency" });
    register({ name: "pledgePayment" });
    register({ name: "inHonorOf" });
    register({ name: "honorMemorySelector" });
    register({ name: "honoreeName" });
    register({ name: "giftNamePrefix" });
    register({ name: "giftFirstName" });
    register({ name: "giftLastName" });
    register({ name: "giftAddressOne" });
    register({ name: "giftAddressTwo" });
    register({ name: "giftCity" });
    register({ name: "giftState" });
    register({ name: "giftCountry" });
    register({ name: "giftZipCode" });
    register({ name: "giftEmail" });
  }, [register]);

  return (
    <form onSubmit={handleSubmit(dummySubmit)}>
      <div className="grid grid-cols-1 gap-1">
        <div>
          <h3 className="mb-3 text-xl">I would like to give:</h3>
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-2">
            {givingAmounts.map((amount, index) => {
              return (
                <DonationRadio
                  key={index}
                  name="giving-amount"
                  value={amount}
                  defaultChecked={amount === 50 ? true : false}
                  label={`$${amount}`}
                  trackedValue={givingAmount}
                  setter={setValue}
                />
              );
            })}
            <DonationRadio
              name="giving-amount"
              value="other"
              label="Other"
              trackedValue={givingAmount}
              setter={setValue}
            />
          </div>
          <AnimatePresence>
            {givingAmount === 'other' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TextInput
                  name="other-amount"
                  placeholder="Other Amount"
                  onChange={(e) => setValue('other-amount', e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Box sx={{ my: 2 }}>
          <Label>
            <Checkbox
              name="reocurringGift"
              checked={reocurringGift}
              onChange={() => {
                setValue('reocurringGift', !reocurringGift);
                setReocurringGift(!reocurringGift);
              }}
              sx={{
                color: '#fff',
                bg: '#fff',
                border: '#A0A3A6 solid 2px',
                borderRadius: 'none',
              }}
            />
            Make this a recurring gift
          </Label>
          <AnimatePresence>
            {reocurringGift && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Box sx={{ mt: 2 }}>
                  <SelectInput
                    name="reocurringGiftFrequency"
                    // label="Address Type"
                    value={reocurringGiftFrequency}
                    options={reocurringGiftFrequencyOptions}
                    onChange={(selectedOption) => {
                      setValue('reocurringGiftFrequency', selectedOption.value);
                      setReocurringGiftFrequency(selectedOption);
                    }}
                  />
                  <Text sx={{ fontStyle: 'italic', fontSize: 1, mt: 2 }}>
                    Please note: This will apply to all gifts in your Gift Basket. To make a separate one-time gift, or
                    one with a different recurring schedule, you will need to complete this gift first.
                  </Text>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <Label>
          <input
            type="checkbox"
            name="pledgePayment"
            checked={pledgePayment}
            onChange={() => {
              setValue('pledgePayment', !pledgePayment);
            }}
            className="bg-white text-white"
            style={{
              border: '#A0A3A6 solid 2px',
              borderRadius: 'none',
            }}
          />
          This is a pledge payment
        </Label>
        <div className="mt-2">
          <h3 className="mt-4 mb-2 text-xl">
            In Honor/Memory of:
          </h3>
          <label htmlFor="inHonorOf">Is this gift in honor of or in memory of someone?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
            <DonationRadio
              name="inHonorOf"
              label="No"
              value={0}
              defaultChecked={true}
              trackedValue={inHonorOf}
              setter={setValue}
            />
            <DonationRadio name="inHonorOf" label="Yes" value={1} trackedValue={inHonorOf} setter={setValue} />
          </div>
          <AnimatePresence>
            {inHonorOf == 1 && (
              <motion.div
                key={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <SelectInput
                  name="honorMemorySelector"
                  // label="Address Type"
                  value={honorMemorySelector}
                  options={honorMemorySelectorOptions}
                  onChange={(selectedOption) => {
                    setValue('honorMemorySelector', selectedOption.value);
                    setHonorMemorySelector(selectedOption);
                  }}
                />
                <Text sx={{ fontStyle: 'italic', fontSize: 1, my: 2 }}>
                  Only the honoree&apos;s name is required. All other fields below are optional, and allow us to notify
                  the honoree, next of kin or contact.
                </Text>
                {honorMemorySelector.value == 'memory' && (
                  <TextInput
                    name="honoreeName"
                    placeholder="Honoree's Name"
                    onChange={(e) => setValue('honoreeName', e.target.value)}
                  />
                )}
                <Heading as="h3" sx={{ mt: 3 }}>
                  {honorMemorySelector.value == 'honor' ? "Honoree's Information" : 'Next of Kin/Contact Information'}
                </Heading>
                <Grid gap={2} columns={1} sx={{ my: 2 }}>
                  <SelectInput
                    name="giftNamePrefix"
                    value={giftNamePrefix}
                    options={giftNamePrefixOptions}
                    onChange={(selectedOption) => {
                      setValue('giftNamePrefix', selectedOption.value);
                      setGiftNamePrefix(selectedOption);
                    }}
                  />
                  <Grid gap={2} columns={2}>
                    <TextInput
                      sx={{ mr: 2 }}
                      name="giftFirstName"
                      placeholder="First Name"
                      onChange={(e) => setValue('giftFirstName', e.target.value)}
                    />
                    <TextInput
                      name="giftLastName"
                      placeholder="Last Name"
                      onChange={(e) => setValue('giftLastName', e.target.value)}
                    />
                  </Grid>
                  <SelectInput
                    name="giftCountry"
                    // label="Country"
                    value={giftCountry}
                    options={countryOptionsList}
                    onChange={(selectedOption) => {
                      setValue('giftCountry', selectedOption.value);
                      setGiftCountry(selectedOption);
                    }}
                  />
                  <TextInput
                    name="giftAddresOne"
                    placeholder="Address 1"
                    onChange={(e) => setValue('giftAddresOne', e.target.value)}
                  />
                  <TextInput
                    name="giftAddresTwo"
                    placeholder="Address 2"
                    onChange={(e) => setValue('giftAddresTwo', e.target.value)}
                  />
                  <TextInput
                    name="giftCity"
                    placeholder="City"
                    onChange={(e) => setValue('giftCity', e.target.value)}
                  />
                  <Grid gap={2} columns={2}>
                    <SelectInput
                      name="giftState"
                      value={giftState}
                      options={giftStateOptions}
                      onChange={(selectedOption) => {
                        setValue('giftState', selectedOption.value);
                        setGiftState(selectedOption);
                      }}
                    />
                    <TextInput
                      name="giftZipCode"
                      placeholder="Zip Code"
                      onChange={(e) => setValue('giftZipCode', e.target.value)}
                    />
                  </Grid>
                  <TextInput
                    name="giftEmail"
                    placeholder="Email"
                    onChange={(e) => setValue('giftEmail', e.target.value)}
                  />
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4">
          <button
            className="bg-black text-white p-2"
            data-testid="add-to-basket-button"
            onClick={() => {
              submitHandler('add to basket');
            }}
          >
            Add to Basket
          </button>
          <button
            className="bg-black text-white p-2"
            data-testid="give-now-button"
            onClick={() => {
              submitHandler('give now');
            }}
          >
            Give Now
          </button>
        </div>
      </div>
    </form>
  );
}

DonationRadio.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  trackedValue: PropTypes.string,
  setter: PropTypes.func,
};

function DonationRadio({ name, label, value, trackedValue, setter }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <label
        className="inline-block text-center py-1 px-4 font-medium"
        style={{
          border:
            trackedValue == value ? "#231F20 solid 2px" : "#A0A3A6 solid 2px",
          color: trackedValue == value ? "#231F20" : "#A0A3A6",
          backgroundColor: trackedValue == value ? "#D4D5D5" : "white",
          ":hover": {
            border: "#231F20 solid 2px",
            color: "#231F20",
          },
        }}
      >
        <input
          type="radio"
          name={name}
          value={value}
          onChange={(e) => {
            setter(name, e.target.value);
          }}
          sx={{
            position: "absolute",
            clip: "rect(0,0,0,0)",
            pointerEvents: "none",
          }}
        />
        {label}
      </label>
    </motion.div>
  );
}
