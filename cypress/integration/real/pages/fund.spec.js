describe("Fund Search Tests", () => {
  it("Shows proper inputs on search form and handles search input", () => {
    cy.visit("/fund/bridge-forward-scholarship");

    cy.get('[data-testid="fund-title"]').then((title) => {
      expect(title.text()).to.equal("Bridge Forward Scholarship Endowment");
    });

    cy.get('[data-testid="fund-description"]').should("be.visible");
    // @todo Maybe add a test to see that the content is more than a certain number of characters.
    // This fund should always have some marketing content rather than it being blank.
    cy.get('[data-testid="fund-marketing-content"]').should("be.visible");
    cy.get('[data-testid="fund-campus"]').should("be.visible");
    cy.get('[data-testid="fund-allocation-code"]').should("be.visible");
    cy.get('[data-testid="fund-interest"]').should("be.visible");
  });
});
