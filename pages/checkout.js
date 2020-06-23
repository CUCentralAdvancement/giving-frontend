import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
// import fetch from "node-fetch";
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
  titleOptions,
  phoneTypeOptions,
} from "../data/donationForm";
import { userCart } from "../data/store";
import { useRecoilValue } from "recoil";

const CartSummary = dynamic(() => import("../components/cart/CartSummary"), {
  ssr: false,
});

export default function Checkout() {
  const cart = useRecoilValue(userCart);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [addressType, setAddressType] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [includeSpouse, setIncludeSpouse] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();
  const type = watch("individual-company");
  const giftsMatched = watch("matchingGifts");

  function submitHandler(data) {
    alert(JSON.stringify(data));
  }

  useEffect(() => {
    register({ name: "individual-company" });
    register({ name: "companyName" });
    register({ name: "title" });
    register({ name: "firstName" });
    register({ name: "lastName" });
    register({ name: "addressType" });
    register({ name: "phoneType" });
    register({ name: "preferredPhone" });
    register({ name: "email" });
    register({ name: "includeSpouse" });
    register({ name: "spouseName" });
    register({ name: "matchingGifts" });
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
                    options={titleOptions}
                    onChange={(selectedOption) => {
                      setValue("title", selectedOption.value);
                      setTitle(selectedOption);
                    }}
                  />
                </Box>
                <TextInput
                  // sx={{ width: ["100%", "30%"], mr: 5 }}
                  name="firstName"
                  label="First Name"
                  onChange={(e) => setValue("firstName", e.target.value)}
                />
                <TextInput
                  // sx={{ width: ["100%", "30%"], pl: 2 }}
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
                defaultValue={{ value: "home", label: "Home" }}
                onChange={(selectedOption) => {
                  setValue("addressType", selectedOption.value);
                  setAddressType(selectedOption);
                }}
              />
              <Heading sx={{ my: 2 }} as="h3">
                Address Input Placeholder
              </Heading>
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
                  // sx={{ flex: "1 1 auto" }}
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
              {/* <Divider /> */}
              <Checkbox
                name="includeSpouse"
                label="Include Spouse/Partner in your gift?"
                checked={includeSpouse}
                onChange={(e) => {
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
              <Box>
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
              <Textarea rows={3} sx={{ bg: "white" }} />
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
              <Box>
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
                onChange={(e) => {
                  setValue("updateProfile", !updateProfile);
                  setUpdateProfile(!updateProfile);
                }}
                sx={{ color: "#fff", bg: "#fff" }}
              />
              <Divider />
              <Flex sx={{ flexDirection: "row", alignItems: "center", mt: 2 }}>
                <Box sx={{ maxWidth: ["100%", "50%"], mr: 2 }}>
                  <Link href={`/checkout/payment`}>
                    <a>
                      <Button
                        variant="button.secondary"
                        type="submit"
                        // sx={{ maxWidth: ["100%", "50%"], mr: 2 }}
                      >
                        Continue to next step
                      </Button>
                    </a>
                  </Link>
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
