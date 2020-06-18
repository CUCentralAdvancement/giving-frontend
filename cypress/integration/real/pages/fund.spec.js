describe("Fund Detail Page Tests", () => {
  it("Shows proper data for FundInfo component", () => {
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

    // @todo Add tests for when search works to verify the right terms are searched for.
  });

  // @todo Add these tests after figuring out international address form issue.
  xit("Handles input correctly for GivingForm component", () => {
    cy.visit("/fund/bridge-forward-scholarship");
  });
});
