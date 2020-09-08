describe("Checkout Tests", () => {
  beforeEach(() => {
    // Cart defaults are loaded from localStorage.
    cy.clearLocalStorage("userCart");
  });

  // @todo Do this after figuring out alerts on redirects.
  xit("Handles empty cart on all checkout-related pages", () => {
    cy.visit("/checkout");
    cy.contains("Your gift basket is empty.");

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

    // Set title select to "Ms.".
    cy.get('label[for="title"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="title"]').should("have.attr", "value", "Ms.");

    // Set first and last name.
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");

    // Set address type to "Work".
    cy.get('label[for="addressType"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="addressType"]').should("have.attr", "value", "work");

    // Set country to "Afghanistan".
    cy.get('label[for="addressCountry"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="addressCountry"]').should("have.attr", "value", "AF");

    // Set address and city.
    cy.get('input[name="addressLine1"]').type("123 High St.");
    cy.get('input[name="addressCity"]').type("London");

    // Set state to "Alabama".
    cy.get('label[for="addressState"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="addressState"]').should("have.attr", "value", "AL");

    // Set postal code.
    cy.get('input[name="addressZip"]').type("43210");

    // Set phone type to "Work".
    cy.get('label[for="phoneType"]')
      .next()
      .click()
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 40, which: 40 })
      .trigger("keydown", { keyCode: 13, which: 13 });
    cy.get('input[name="phoneType"]').should("have.attr", "value", "work");

    cy.get('input[name="preferredPhone"]').type("555-555-5555");

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
    cy.contains("Please do not use Refresh or Back buttons on this page.");

    getIframeBody("add_payment")
      .contains("Missing or invalid token.")
      .should("not.exist");
    getIframeBody("add_payment")
      .find("#orderDescription")
      .contains("Office of Student Life Food Pantry Fund (0321793)")
      .should("be.visible");
    getIframeBody("add_payment")
      .find("#orderDescription")
      .contains("Bridge Forward Scholarship Endowment (0430106)")
      .should("be.visible");
    getIframeBody("add_payment")
      .find("#orderTotalAmount")
      .contains("300.00")
      .should("be.visible");
    getIframeBody("add_payment")
      .find("#orderInvoiceNumber")
      .should("be.visible");

    // The form is done in Angular and looks like all of these fields are stored in JS
    // but not in the DOM.
    // getIframeBody("add_payment")
    //   .find('input[name="firstName"]')
    //   .contains("John")
    //   .should("be.visible");
    // getIframeBody("add_payment")
    //   .find('input[name="lastName"]')
    //   .contains("Doe")
    //   .should("be.visible");
    // getIframeBody("add_payment")
    //   .find('input[name="zip"]')
    //   .contains("43210")
    //   .should("be.visible");
    // getIframeBody("add_payment")
    //   .find('input[name="city"]')
    //   .contains("London")
    //   .should("be.visible");
    // getIframeBody("add_payment")
    //   .find('input[name="state"]')
    //   .contains("AL")
    //   .should("be.visible");
    // getIframeBody("add_payment")
    //   .find('input[name="phoneNumber"]')
    //   .contains("555-555-5555")
    //   .should("be.visible");
    // getIframeBody("add_payment")
    //   .find("#billingAddress_dropdownParent")
    //   .find(".dropdown-selected-item")
    //   .contains("Afghanistan")
    //   .should("be.visible");

    getIframeBody("add_payment")
      .find('input[name="cardNum"]')
      .type("4111111111111111");

    getIframeBody("add_payment").find('input[name="expiryDate"]').type("0125");

    getIframeBody("add_payment").find('input[name="cvv"]').type("123");

    getIframeBody("add_payment").find(".payButton").click();

    /* eslint-disable-next-line */
    cy.wait(5000);

    // cy.url().should("include", "checkout/complete");
    // cy.contains(
    //   "Thank you for your generous gift to the University of Colorado."
    // );
  });

  it("Handles payment page without a token.", () => {
    setCart();
    cy.visit("/checkout/payment");
    cy.contains("Please do not use Refresh or Back buttons on this page.");

    getIframeBody("add_payment").contains("Missing or invalid token.");
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
    /* eslint-disable-next-line */
    cy.wait(1000);
    cy.get("header").within(() => {
      cy.get('[data-testid="cart-items-total"]').then((total) => {
        expect(total.text()).to.equal("0");
      });
    });

    // @todo Make this dymanic with actual gift ID.
    // cy.get('[data-test-id="gift-id"]').contains("12345");

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

const getIframeBody = (id) => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get(`iframe[data-cy="${id}"]`)
      .its("0.contentDocument.body")
      .should("not.be.empty")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(cy.wrap)
  );
};
