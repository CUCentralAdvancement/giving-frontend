describe("Fund Search Tests", () => {
  it("Shows proper inputs on search form and handles search input", () => {
    cy.visit("/fund-search");
    cy.contains("24 Results");

    // cy.get('[data-testid="search-form"]').within(($form) => {
    // cy.root().submit();
    // });

    // Need to reset form so that default search values are all set.
    // @todo Load form with default search values.
    cy.get('[data-testid="search-reset"]').click();

    // Test search inpiut.
    // Bridge yields one result from UCCS.
    cy.get('[data-testid="search-input"]').type("Bridge");
    cy.get('[data-testid="search-button"]').click();
    cy.contains("1 Results");
    cy.contains("Bridge Forward Scholarship Endowment");
    cy.contains("UCCS");

    cy.get('[data-testid="search-reset"]').click();

    // Text campus selector.
    cy.get('[data-testid="search-form"]').contains("All Campuses").click();
    cy.contains("CU Anschutz").click();
    cy.get('[data-testid="search-button"]').click();
    cy.contains("10 Results");
    cy.get('[data-testid="search-result"]')
      .first()
      .within(() => {
        cy.get('[data-testid="featured-fund"]').should("be.visible");
        cy.get('[data-testid="result-campus"]').should("be.visible");
        cy.contains("CU Anschutz");
      });

    cy.get('[data-testid="search-reset"]').click();

    // Test Interests selector.
    cy.get('[data-testid="search-form"]').contains("All Interests").click();
    cy.contains("Science, Research & Innovation").click();
    cy.get('[data-testid="search-button"]').click();
    cy.contains("4 Results");
    cy.get('[data-testid="search-result"]')
      .first()
      .within(() => {
        cy.get('[data-testid="featured-fund"]').should("be.visible");
        cy.get('[data-testid="result-campus"]').should("be.visible");
        cy.contains("CU Anschutz");
      });
    cy.get('[data-testid="search-result"]').within(() => {
      cy.contains("CU Boulder");
    });

    cy.get('[data-testid="search-reset"]').click();

    // Test fund type.
    cy.get('[data-testid="search-form"]').contains("Fund Type").click();
    cy.contains("Academic Program Funds").click();
    cy.get('[data-testid="search-button"]').click();
    cy.contains("6 Results");
    cy.get('[data-testid="search-result"]').within(() => {
      cy.contains("CU Boulder");
      cy.contains("CU Denver");
      cy.contains("UCCS");
      cy.contains("CU Anschutz").should("not.exist");
    });

    cy.get('[data-testid="search-reset"]').click();
    cy.contains("24 Results");
  });

  it("Loads fund search page with correct results", () => {
    cy.visit("/fund-search");

    // I think this fund will always be on the default search results?
    cy.contains("Resident Emergency Relief Fund");

    // Make sure there is at least one result from each campus in the results.
    cy.contains("CU Anschutz"); // maybe add a .get() for targeting where the text should be...if .get()
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
      .within(() => {
        cy.get('[data-testid="featured-fund"]').should("exist"); // change this to .should('be.visible');
        cy.get('[data-testid="result-title"]').should("exist");
        cy.get('[data-testid="result-campus"]').should("exist");
        cy.get('[data-testid="result-interest"]').should("exist");
      });

    // Load more and refine buttons exist.
    cy.get('[data-testid="load-more-button"]').should("exist");
    cy.get('[data-testid="refine-search-button"]').should("exist");
  });
});
