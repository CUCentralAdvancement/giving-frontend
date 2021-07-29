describe("Fund Info Tests", () => {
  it("Shows proper data for FundInfo component", () => {
    cy.visit("fund/bridge-forward-scholarship");

    cy.get('[data-testid="fund-title"]').then((title) => {
      expect(title.text()).to.equal("Bridge Forward Scholarship Endowment");
    });

    cy.get('[data-testid="fund-description"]').contains('To provide scholarship awards at the' +
      ' University of Colorado Colorado Springs for undergraduate students with an Expected' +
      ' Family Contribution up to 250% above Pell Grant eligibility or similar financial need program.');
    // @todo Test the expiration data for marketing content. Some funds might not have any content visible.
    // cy.get('[data-testid="fund-marketing-content"]').should("be.visible");
    cy.get('[data-testid="fund-campus"]').contains('UCCS');
    cy.get('[data-testid="fund-allocation-code"]').contains('0430106');
    cy.get('[data-testid="fund-interest"]').contains('Scholarships & Student Success');

    // Should not have license plate form field.
    cy.get('input[name="name-on-title"]').should('not.exist');

    // Should not have write-in form field.
    cy.get('textarea[data-testid="comments-textarea"]').should('not.exist');

    // @todo Add tests for when search works to verify the right terms are searched for.
  });

  // @todo Add these tests after figuring out international address form issue.
  xit("Handles input correctly for GivingForm component", () => {
    cy.visit("/fund/bridge-forward-scholarship");
  });

  it('should render license plate funds and form', function() {
    cy.visit("fund/cu-scholarship-license-plate-fund");
    cy.get('h1[data-testid="fund-title"]').contains('CU Scholarship License Plate Fund');
    cy.contains('Obtaining a CU license plate in the state of Colorado is a three step process.');

    // Fund should still have the same categories listed as default funds.
    cy.get('[data-testid="fund-campus"]').contains('CU Boulder');
    cy.get('[data-testid="fund-allocation-code"]').contains('0122509');
    cy.get('[data-testid="fund-interest"]').contains('Alumni Programs');

    // Only one field should be on the form.
    cy.get('input[name="name-on-title"]').should('be.visible');

    // No fields from other forms.
    cy.get('input[name="giving-amount"]').should('not.exist');
    cy.get('textarea[data-testid="comments-textarea"]').should('not.exist');
  });

  it('should render write-in fund and form', function() {
    cy.visit("fund/write-fund");
    cy.get('h1[data-testid="fund-title"]').contains('Write-in Fund');
    cy.contains('If you’d like, you can follow the steps below to write in the fund you intend your gift');

    // Write-in should not have the same categories listed as default funds.
    cy.get('[data-testid="fund-campus"]').should('not.exist');
    cy.get('[data-testid="fund-allocation-code"]').should('not.exist');
    cy.get('[data-testid="fund-interest"]').should('not.exist');

    cy.get('[data-testid="giving-amount-options"]').should('be.visible');
    // Extra comment section for write-in fund.
    cy.get('textarea[data-testid="comments-textarea"]').should('be.visible');

    // No license plate form field..
    cy.get('input[name="name-on-title"]').should('not.exist');
  });
});

describe("Giving Form Query Parameters Modifications", () => {
  it('show defaults without query parameters', function() {
    // @todo Make a `defaultFund` variable so tests can visit `defaultFund.url` instead of a string.
    // For instance, this fund does not have a suggested amount, but "/fund/bridge-forward-scholarship"
    // does have a suggested donation amount.
    cy.visit("fund/cancer-research-general-fund");
    cy.contains('Suggested Amount').should('not.be.visible');
  });

  it('show suggested amount with the fund\'s suggested_amount field', function() {
    cy.visit("/fund/bridge-forward-scholarship");
    cy.contains('Suggested Amount').should('be.visible');
    cy.get('[data-testid="giving-amount-100"]').should('exist');
    cy.get('[data-testid="suggested-amount"]').contains('$26');
  });

  it('show suggested amount with `amount` from  `defaultGivingOptions`', function() {
    cy.visit("/fund/bridge-forward-scholarship?amount=100");
    cy.contains('Suggested Amount').should('be.visible');
    cy.get('[data-testid="giving-amount-100"]').should('not.exist');
    cy.get('[data-testid="suggested-amount"]').contains('$100');
  });

  it('show suggested amount with `amount` from `other-amount`', function() {
    cy.visit("/fund/bridge-forward-scholarship?amount=25.50");
    cy.contains('Suggested Amount').should('be.visible');
    cy.get('[data-testid="giving-amount-100"]').should('exist');
    cy.get('[data-testid="suggested-amount"]').contains('$25.50');
  });

  it('show recurring schedule with annually', function() {
    cy.visit("/fund/cancer-research-general-fund?recurring=annually");
    cy.contains('Suggested Amount').should('not.be.visible');
    cy.get('[data-testid="recurring-gift-frequency"').should('have.value', 'annually');
  });

  it('show recurring schedule with quarterly', function() {
    cy.visit("/fund/cancer-research-general-fund?recurring=quarterly");
    cy.contains('Suggested Amount').should('not.be.visible');
    cy.get('[data-testid="recurring-gift-frequency"').should('have.value', 'quarterly');
  });

  it('show recurring schedule with monthly', function() {
    cy.visit("/fund/cancer-research-general-fund?recurring=monthly");
    cy.contains('Suggested Amount').should('not.be.visible');
    cy.get('[data-testid="recurring-gift-frequency"').should('have.value', 'monthly');
  });

  it('shows all the things!...in relation to query param modifications', function() {
    cy.visit("/fund/bridge-forward-scholarship?amount=25.50&recurring=monthly");
    cy.contains('Suggested Amount').should('be.visible');
    cy.get('[data-testid="giving-amount-100"]').should('exist');
    cy.get('[data-testid="suggested-amount"]').contains('$25.50');
    cy.get('[data-testid="recurring-gift-frequency"').should('have.value', 'monthly');
  });
});
