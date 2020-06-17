import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Heading,
  Text,
  Grid,
  Radio,
  TextInput,
  SelectInput,
  Button,
} from "@cu-advancement/component-library";
import { Checkbox, Label } from "theme-ui";
// import { store } from "../../data/store";
import { campusNames, interestsOptions } from "../../data/fundMeta";

export default function GivingForm({ fund }) {
  // const { state, dispatch } = useContext(store);
  const router = useRouter();
  // console.log(router);
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      "giving-amount": 50,
      inHonorOf: 0,
    },
  });
  const amount = watch("giving-amount");
  const inHonorOf = watch("inHonorOf");
  const pledgePayment = watch("pledgePayment");
  const givingAmounts = [50, 100, 250, 500];
  const [reocurringGift, setReocurringGift] = useState(false);
  const [reocurringGiftFrequency, setReocurringGiftFrequency] = useState({
    value: "_none",
    label: "How Often?",
  });

  function submitHandler(action) {
    let data = getValues();
    data.allocationCode = fund.allocationCode;
    data.fundRoute = router.asPath;
    data.fundTitle = fund.title;
    data.fundCampus = campusNames[fund.campus];
    // dispatch({ type: "add to cart", data });

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
  }, [register]);

  return (
    <form onSubmit={handleSubmit(dummySubmit)}>
      <Grid gap={1}>
        <Box>
          <Heading as="h3" mb={2}>
            I would like to give:
          </Heading>
          <Grid gap={0} columns={[1, 2, 4]}>
            {givingAmounts.map((amount, index) => {
              return (
                <Radio
                  key={index}
                  name="giving-amount"
                  label={`$${amount}`}
                  value={amount}
                  defaultChecked={amount === 50 ? true : false}
                  onChange={(e) => setValue("giving-amount", e.target.value)}
                  sx={{ color: "#fff", bg: "#fff" }}
                />
              );
            })}
          </Grid>
          <Radio
            name="giving-amount"
            label="Other"
            value="other"
            onChange={(e) => setValue("giving-amount", e.target.value)}
            sx={{ color: "#fff", bg: "#fff" }}
          />
          {amount === "other" && (
            <TextInput
              name="other-amount"
              onChange={(e) => setValue("other-amount", e.target.value)}
            />
          )}
        </Box>
        <Box>
          <Label>
            <Checkbox
              name="reocurringGift"
              checked={reocurringGift}
              onChange={(e) => {
                setValue("reocurringGift", !reocurringGift);
                setReocurringGift(!reocurringGift);
              }}
              sx={{ color: "#fff", bg: "#fff" }}
            />
            Make this a recurring gift
          </Label>
          {reocurringGift && (
            <>
              <SelectInput
                name="reocurringGiftFrequency"
                // label="Address Type"
                value={reocurringGiftFrequency}
                options={[
                  { value: "_none", label: "How Often?" },
                  { value: "monthly", label: "Monthly" },
                  { value: "quarterly", label: "Quarterly (every 3 months)" },
                  { value: "annually", label: "Annually" },
                ]}
                onChange={(selectedOption) => {
                  setValue("reocurringGiftFrequency", selectedOption.value);
                  setReocurringGiftFrequency(selectedOption);
                }}
              />
              <Text sx={{ fontStyle: "italic", fontSize: 1 }}>
                Please note: This will apply to all gifts in your Gift Basket.
                To make a separate one-time gift, or one with a different
                recurring schedule, you will need to complete this gift first.
              </Text>
            </>
          )}
        </Box>
        <Label>
          <Checkbox
            name="pledgePayment"
            checked={pledgePayment}
            onChange={(e) => {
              setValue("pledgePayment", !pledgePayment);
            }}
            sx={{ color: "#fff", bg: "#fff" }}
          />
          This is a pledge payment
        </Label>
        <Box sx={{ mt: 2 }}>
          <Heading as="h3" mb={2}>
            In Honor/Memory of:
          </Heading>
          <Label htmlFor="inHonorOf">
            Is this gift in honor of or in memory of someone?
          </Label>
          <Grid columns={2}>
            <Radio
              name="inHonorOf"
              label="No"
              value="0"
              defaultChecked={true}
              onChange={(e) => setValue("inHonorOf", e.target.value)}
              sx={{ color: "#fff", bg: "#fff" }}
            />
            <Radio
              name="inHonorOf"
              label="Yes"
              value="1"
              onChange={(e) => setValue("inHonorOf", e.target.value)}
              sx={{ color: "#fff", bg: "#fff" }}
            />
          </Grid>
          <AnimatePresence>
            {inHonorOf === 1 && (
              <motion.div
                key={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <TextInput
                  name="other-amount"
                  onChange={(e) => setValue("other-amount", e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <Grid columns={[1, 2]} sx={{ mt: 2 }}>
          <Button
            variant="button.secondary"
            onClick={() => {
              submitHandler("add to basket");
            }}
          >
            Add to Basket
          </Button>
          <Button
            variant="button.secondary"
            onClick={() => {
              submitHandler("give now");
            }}
          >
            Give Now
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
