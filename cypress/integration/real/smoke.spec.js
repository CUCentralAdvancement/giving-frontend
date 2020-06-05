describe("Smoke Test Critical Paths", () => {
  it("navigates to the homepage/fund search", () => {
    cy.request({
      url: "http://localhost:3000/",
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 302
      expect(resp.status).to.eq(302);
      expect(resp.redirectedToUrl).to.eq("http://localhost:3000/fund-search");
    });
  });

  it("Loads fund search page with at least one result and navigated to fund", () => {
    cy.visit("http://localhost:3000/fund-search");
    cy.contains("Resident Emergency Relief Fund");

    // @todo Add navigation to fund.
  });

  // it("Loads fund page", () => {
  //   // Need to get allocation route with replacement to fund name in path shown to users.
  //   cy.visit("http://localhost:3000/fund/0123456");
  //   cy.contains("Resident Emergency Relief Fund");
  // });
});
