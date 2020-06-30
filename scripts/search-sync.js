const algoliasearch = require("algoliasearch");
const fetch = require("node-fetch");
// const baseURL = "http://cu-giving.lndo.site";
const baseURL = "https://385-i-cu-giving.pantheonsite.io";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_KEY
);
const index = client.initIndex("Funds");

async function getData() {
  const res = await fetch(`${baseURL}/sites/default/files/all_fund_data.json`);
  const funds = await res.json();
  index.saveObjects(funds).then(({ objectIDs }) => {
    console.log(objectIDs);
  });
}

getData();
