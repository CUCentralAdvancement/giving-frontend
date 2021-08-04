export const baseURL = 'https://the-cms-staging.herokuapp.com';
// export const baseURL = 'http://the-cms.lndo.site';

export const transaction = {
  accountType: 'Visa',
  accountNumber: 'XXXX1111',
  transId: '40051529534',
  responseCode: '1',
  authorization: '4AIDCZ',
  billTo: {
    phoneNumber: '5555555555',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Rich St.',
    city: 'Boulder',
    state: 'CO',
    zip: '80301',
    country: 'US',
    orderDescription: 'Bridge Forward Scholarship Endowment (0430106)',
    totalAmount: '50.00',
    orderInvoiceNumber: 'c2028d50',
    dateTime: '7/6/2020 3:27:59 PM',
  },
};

export const givingFormInfo = {
    'individual-company': 'company',
    companyName: 'Acme Corp',
    title: 'Mr.',
    firstName: 'John',
    lastName: 'Doe',
    addressType: 'home',
    addressCountry: 'AF',
    addressLine1: '123 Rich St.',
    addressCity: 'Boulder',
    addressState: 'AZ',
    addressZip: '80301',
    phoneType: 'cell',
    preferredPhone: '5555555555',
    email: 'no@no.com',
    includeSpouse: true,
    spouseName: 'Jane Doe',
    matchingGifts: 'yes',
    employerName: 'Acme Corp',
    giftComments: 'Fooled ya, ya dumbos!',
    taxReceipt: 'mail',
    updateProfile: true,
    description:
      'CU Anschutz Fund for Excellence (0221052)CU Denver Scholarship Fund (0321201)',
    amount: 170,
    invoiceNumber: '4e892bc0',
};
