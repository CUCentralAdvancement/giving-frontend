import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

// export const baseURL = "http://cu-giving.lndo.site";
export const baseURL = "https://385-i-cu-giving.pantheonsite.io";

const userCartInitialState =
  typeof window !== "undefined" &&
  JSON.parse(window.localStorage.getItem("userCart"))
    ? JSON.parse(window.localStorage.getItem("userCart"))
    : [];

const giftSummaryInitialState =
  typeof window !== "undefined" &&
  JSON.parse(window.localStorage.getItem("userCart"))
    ? JSON.parse(window.localStorage.getItem("userCart"))
    : [];

const userInitialState =
  typeof window !== "undefined" &&
  JSON.parse(window.localStorage.getItem("user"))
    ? JSON.parse(window.localStorage.getItem("user"))
    : { id: uuidv4() };

export const userCart = atom({
  key: "userCart",
  default: userCartInitialState,
});

// Needed for the gift summary on /checkout/complete since I didn't know how to
// empty the cart but still have data for filling out the completion message.
export const giftSummaryLog = atom({
  key: "giftSummary",
  default: giftSummaryInitialState,
});

export const user = atom({
  key: "user",
  default: userInitialState,
});

export const authorizeNetToken = atom({
  key: "authorizeNetToken",
  default: "",
});

// const exampleResponse = {
//   accountType: "Visa",
//   accountNumber: "XXXX1111",
//   transId: "40051529534",
//   responseCode: "1",
//   authorization: "4AIDCZ",
//   billTo: {
//     phoneNumber: "5555555555",
//     firstName: "John",
//     lastName: "Doe",
//     address: "123 Rich St.",
//     city: "Boulder",
//     state: "CO",
//     zip: "80301",
//     country: "US",
//   },
//   orderDescription:
//     "Bridge Forward Scholarship Endowment (0430106)",
//   totalAmount: "50.00",
//   orderInvoiceNumber: "c2028d50",
//   dateTime: "7/6/2020 3:27:59 PM",
// };
export const transactionDetails = atom({
  key: "transactionDetails",
  default: {
    accountType: "Visa",
    accountNumber: "XXXX1111",
    transId: "40051529534",
    responseCode: "1",
    authorization: "4AIDCZ",
    billTo: {
      phoneNumber: "5555555555",
      firstName: "John",
      lastName: "Doe",
      address: "123 Rich St.",
      city: "Boulder",
      state: "CO",
      zip: "80301",
      country: "US",
    },
    orderDescription: "Bridge Forward Scholarship Endowment (0430106)",
    totalAmount: "50.00",
    orderInvoiceNumber: "c2028d50",
    dateTime: "7/6/2020 3:27:59 PM",
  },
});

// const exampleInfo = {
//   "individual-company": "company",
//   companyName: "Acme Corp",
//   title: "Mr.",
//   firstName: "John",
//   lastName: "Doe",
//   addressType: "home",
//   addressCountry: "AF",
//   addressLine1: "123 Rich St.",
//   addressCity: "Boulder",
//   addressState: "AZ",
//   addressZip: "80301",
//   phoneType: "cell",
//   preferredPhone: "5555555555",
//   email: "no@no.com",
//   includeSpouse: true,
//   spouseName: "Jane Doe",
//   matchingGifts: "yes",
//   employerName: "Acme Corp",
//   taxReceipt: "mail",
//   updateProfile: true,
//   description:
//     "CU Anschutz Fund for Excellence (0221052)CU Denver Scholarship Fund (0321201)",
//   amount: 170,
//   invoiceNumber: "4e892bc0",
// };
export const givingFormInfo = atom({
  key: "givingFormInfo ",
  default: {
    "individual-company": "company",
    companyName: "Acme Corp",
    title: "Mr.",
    firstName: "John",
    lastName: "Doe",
    addressType: "home",
    addressCountry: "AF",
    addressLine1: "123 Rich St.",
    addressCity: "Boulder",
    addressState: "AZ",
    addressZip: "80301",
    phoneType: "cell",
    preferredPhone: "5555555555",
    email: "no@no.com",
    includeSpouse: true,
    spouseName: "Jane Doe",
    matchingGifts: "yes",
    employerName: "Acme Corp",
    giftComments: "Fooled ya, ya dumbos!",
    taxReceipt: "mail",
    updateProfile: true,
    description:
      "CU Anschutz Fund for Excellence (0221052)CU Denver Scholarship Fund (0321201)",
    amount: 170,
    invoiceNumber: "4e892bc0",
  },
});
