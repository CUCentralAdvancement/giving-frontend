describe("Fund Search Tests", () => {
  it("Shows proper inputs on search form and handles search input", () => {
    cy.visit("/fund-search");

    // Results should be more than nothing but less than 2000.
    cy.get('[data-testid="search-result-count"]').then((result) => {
      expect(parseInt(result.text())).to.be.greaterThan(20);
      expect(parseInt(result.text())).to.be.lessThan(2000);
    });

    // Test search input.
    // Bridge yields one result from UCCS.
    cy.get('[data-testid="search-input"]').type("Bridge");
    // Wait a little bit for Algolia.
    /* eslint-disable-next-line */
    cy.wait(1000);

    cy.get('[data-testid="search-result-count"]').then((result) => {
      expect(parseInt(result.text())).to.be.greaterThan(0);
      expect(parseInt(result.text())).to.be.lessThan(20);
    });
    cy.contains("Bridge Forward Scholarship Endowment");
    cy.contains("UCCS");
    // cy.contains("CU Boulder");

    cy.get('[data-testid="search-reset"]').click();
    cy.get('[data-testid="search-input"]').clear();

    // Text campus selector.
    cy.get('[data-testid="campus-select-list"]')
      .find("select")
      .select("Anschutz");

    /* eslint-disable-next-line */
    cy.wait(500);
    // cy.contains("CU Anschutz").click();
    // cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="search-result-count"]').then((result) => {
      expect(parseInt(result.text())).to.be.greaterThan(10);
      expect(parseInt(result.text())).to.be.lessThan(1000);
    });
    cy.get('[data-testid="search-result"]')
      .first()
      .within(() => {
        cy.get('[data-testid="featured-fund"]').should("be.visible");
        cy.get('[data-testid="result-campus"]').should("be.visible");
        cy.contains("Anschutz");
      });

    cy.get('[data-testid="search-reset"]').click();

    // Test Interests selector.
    // cy.get('[data-testid="search-form"]').contains("All Interests").click();
    // cy.contains("Science, Research & Innovation").click();
    // cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="interests-select-list"]')
      .find("select")
      .select("Science, Research & Innovation");

    /* eslint-disable-next-line */
    cy.wait(500);

    cy.get('[data-testid="search-result-count"]').then((result) => {
      expect(parseInt(result.text())).to.be.greaterThan(15);
      expect(parseInt(result.text())).to.be.lessThan(1000);
    });
    cy.get('[data-testid="search-result"]')
      .first()
      .within(() => {
        cy.get('[data-testid="featured-fund"]').should("be.visible");
        cy.get('[data-testid="result-campus"]').should("be.visible");
        cy.contains("Anschutz");
      });
    cy.get('[data-testid="search-result"]').within(() => {
      cy.contains("Boulder").should("be.visible");
    });

    cy.get('[data-testid="search-reset"]').click();

    // Test fund type.
    // cy.get('[data-testid="search-form"]').contains("Fund Type").click();
    // cy.contains("Academic Program Funds").click();
    // cy.get('[data-testid="search-button"]').click();
    // cy.get('[data-testid="fund-type-select-list"]')
    //   .find("select")
    //   .select("Academic Program Funds");
    // /* eslint-disable-next-line */
    // cy.wait(500);
    // cy.get('[data-testid="search-result-count"]').then((result) => {
    //   expect(parseInt(result.text())).to.be.greaterThan(100);
    //   expect(parseInt(result.text())).to.be.lessThan(1000);
    // });
    // cy.get('[data-testid="search-result"]').within(() => {
    //   cy.contains("CU Boulder");
    //   cy.contains("CU Denver");
    //   cy.contains("UCCS");
    //   cy.contains("CU Anschutz");
    // });
    // cy.get('[data-testid="search-reset"]').click();

    cy.get('[data-testid="search-result-count"]').then((result) => {
      expect(parseInt(result.text())).to.be.greaterThan(20);
      expect(parseInt(result.text())).to.be.lessThan(2000);
    });
  });

  it("Loads fund search page with correct results", () => {
    cy.visit("/fund-search");

    // I think this fund will always be on the default search results?
    cy.contains("Bridge Forward Scholarship Endowment");

    // Make sure there is at least one result from each campus in the results.
    cy.contains("Anschutz"); // maybe add a .get() for targeting where the text should be...if .get()
    cy.contains("Boulder");
    cy.contains("Denver");
    cy.contains("UCCS");

    // Test for write-in fund link.
    cy.get('[data-testid="write-in-link"]').should(
      "have.attr",
      "href",
      "/fund/write-fund"
    );

    // Results should be more than 20 but less than 2000.
    cy.get('[data-testid="search-result-count"]').then((result) => {
      expect(parseInt(result.text())).to.be.greaterThan(20);
      expect(parseInt(result.text())).to.be.lessThan(2000);
    });

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

  it("Can open and close a fund card", () => {
    cy.visit("/fund-search");

    // Find first result and take note of title of fund, campus, description.
    cy.get('[data-testid="search-result"]')
      .first()
      .then((result) => {
        const title = result.find('[data-testid="result-title"]').text();
        const campus = result.find('[data-testid="result-campus"]').text();

        cy.get('[data-testid="fund-card-container"]').should("not.exist");
        cy.get('[data-testid="fund-card-campus"]').should("not.exist");
        cy.get('[data-testid="fund-card-title"]').should("not.exist");
        cy.get('[data-testid="fund-card-description"]').should("not.exist");

        cy.get('[data-testid="search-result"]').first().click();

        cy.get('[data-testid="fund-card-container"]').within(() => {
          cy.contains(title);
          cy.get('[data-testid="fund-card-campus"]').should(
            "have.attr",
            "alt",
            `${campus} Logo`
          );
          cy.get('[data-testid="fund-card-description"]').should("be.visible");

          cy.get('[data-testid="fund-card-close"]').first().click();
        });

        cy.get('[data-testid="fund-card-container"]').should("not.exist");
        cy.get('[data-testid="fund-card-campus"]').should("not.exist");
        cy.get('[data-testid="fund-card-title"]').should("not.exist");
        cy.get('[data-testid="fund-card-description"]').should("not.exist");
      });

    // Repeat this with second card.
    cy.get('[data-testid="search-result"]')
      .first()
      .next()
      .then((result) => {
        const title = result.find('[data-testid="result-title"]').text();
        const campus = result.find('[data-testid="result-campus"]').text();

        cy.get('[data-testid="fund-card-container"]').should("not.exist");
        cy.get('[data-testid="fund-card-campus"]').should("not.exist");
        cy.get('[data-testid="fund-card-title"]').should("not.exist");
        cy.get('[data-testid="fund-card-description"]').should("not.exist");

        cy.get('[data-testid="search-result"]').first().next().click();

        cy.get('[data-testid="fund-card-container"]').within(() => {
          cy.contains(title);
          cy.get('[data-testid="fund-card-campus"]').should(
            "have.attr",
            "alt",
            `${campus} Logo`
          );
          cy.get('[data-testid="fund-card-description"]').should("be.visible");

          cy.get('[data-testid="fund-card-close"]').first().click();
        });

        cy.get('[data-testid="fund-card-container"]').should("not.exist");
        cy.get('[data-testid="fund-card-campus"]').should("not.exist");
        cy.get('[data-testid="fund-card-title"]').should("not.exist");
        cy.get('[data-testid="fund-card-description"]').should("not.exist");
      });
  });

  // @todo add click to see that user goes to proper fund page.
  it("Navigates to a fund detail page from a FundCard", () => {
    cy.visit("/fund-search");

    cy.get('[data-testid="search-result"]')
      .first()
      .then((result) => {
        const title = result.find('[data-testid="result-title"]').text();
        const campus = result.find('[data-testid="result-campus"]').text();

        cy.get('[data-testid="search-result"]').first().click();

        cy.get('[data-testid="fund-card-container"]').within(() => {
          cy.get('[data-testid="fund-card-description"]').should("be.visible");
          cy.contains("Make a Gift").click();
        });

        cy.contains(title);
        cy.contains(campus);
      });
  });

  // @todo Add test about scroll to the top refinement.
  it("Loads more and returns to top of page for refine search", () => {
    cy.visit("/fund-search");
    cy.get('[data-testid="search-result"]').then((results) => {
      expect(results.length).to.equal(20);
    });
    cy.get('[data-testid="load-more-button"]').click();

    /* eslint-disable-next-line */
    cy.wait(500);

    cy.get('[data-testid="search-result"]').then((results) => {
      expect(results.length).to.equal(40);
    });
  });

  it('should load default refinements from query parameters', function() {

  });
});
