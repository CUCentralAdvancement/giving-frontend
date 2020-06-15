describe("Footer Component Test", () => {
  it("shows menus and contact info exist and are visible", () => {
    cy.visit("/fund-search");

    cy.get("footer").within(() => {
      cy.contains("About Us");
      cy.contains("Quicklinks");
      cy.contains("Campus Offices");
      cy.contains("giving@cu.edu");
      cy.contains("303-541-1290");

      cy.contains("a", "Privacy Policy")
        .should("be.visible")
        .and("have.attr", "href", "https://www.cu.edu/privacy-policy");

      cy.contains("a", "Terms of Service")
        .should("be.visible")
        .and("have.attr", "href", "https://www.cu.edu/terms-service");

      // About Us links.
      cy.contains("a", "Central CU Advancement")
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "https://giving.cu.edu/about-us/central-cu-advancement"
        );
      cy.contains("a", "CU Foundation")
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "https://giving.cu.edu/about-us/university-colorado-foundation"
        );
      cy.contains("a", "CU Foundation Reports & Financials")
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "https://giving.cu.edu/about-us/cu-foundation/cu-foundation-financial-and-investment-documents"
        );

      // Quicklinks links.
      cy.contains("a", "Guide to Giving")
        .should("be.visible")
        .and("have.attr", "href", "https://giving.cu.edu/guide-giving");
      cy.contains("a", "FAQs")
        .should("be.visible")
        .and("have.attr", "href", "https://giving.cu.edu/faq");
      cy.contains("a", "Careers")
        .should("be.visible")
        .and("have.attr", "href", "https://giving.cu.edu/about-us/careers");
      cy.contains("a", "Beta Access")
        .should("be.visible")
        .and("have.attr", "href", "https://giving.cu.edu/user");

      // Campuses.
      cy.contains("a", "Anschutz")
        .should("be.visible")
        .and("have.attr", "href", "http://supportcuanschutz.ucdenver.edu/");
      cy.contains("a", "Boulder")
        .should("be.visible")
        .and("have.attr", "href", "http://www.colorado.edu/advancement/");
      cy.contains("a", "Colorado Springs")
        .should("be.visible")
        .and("have.attr", "href", "http://www.uccs.edu/~advancement/");
      cy.contains("a", "Denver")
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "http://www.ucdenver.edu/about/WhoWeAre/Chancellor/ViceChancellors/Advancement-CUDenver/Pages/default.aspx"
        );
    });
  });

  it("shows menus, give button, and contact info exist and are visible", () => {
    cy.visit("/fund-search");
    cy.get("footer").within(() => {
      cy.contains("Give Now").click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/fund-search");
      });
    });
  });
});
