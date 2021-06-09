describe("Smoke Test Critical Paths", () => {
  it("navigates to the homepage/fund search", () => {
    cy.request({
      url: "/",
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 302
      expect(resp.status).to.eq(302);
      expect(resp.redirectedToUrl).to.eq(
        `${Cypress.config("baseUrl")}/fund-search`
      );
    });
  });

  it("Loads fund search page with at least one result and navigated to fund", () => {
    cy.visit("/fund-search");

    // See if search loading is what causes some tests to fail.
    /* eslint-disable-next-line */
    cy.wait(3000);

    cy.contains("CU Anschutz Fund for Excellence");

    // @todo Add navigation to fund.
  });

  // it("Loads fund page", () => {
  //   // Need to get allocation route with replacement to fund name in path shown to users.
  //   cy.visit("/fund/0123456");
  //   cy.contains("Resident Emergency Relief Fund");
  // });
});
