describe("Header Component Test", () => {
  it("shows logo, menu, gift basket, and give now button are visible", () => {
    cy.visit("/fund-search");

    cy.get("#header").within(() => {
      cy.get("#logo").should("be.visible");

      cy.contains("a", "Guide to Giving").should(
        "have.attr",
        "href",
        "https://giving.cu.edu/guide-giving"
      );
      cy.contains("a", "Essential CU").should(
        "have.attr",
        "href",
        "https://giving.cu.edu/essentialcu"
      );
      cy.contains("a", "About Us").should(
        "have.attr",
        "href",
        "https://giving.cu.edu/about-us"
      );

      cy.get(".cart-items-total")
        .should("be.visible")
        .and("have.attr", "href", "/cart");

      cy.contains("Give Now")
        .should("be.visible")
        .and("have.attr", "href", "/fund-search");

      // Leaving search out for now.
      cy.get("#block-search-form").should("not.be.visible");
    });
  });
});
