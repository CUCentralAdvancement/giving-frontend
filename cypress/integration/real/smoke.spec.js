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
});
