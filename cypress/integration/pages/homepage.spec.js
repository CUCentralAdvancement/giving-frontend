describe('Homepage tests', function() {
  it('should load giving form and go to funds/fund search', function() {
    cy.visit('/');

    // Go to fund search from giving form.
    cy.get('[data-testid="search-funds-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search');

    // Go to a featured fund with a set giving amount.
    cy.visit('/');
    cy.get('select[name="featured-fund-select"]').select('Bridge Forward Scholarship Endowment');
    cy.get('input[name="giving-amount"]').type('20');
    cy.get('input[name="give-now"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund/bridge-forward-scholarship?amount=20');
    // @todo Make sure this sets a giving amount once that feature is implemented.
  });

  it('should navigate to campuses', function() {

    // CU Anschutz.
    cy.visit('/');
    cy.get('a[data-testid="anschutz-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?campus=CU%20Anschutz');
    cy.get('span[data-testid="result-campus"]').contains('CU Anschutz').should('be.visible');
    cy.get('span[data-testid="result-campus"]').contains('CU Boulder').should('not.exist');

    // CU Boulder.
    cy.visit('/');
    cy.get('a[data-testid="boulder-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?campus=CU%20Boulder');
    cy.get('span[data-testid="result-campus"]').contains('CU Boulder').should('be.visible');
    cy.get('span[data-testid="result-campus"]').contains('CU Anschutz').should('not.exist');

    // CU Denver.
    cy.visit('/');
    cy.get('a[data-testid="denver-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?campus=CU%20Denver');
    cy.get('span[data-testid="result-campus"]').contains('CU Denver').should('be.visible');
    cy.get('span[data-testid="result-campus"]').contains('CU Anschutz').should('not.exist');

    // UCCS.
    cy.visit('/');
    cy.get('a[data-testid="uccs-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?campus=UCCS');
    cy.get('span[data-testid="result-campus"]').contains('UCCS').should('be.visible');
    cy.get('span[data-testid="result-campus"]').contains('CU Anschutz').should('not.exist');

  });

  it('should navigate to interests', function() {

    // Alumni Programs.
    cy.visit('/');
    cy.get('a[data-testid="alumni-programs-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Alumni%20Programs');
    cy.get('span[data-testid="result-interest"]').contains('Alumni Programs').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Arts & Culture.
    cy.visit('/');
    cy.get('a[data-testid="arts-culture-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Arts%20%26%20Culture');
    cy.get('span[data-testid="result-interest"]').contains('Arts & Culture').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Athletics & Recreation.
    cy.visit('/');
    cy.get('a[data-testid="athletics-recreation-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Athletics%20%26%20Recreation');
    cy.get('span[data-testid="result-interest"]').contains('Athletics & Recreation').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Community & Society.
    cy.visit('/');
    cy.get('a[data-testid="community-society-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Community%20%26%20Society');
    cy.get('span[data-testid="result-interest"]').contains('Community & Society').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Enterprise & Entrepreneurship.
    cy.visit('/');
    cy.get('a[data-testid="enterprise-entrepr-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Enterprise%20%26%20Entrepreneurship');
    // None of these in the current search results...should up the funds seed.
    // cy.get('span[data-testid="result-interest"]').contains('Enterprise & Entrepreneurship').should('be.visible');
    // cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Health & Wellness.
    cy.visit('/');
    cy.get('a[data-testid="health-wellness-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Health%20%26%20Wellness');
    cy.get('span[data-testid="result-interest"]').contains('Health & Wellness').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Scholarships & Student Success.
    cy.visit('/');
    cy.get('a[data-testid="scholarships-student-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Scholarships%20%26%20Student%20Success');
    cy.get('span[data-testid="result-interest"]').contains('Scholarships & Student Success').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('not.exist');

    // Science, Research & Innovation.
    cy.visit('/');
    cy.get('a[data-testid="science-research-fund-search-link"]').click();
    cy.url().should('equal', 'http://localhost:3000/fund-search?interest=Science,%20Research%20%26%20Innovation');
    cy.get('span[data-testid="result-interest"]').contains('Science, Research & Innovation').should('be.visible');
    cy.get('span[data-testid="result-interest"]').contains('Health & Wellness').should('not.exist');

  });
});
