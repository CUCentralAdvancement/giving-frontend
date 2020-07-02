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
    setCart();

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
    cy.get('input[name="companyName"]').should("be.visible").type("ACME Corp.");

    // Set title select to "Mrs.".
    cy.get('label[for="title"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="title"]').should("have.attr", "value", "Ms.");

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");

    // Set address type to "Work".
    cy.get('label[for="addressType"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="addressType"]').should("have.attr", "value", "work");

    // @todo Add tests for address.

    // Set address type to "Work".
    cy.get('label[for="phoneType"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="phoneType"]').should("have.attr", "value", "work");

    // @todo Add email validation tests.
    cy.get('input[name="email"]').type("john.doe@gmail.com");

    // Spouse/partner.
    cy.get('input[name="spouseName"]').should("not.exist");
    cy.get('input[name="includeSpouse"]').check({ force: true });
    cy.get('input[name="spouseName"]').should("be.visible").type("Jane Doe");

    // Matching gifts.
    cy.get('input[name="employerName"]').should("not.exist");
    cy.get('[data-testid="matching-gifts-radios"]').contains("Yes").click();
    cy.get('input[name="employerName"]')
      .should("be.visible")
      .type("ACME Corp.");

    // Comments.
    cy.get('[data-testid="comments-textarea"]')
      .should("be.visible")
      .type("My comment.");

    // Tax receipt and update profile.
    cy.get('[data-testid="tax-receipt-radios"]').contains("Mail").click();
    cy.get('input[name="updateProfile"]').check({ force: true });

    // Continue to next page.
    cy.get('[data-testid="continue-button"]').click();

    cy.url().should("include", "checkout/payment");
  });

  it("Handles payment page and navigates to completion page.", () => {
    setCart();
    cy.visit("/checkout/payment");
    cy.contains("Please do not use Refresh or Back buttons on this page.");
    cy.get('[data-testid="complete-purchase-button"]').click();
    cy.url().should("include", "checkout/complete");
  });

  it("Handles payment completion page.", () => {
    setCart();
    cy.visit("/checkout/complete");

    // Gift Summary should still have items in it even though the cart is empty.
    cy.contains("Office of Student Life Food Pantry Fund (CU Denver)");
    cy.contains("Bridge Forward Scholarship Endowment (UCCS)");
    cy.get('[data-testid="order-total"]')
      .should("be.visible")
      .then((total) => {
        expect(total.text()).to.equal("$300");
      });

    // Make sure that cart in header doesn't have any items.
    // @todo Figure out why this works locally but not on Travis CI.
    // cy.get("header").within(() => {
    //   cy.get('[data-testid="cart-items-total"]').then((total) => {
    //     expect(total.text()).to.equal("0");
    //   });
    // });

    // @todo Make this dymanic with actual gift ID.
    cy.get('[data-test-id="gift-id"]').contains("12345");

    cy.contains(
      "Thank you for your generous gift to the University of Colorado."
    );

    // @todo Add more tests on dynamic user data included in messages.
  });
});

function setCart() {
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
}
