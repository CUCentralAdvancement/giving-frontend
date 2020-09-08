import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/global/Layout";
import {
  Box,
  Grid,
  Flex,
  Text,
  Radio,
  SelectInput,
  Button,
  TextInput,
  Heading,
  Divider,
  Checkbox,
  Link as CULink,
} from "@cu-advancement/component-library";
import { Textarea } from "theme-ui";
import {
  addressTypeOptions,
  giftStateOptions,
  phoneTypeOptions,
  giftNamePrefixOptions,
  countryOptionsList,
} from "../data/donationForm";
import { userCart, authorizeNetToken, givingFormInfo } from "../data/store";
import { useRecoilValue, useSetRecoilState } from "recoil";

const CartSummary = dynamic(() => import("../components/cart/CartSummary"), {
  ssr: false,
});

export default function Checkout() {
  const cart = useRecoilValue(userCart);
  const setAuthorizeNetToken = useSetRecoilState(authorizeNetToken);
  const setGivingInfo = useSetRecoilState(givingFormInfo);
  const router = useRouter();
  const [title, setTitle] = useState({ value: "Mr.", label: "Mr." });
  const [addressType, setAddressType] = useState({
    value: "home",
    label: "Home",
  });
  const [addressCountry, setAddressCountry] = useState({
    value: "US",
    label: "United States",
  });
  const [addressState, setAddressState] = useState({
    value: "OH",
    label: "Ohio",
  });
  const [phoneType, setPhoneType] = useState({ value: "cell", label: "Cell" });
  const [includeSpouse, setIncludeSpouse] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();
  const type = watch("individual-company");
  const giftsMatched = watch("matchingGifts");

  function submitHandler(data) {
    // alert(JSON.stringify(data));
    let description = "";
    let orderTotal = 0.0;
    cart.forEach((item) => {
      description += item.fundTitle + " (" + item.allocationCode + ")";
      // @todo Add to parse for floats, since the format is in dollars AND cents.
      orderTotal =
        parseFloat(orderTotal) + parseFloat(`${item["giving-amount"]}.00`);
    });
    // console.log(orderTotal);
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

  useEffect(() => {
    register({ name: "individual-company" });
    register({ name: "companyName" });
    register({ name: "title" });
    register({ name: "firstName" });
    register({ name: "lastName" });

    register({ name: "addressType" });
    register({ name: "addressCountry" });
    register({ name: "addressLine1" });
    register({ name: "addressCity" });
    register({ name: "addressState" });
    register({ name: "addressZip" });

    register({ name: "phoneType" });
    register({ name: "preferredPhone" });
    register({ name: "email" });
    register({ name: "includeSpouse" });
    register({ name: "spouseName" });
    register({ name: "matchingGifts" });
    register({ name: "employerName" });
    register({ name: "giftComments" });
    register({ name: "taxReceipt" });
    register({ name: "updateProfile" });
  }, [register]);

  return (
    <Layout>
      <Flex sx={{ flexDirection: "column", maxWidth: 960, mx: "auto", p: 4 }}>
        <Heading pb="3">Gift Basket Summary</Heading>
        <Divider />
        <CartSummary cart={cart} removeCallback={null} />
        <Flex
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            fontWeight: 700,
            pt: 3,
          }}
        >
          <Button
            variant="button.secondary"
            sx={{ mr: 3 }}
            onClick={() => {
              router.push("/cart");
            }}
          >
            Edit Gift Basket
          </Button>
        </Flex>
      </Flex>
      <Box sx={{ bg: "#EBEDED" }}>
        <Box sx={{ maxWidth: 960, mx: "auto", p: 4 }}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid gap={2} sx={{ width: ["100%", "66%"] }}>
              <Box>
                <Heading pb="3">Contact Information</Heading>
                <Text>I am giving as an:</Text>
                <Text variant="italic" sx={{ fontSize: 1 }}>
                  To list a spouse or partner on this gift, please use the
                  comments box below.
                </Text>
              </Box>
              <Box>
                <Grid gap={2} columns={[2, "1fr 4fr"]} sx={{ mb: 2 }}>
                  <Radio
                    name="individual-company"
                    label="Individual"
                    value="individual"
                    defaultChecked={true}
                    onChange={(e) =>
                      setValue("individual-company", e.target.value)
                    }
                    sx={{ color: "#fff", bg: "#fff" }}
                  />
                  <Radio
                    name="individual-company"
                    label="Company/Organization"
                    value="company"
                    onChange={(e) =>
                      setValue("individual-company", e.target.value)
                    }
                    sx={{ color: "#fff", bg: "#fff" }}
                  />
                </Grid>
                {type === "company" && (
                  <TextInput
                    name="companyName"
                    placeholder="Name of Organization or Company"
                    onChange={(e) => setValue("companyName", e.target.value)}
                  />
                )}
              </Box>
              <Flex
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ minWidth: "33%" }}>
                  <SelectInput
                    name="title"
                    label="Title"
                    value={title}
                    options={giftNamePrefixOptions}
                    onChange={(selectedOption) => {
                      setValue("title", selectedOption.value);
                      setTitle(selectedOption);
                    }}
                  />
                </Box>
                <TextInput
                  name="firstName"
                  label="First Name"
                  onChange={(e) => setValue("firstName", e.target.value)}
                />
                <TextInput
                  name="lastName"
                  label="Last Name"
                  onChange={(e) => setValue("lastName", e.target.value)}
                />
              </Flex>
              <SelectInput
                name="addressType"
                label="Address Type"
                value={addressType}
                options={addressTypeOptions}
                onChange={(selectedOption) => {
                  setValue("addressType", selectedOption.value);
                  setAddressType(selectedOption);
                }}
              />
              <SelectInput
                name="addressCountry"
                label="Country"
                value={addressCountry}
                options={countryOptionsList}
                onChange={(selectedOption) => {
                  setValue("addressCountry", selectedOption.value);
                  setAddressCountry(selectedOption);
                }}
              />
              <TextInput
                name="addressLine1"
                label="Address / Thoroughfare"
                onChange={(e) => setValue("addressLine1", e.target.value)}
              />
              <Flex
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  name="addressCity"
                  label="City / Locality"
                  onChange={(e) => setValue("addressCity", e.target.value)}
                />
                <Box sx={{ minWidth: "33%" }}>
                  <SelectInput
                    name="addressState"
                    label="State / Administrative Area"
                    value={addressState}
                    options={giftStateOptions}
                    defaultValue={{ value: "none", label: "State" }}
                    onChange={(selectedOption) => {
                      setValue("addressState", selectedOption.value);
                      setAddressState(selectedOption);
                    }}
                  />
                </Box>
                <TextInput
                  name="addressZip"
                  label="Postal Code"
                  onChange={(e) => setValue("addressZip", e.target.value)}
                />
              </Flex>
              <Grid gap={2} columns={[2, "2fr 3fr"]} sx={{ mb: 2 }}>
                <SelectInput
                  name="phoneType"
                  label="Phone Type"
                  value={phoneType}
                  options={phoneTypeOptions}
                  onChange={(selectedOption) => {
                    setValue("phoneType", selectedOption.value);
                    setPhoneType(selectedOption);
                  }}
                />
                <TextInput
                  name="preferredPhone"
                  label="Preferred Phone"
                  placeholder="(e.g. 555-555-5555)"
                  onChange={(e) => setValue("preferredPhone", e.target.value)}
                />
              </Grid>
              <Box sx={{ mb: 3 }}>
                <TextInput
                  name="email"
                  label="Email"
                  onChange={(e) => setValue("email", e.target.value)}
                />
              </Box>
              <Checkbox
                name="includeSpouse"
                label="Include Spouse/Partner in your gift?"
                checked={includeSpouse}
                onChange={() => {
                  setValue("includeSpouse", !includeSpouse);
                  setIncludeSpouse(!includeSpouse);
                }}
                sx={{ color: "#fff", bg: "#fff" }}
              />
              {includeSpouse && (
                <TextInput
                  name="spouseName"
                  placeholder="Full name of spouse/partner"
                  onChange={(e) => setValue("spouseName", e.target.value)}
                />
              )}
              <Divider />
              <Box>
                <Text>Does your employer match charitable gifts?</Text>
                <Text variant="italic" sx={{ fontSize: 1 }}>
                  Not sure?{" "}
                  <CULink url="https://giving.cu.edu/take-advantage-matching-gift-program">
                    Click here to find out.
                  </CULink>
                </Text>
              </Box>
              <Box data-testid="matching-gifts-radios">
                <Grid gap={2} columns={[2, "1fr 4fr"]} sx={{ mb: 2 }}>
                  <Radio
                    name="matchingGifts"
                    label="No"
                    value="no"
                    defaultChecked={true}
                    onChange={(e) => setValue("matchingGifts", e.target.value)}
                    sx={{ color: "#fff", bg: "#fff" }}
                  />
                  <Radio
                    name="matchingGifts"
                    label="Yes"
                    value="yes"
                    onChange={(e) => setValue("matchingGifts", e.target.value)}
                    sx={{ color: "#fff", bg: "#fff" }}
                  />
                </Grid>
                {giftsMatched === "yes" && (
                  <TextInput
                    name="employerName"
                    placeholder="Name of your Employer"
                    onChange={(e) => setValue("employerName", e.target.value)}
                  />
                )}
              </Box>
              <Divider />
              <Heading pb="3">Comments</Heading>
              <Box>
                <Text variant="italic" sx={{ fontSize: 1 }}>
                  If you chose the Write-In option, please include any
                  information about the intended fund in the comments box below.
                </Text>
              </Box>
              <Textarea
                name="giftComments"
                data-testid="comments-textarea"
                onChange={(e) => setValue("giftComments", e.target.value)}
                rows={3}
                sx={{ bg: "white" }}
              />
              <Divider />
              <Heading pb="3">Tax Receipt</Heading>
              <Box>
                <Text>
                  How would you like to receive your gift tax receipt?
                </Text>
                <Text variant="italic" sx={{ fontSize: 1 }}>
                  This is separate from your gift confirmation and will be sent
                  to you within 2 business days.
                </Text>
              </Box>
              <Box data-testid="tax-receipt-radios">
                <Grid gap={2} columns={[2, "1fr 4fr"]} sx={{ mb: 2 }}>
                  <Radio
                    name="taxReceipt"
                    label="Email"
                    value="email"
                    defaultChecked={true}
                    onChange={(e) => setValue("taxReceipt", e.target.value)}
                    sx={{ color: "#fff", bg: "#fff" }}
                  />
                  <Radio
                    name="taxReceipt"
                    label="Mail"
                    value="mail"
                    onChange={(e) => setValue("taxReceipt", e.target.value)}
                    sx={{ color: "#fff", bg: "#fff" }}
                  />
                </Grid>
              </Box>
              <Checkbox
                name="updateProfile"
                label="Update my profile with this information"
                checked={updateProfile}
                onChange={() => {
                  setValue("updateProfile", !updateProfile);
                  setUpdateProfile(!updateProfile);
                }}
                sx={{ color: "#fff", bg: "#fff" }}
              />
              <Divider />
              <Flex sx={{ flexDirection: "row", alignItems: "center", mt: 2 }}>
                <Box sx={{ maxWidth: ["100%", "50%"], mr: 2 }}>
                  <Button
                    variant="button.secondary"
                    type="submit"
                    data-testid="continue-button"
                  >
                    Continue to next step
                  </Button>
                </Box>
                <Text sx={{ mr: 2 }}>or</Text>
                <Link href={`/checkout`}>
                  <a>Cancel</a>
                </Link>
              </Flex>
            </Grid>
          </form>
        </Box>
      </Box>
    </Layout>
  );
}
