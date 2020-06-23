describe("Checkout Tests", () => {
  beforeEach(() => {
    // Cart defaults are loaded from localStorage.
    cy.clearLocalStorage("userCart");
  });

  // @todo Do this after figuring out alerts on redirects.
  xit("Handles empty cart on all checkout-related pages", () => {
    cy.visit("/checkout");
    // cy.contains("Your gift basket is empty.");

    // cy.contains("Gift Basket Summary").should("not.exist");
    // cy.get('[data-testid="remove-from-cart-button"]').should("not.exist");
    // cy.get('[data-testid="add-another-gift-button"]').should("not.exist");
    // cy.get('[data-testid="checkout-button"]').should("not.exist");
    // cy.get('[data-testid="order-total"]').should("not.exist");
  });

  it("Correctly navigates to cart from edit button", () => {
    cy.visit("/checkout");
    cy.contains("Edit Gift Basket").click();
    cy.contains("Your gift basket is empty.");
  });

  it("Loads cart, handles form input, and continues to next step", () => {
    window.localStorage.setItem(
      "userCart",
      JSON.stringify([
        {
          allocationCode: "0321793",
          fundCampus: "CU Denver",
          fundRoute: "/fund/office-student-life-food-pantry-fund",
          fundTitle: "Office of Student Life Food Pantry Fund",
          "giving-amount": 50,
          inHonorOf: 0,
        },
        {
          allocationCode: "0430106",
          fundCampus: "UCCS",
          fundRoute: "/fund/bridge-forward-scholarship",
          fundTitle: "Bridge Forward Scholarship Endowment",
          "giving-amount": "250",
          inHonorOf: 0,
        },
      ])
    );

    // Briefly test cart summary. Better tested in cart.spec.js.
    cy.visit("/checkout");
    cy.get('[data-testid="cart-item"]').then((cartItems) => {
      expect(cartItems.length).to.equal(2);
    });
    cy.get('[data-testid="order-total"]')
      .should("be.visible")
      .then((total) => {
        expect(total.text()).to.equal("$300");
      });
    cy.get('[data-testid="remove-from-cart-button"]').should("not.exist");

    // Test Contact Information form.
    cy.get('input[name="companyName"]').should("not.exist");
    cy.contains("Company/Organization").click();
    cy.get('input[name="companyName"]').should("be.visible");
  });
});
