describe('Cart Tests', () => {
  beforeEach(() => {
    // Cart defaults are loaded from localStorage.
    cy.clearLocalStorage('user');
  });

  it('Handles empty cart', () => {
    cy.visit('/cart');
    cy.contains('Your gift basket is empty.');

    cy.contains('Gift Basket Summary').should('not.exist');
    cy.get('[data-testid="remove-from-cart-button"]').should('not.exist');
    cy.get('[data-testid="add-another-gift-button"]').should('not.exist');
    cy.get('[data-testid="checkout-button"]').should('not.exist');
    cy.get('[data-testid="order-total"]').should('not.exist');
  });

  it('Handles cart with adding/removing items', () => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        giftBasket: [
          {
            allocation_code: '0321793',
            fund_campus: 'CU Denver',
            fund_route: '/fund/office-student-life-food-pantry-fund',
            fund_title: 'Office of Student Life Food Pantry Fund',
            'giving-amount': 50,
            inHonorOf: 0,
          },
          {
            allocation_code: '0430106',
            fund_campus: 'UCCS',
            fund_route: '/fund/bridge-forward-scholarship',
            fund_title: 'Bridge Forward Scholarship Endowment',
            'giving-amount': '250',
            inHonorOf: 0,
          },
        ],
      }),
    );

    cy.visit('/cart');
    cy.contains('Your gift basket is empty.').should('not.exist');

    cy.contains('Gift Basket Summary').should('be.visible');
    cy.get('[data-testid="add-another-gift-button"]').should('be.visible');
    cy.get('[data-testid="checkout-button"]').should('be.visible');

    cy.contains('Office of Student Life Food Pantry Fund').should('be.visible');
    cy.contains('CU Denver').should('be.visible');
    cy.contains('Bridge Forward Scholarship Endowment').should('be.visible');
    cy.contains('UCCS').should('be.visible');

    // cy.get('[data-testid="order-total"]')
    //   .should("be.visible")
    //   .then((total) => {
    //     expect(total.text()).to.equal("$300");
    //   });

    cy.get('[data-testid="remove-from-cart-button"]')
      .should('be.visible')
      .first()
      .click();

    cy.contains('Office of Student Life Food Pantry Fund').should('not.exist');
    cy.contains('CU Denver').should('not.exist');
    cy.get('[data-testid="order-total"]')
      .should('be.visible')
      .then((total) => {
        expect(total.text()).to.equal('$250');
      });

    // User goes to correct fund page from link.
    cy.contains('Bridge Forward Scholarship Endowment').click();
    cy.url().should('include', '/fund/bridge-forward-scholarship');

    cy.visit('/fund-search');

    // See if search loading is what causes some tests to fail.
    /* eslint-disable-next-line */
    cy.wait(3000);

    cy.get('[data-testid="search-result"]')
      .first()
      .then((result) => {
        const title = result.find('[data-testid="result-title"]').text();
        const campus = result.find('[data-testid="result-campus"]').text();

        cy.get('[data-testid="search-result"]').first().click();

        cy.get('[data-testid="fund-card-container"]').within(() => {
          cy.get('[data-testid="fund-card-description"]').should('be.visible');
          cy.contains('Make a Gift').click();
        });

        cy.contains(title);
        cy.contains(campus);

        cy.get('[data-testid="add-to-basket-button"]').click();

        cy.contains(title);
        cy.contains(campus);
      });

    cy.get('[data-testid="order-total"]')
      .should('be.visible')
      .then((total) => {
        expect(total.text()).to.equal('$275.5');
      });

    cy.get('[data-testid="remove-from-cart-button"]').first().click();
    // cy.get('[data-testid="remove-from-cart-button"]').click();

    cy.contains('Your gift basket is empty.').should('not.exist');

    // cy.contains("Gift Basket Summary").should("not.exist");
    cy.get('[data-testid="remove-from-cart-button"]').should('exist');
    cy.get('[data-testid="add-another-gift-button"]').should('exist');
    cy.get('[data-testid="checkout-button"]').should('exist');
    cy.get('[data-testid="order-total"]').should('exist');
  });
});
