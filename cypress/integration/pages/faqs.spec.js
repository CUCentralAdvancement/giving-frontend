describe('FAQs listing page tests', function() {

  it('should navigate to FAQ content on the listing page', function() {
    cy.visit('/faqs');
    cy.get('h1').contains('Frequently Asked Questions');

    // Click and scroll to content lower on the page.
    cy.contains('“Gifts-in-kind” encompass donations of goods, rather than cash.').should('not.be.inViewport');
    cy.get('a[href="#what-are-gifts-kind"]').click();
    cy.contains('“Gifts-in-kind” encompass donations of goods, rather than cash.').should('be.inViewport');
  });

});

describe('FAQs show page tests', function() {
  it('should render an FAQ page', function() {
    cy.visit('/faqs/what-are-gifts-kind');
    cy.get('h1').contains('What are Gifts-in-Kind?');
    cy.contains('“Gifts-in-kind” encompass donations of goods, rather than cash.');
  });

  it('should go back to the All FAQs page', function() {
    cy.visit('/faqs/what-are-gifts-kind');
    cy.get('[data-testid="back-to-all-faqs-link"]').click();

    cy.url().should('equal', 'http://localhost:3000/faqs')
    cy.get('h1').contains('Frequently Asked Questions');
  });
});
