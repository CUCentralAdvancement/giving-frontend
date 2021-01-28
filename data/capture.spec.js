// const paths = require('../../../data/fund-paths.json');
// const baseURL = 'https://385-j-cu-giving.pantheonsite.io';

// describe("Capture fund API data", () => {
//   paths.forEach((slug) => {
//     it(`captures data for ${slug}`, () => {
//       cy.request({
//         url: `${baseURL}/api/fund/${slug}`,
//         followRedirect: false, // turn off following redirects
//       }).then((resp) => {
//         cy.writeFile(`./data/funds/${slug}.json`, resp.body);
//         console.log(`File written successfully for: ${slug}`);
//         cy.wait(500);
//       });
//     });
//   });
// });