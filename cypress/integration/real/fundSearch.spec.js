describe("Fund Search Tests", () => {
  it("shows proper inputs on search form", () => {
    cy.visit("/fund-search");
  });

  it("Loads fund search page with correct results", () => {
    cy.visit("/fund-search");

    // I think this fund will always be on the default search results?
    cy.contains("Resident Emergency Relief Fund");

    // Make sure there is at least one result from each campus in the results.
    cy.contains("CU Anschutz");
    cy.contains("CU Boulder");
    cy.contains("CU Denver");
    cy.contains("UCCS");

    // Test for write-in fund link.
    cy.get('[data-testid="write-in-link"]').should(
      "have.attr",
      "href",
      "/fund/write-fund"
    );

    // Initial search elements are limited to 24 results.
    cy.get('[data-testid="search-result-count"]').contains("24");

    // First result should always be a featured fund and contain a title, campus, and interest.
    cy.get('[data-testid="search-result"]')
      .first()
      .within((firstResult) => {
        cy.get('[data-testid="featured-fund"]').should("exist");
        cy.get('[data-testid="result-title"]').should("exist");
        cy.get('[data-testid="result-campus"]').should("exist");
        cy.get('[data-testid="result-interest"]').should("exist");
      });

    // Load more and refine buttons exist.
    cy.get('[data-testid="load-more-button"]').should("exist");
    cy.get('[data-testid="refine-search-button"]').should("exist");
  });
});
