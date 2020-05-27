// import Head from "next/head";
import { apiBaseURL } from "../data/app";

export default function FundSearch({ searchData }) {
  return (
    <div className="container">
      <h1>Foop!</h1>
      <ul>
        {searchData.map((result) => {
          return <li key={result.title}>{result.title}</li>;
        })}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    // `http://cu-giving.lndo.site/sites/default/files/small_fund_data.json`
    `https://385-i-cu-giving.pantheonsite.io/sites/default/files/small_fund_data.json`
  );
  const searchData = await res.json();

  const realSearchData = [];
  Object.keys(searchData).forEach((key, index) => {
    if (searchData[key].featured == true) {
      realSearchData.unshift(searchData[key]);
    } else {
      if (index < 40) {
        realSearchData.push(searchData[key]);
      }
    }
  });

  // Pass data to the page via props
  return { props: { searchData: realSearchData } };
}
