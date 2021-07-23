# Giving Frontend

Build with Next.js, this application will pull data from multiple sources and render content for
users. It will use server-side rendering techniques, incremental builds for static content, and also
fancy client-side caching to provide the best UX possible.

- [Getting Started](#getting-started)
- [Font Awesome Icons](#font-awesome)
- [Authorize.net Payment Flow](docs/authorize-payment-flow.md)
- [Testing](#testing)
- [Deployments](#deployment)

## Dumb Note About Todo Tasks

- Need to make sure marketing cloud tracking works...obvious but don't forget.

## Getting Started

To run the development server, you should
have [Yarn installed](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. It will
default to loading the fund search page at: 
[http://localhost:3000/fund-search](http://localhost:3000/fund-search). You'll be able to view
the basic app but several parts won't properly function until you've added local environmental
variables and enabled SSL support.

### SSL

To complete a payment transaction, Authorize.net needs its iframe to load a local communicator file
because of the same-origin policy browsers use to restrict CORS. That communicator file has to be
loades on a secure connection. To generate a local certificate, run openssl.

```bash
cd giving-frontend
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

That will create the needed public key and certificate files at the root of your project. These
files aren't tracked in source control since services end up sending you scary warnings about
commiting public keys, even if they are only for a localhost SSL cert. I prefer not to get those
notices.

### .env Variables

The `.env.example` file has a set of placeholder for the API keys you will need to add in order to
run the app, provide logging, handle search, and handle payments.

```ini
# All needed credentials are available from the Heroku admin "reveal config vars" button.

# Algolia is a hosted search service.
NEXT_PUBLIC_ALGOLIA_KEY=
NEXT_PUBLIC_ALGOLIA_ID=

# Authorize.net provides a hosted payment form via an iframe.
AUTHORIZE_LOGIN_ID=
AUTHORIZE_TRANSACTION_KEY=

# This is "https://localhost:3000/cator.html" but cert no good locally.
AUTHORIZE_IFRAME_COMMUNICATOR_URL=http://localhost:3000/cator.html
```

Fill those in by asking your coworkers for the proper credentials and do so in a `.env` file.
Just like the SSL cert and key, the `.env` file isn't tracked by version control in order to
not reveal sensitive information to the world.

After filling in those credentials, you should be able to view and use the entire application.

## Stack

The Giving Frontend application is built with the following tech stack:

- **React -** The UI layer and basic state management
- **CU Advance Component Library -** Base component library
- **react-hook-form -** Form building helper
- **Framer Motion -** Declarative animation support
- **Recoil -** Atomic state management
- **Next.js -** Server-side rendering and route management
- **Cypress -** Test runner
- **Travis CI -** CI tool
- **Heroku -** Hosting environment
- **Tailwind CSS -** CSS styling framework

## Testing

End-to-end testing is currently done
via [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). Unit and
integration tests might be added later. Cypress has experimental support for testing React
components in unit testing fashion, but that feature hasn't been tried yet.

### Running Tests

For now, you can trigger test runs by running the following command. Currently, the recordings of
test runs are not uploaded to the Cypress service for posterity, but that might come in the future.

```bash
# Runs tests in headless mode.
yarn cy:run

# Open up Cypress/Chromium and manually go through test suite while watching everything.
yarn cy:open
```

The tests run on GitHub when pull requests are made to the `main` branch. The test run is different from 
doing it locally since the server needs to be automatically started and checked before the tests can run. 
Cypress provides a nice GitHub Action that allows you to start and wait on the server before running tests.

```yaml
  - name: Cypress run
    uses: cypress-io/github-action@v2
    with:
      spec: cypress/integration/**/*
      build: yarn build
      start: yarn start
      wait-on: "http://localhost:3000"
      wait-on-timeout: 120
      browser: chrome
      record: true
    env:
      CYPRESS_PROJECT_ID: ${{ secrets.CYPRESS_PROJECT_ID }}
      CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

Cypress Dashboard is used on this project for debugging purposes, but the integration isn't well 
established enough to write about in this readme. 

### Writing Tests

Typically, a test will navigate to a page, look for a DOM element, start asserting values exist, and
also maybe interact with the page for interactive assertions.

```js
it("Loads fund search page with correct results", () => {
  // Cypress.config('baseUrl') is used to prepend to the visit command's parameter.
  cy.visit("/fund-search");

  // Check for visiable text on the page.
  cy.contains("Resident Emergency Relief Fund");

  // Initial search elements are limited to 24 results.
  cy.get('[data-testid="search-result-count"]').contains("24");

  // First result should always be a featured fund.
  cy.get('[data-testid="search-result"]').first().contains("Featured Fund");

  // Load more and refine buttons exist.
  cy.get('[data-testid="load-more-button"]').should("exist");
  cy.get('[data-testid="refine-search-button"]').should("exist");
});
```

In their docs, [Cypress suggests to chain assertions together](https://docs.cypress.io/guides/references/best-practices.html#Creating-%E2%80%9Ctiny%E2%80%9D-tests-with-a-single-assertion)
so that you don't slow down your tests. It is always easy to see what broke in a Cypress test so no
need to add a bunch of separate tests with clever names. For interactive tests or tests that follow
a user's conversion journey, it would be a real pain to separate out tests leading up to each step
of the process.

## Deployment

This app is deployed to Heroku, currently hosted at: https://giving-frontend.herokuapp.com/. Each
time a pull request is made, Heroku creates a test environment for manual UAT review.

<img width="714" alt="Screen Shot 2020-06-05 at 3 00 30 PM" src="https://user-images.githubusercontent.com/3640707/83913443-73734800-a73d-11ea-9a7c-15c0a2fde97e.png">

Once the pull request gets merged, Heroku will deploy to https://giving-frontend.herokuapp.com/.

### Deployment Failures

```
-----> Build failed
       
       We're sorry this build is failing! You can troubleshoot common issues here:
       https://devcenter.heroku.com/articles/troubleshooting-node-deploys
       
       Some possible problems:
       
       - Node version not specified in package.json
         https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version
       
       - ECONNRESET issues may be related to npm versions
         https://github.com/npm/registry/issues/10#issuecomment-217141066
       
       Love,
       Heroku
       
 !     Push rejected, failed to compile Node.js app.
 !     Push failed
```

Sometimes the build will fail. Unlike a Travis CI test run, you can't easily click a button to test
the deployment again. You can go and manually deploy a change in the "
Deploy" section of the Heroku app administration area.

<img width="1043" alt="Screen Shot 2020-06-05 at 3 09 24 PM" src="https://user-images.githubusercontent.com/3640707/83914173-b41f9100-a73e-11ea-9a32-2f0ea0b14584.png">

Also, the Next.js build of the app will try to connect to the API with fund data in it. If that
server needs to wake up, then the deployment might fail for that reason. To mitigate this, at least
while developing and testing, there could be a Heroku-specific config file that wakes up the API. I
am doing this in the Travis CI script already.

## Font Awesome

This repository used to integrate with the Pro version of Font Awesome icons, which requires more
setup, but now the free version of Font Awesome 5 is used.

```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Search for icons at https://fontawesome.com/icons?d=gallery&m=free .
// Then Pascal-case the name removing hyphens to get the exported component.
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

function IconThing() {
  return (
    <FontAwesomeIcon icon={faShoppingBasket}/>
  );
}
```
