describe("Fund Search Tests", () => {
  it("shows proper inputs on search form", () => {
    cy.visit("/fund-search");
  });

  it("Loads fund search page with correct results", () => {
    cy.visit("/fund-search");
    cy.contains("Resident Emergency Relief Fund");

    cy.get("li[data-testid]");
  });
});
