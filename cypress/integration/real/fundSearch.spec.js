describe("Fund Search Tests", () => {
  it("shows proper inputs on search form", () => {
    cy.visit("/fund-search");
  });

  it("Loads fund search page with correct results", () => {
    cy.visit("/fund-search");
    cy.contains("Resident Emergency Relief Fund");

    // Initial search elements are limited to 24 results.
    cy.get('[data-testid="search-result-count"]').contains("24");

    // First result should always be a featured fund.
    cy.get('[data-testid="search-result"]').first().contains("Featured Fund");

    // Load more and refine buttons exist.
    cy.get('[data-testid="load-more-button"]').should("exist");
    cy.get('[data-testid="refine-search-button"]').should("exist");
  });
});
