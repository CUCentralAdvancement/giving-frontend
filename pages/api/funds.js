// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const result = await fetch(
    // `http://cu-giving.lndo.site/api/funds/all`
    `https://385-i-cu-giving.pantheonsite.io/sites/default/files/small_fund_data.json`
  );
  const data = await result.json();

  const realSearchData = [];
  Object.keys(data).forEach((key) => {
    realSearchData.push(data[key]);
  });

  res.statusCode = 200;
  res.json({ realSearchData });
};
