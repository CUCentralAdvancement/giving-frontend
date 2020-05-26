describe("Smoke Test Critical Paths", () => {
  it("navigates to the homepage/fund search", () => {
    cy.visit("http://localhost:3000/");
    cy.url().should("eq", "http://localhost:3000/fund-search");
  });
});
