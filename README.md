# Giving Frontend

Build with Next.js, this application will pull data from multiple sources and render content for users. It will use server-side rendering techniques, incremental builds for static content, and also fancy client-side caching to provide the best UX possible.

## Getting Started

To run the development server, you should have [Yarn installed](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. It will default to loading the fund search page at: [http://localhost:3000/fund-search](http://localhost:3000/fund-search).

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

## Testing

End-to-end testing is currently done via [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). Unit and integration tests might be added later. Cypress has experimental support for testing React components in unit testing fashion, but that feature hasn't been tried yet.

### Running Tests

For now, you can trigger test runs by running the following command. Currently, the recordings of test runs are not uploaded to the Cypress service for posterity, but that might come in the future.

```bash
# Runs tests in headless mode.
yarn cy:run

# Open up Cypress/Chromium and manually go through test suite while watching everything.
yarn cy:open
```

The tests run on Travis CI for pull requests to the `master` branch and merges into master. The test run is different that doing it locally since the server needs to be automatically started and checked before the tests can run.

```yaml
script:
  # Wake up API for testing
  - nc -zvv 385-i-cu-giving.pantheonsite.io 80; out=$?; while [[ $out -ne 0 ]]; do echo "Retry waking up 385-i-cu-giving.pantheonsite.io..."; nc -zvv 385-i-cu-giving.pantheonsite.io 80; out=$?; sleep 5; done
  - yarn build
  - yarn start > /dev/null 2>&1 &
  - nc -zvv 127.0.0.1 3000; out=$?; while [[ $out -ne 0 ]]; do echo "Retry hit port 3000..."; nc -zvv localhost 3000; out=$?; sleep 5; done
  - yarn cy:run
```

The `nc` commands wake up the test API service before building the app and wait for the app to compile before running the tests.

### Writing Tests

Typically, a test will navigate to a page, look for a DOM element, start asserting values exist, and also maybe interact with the page for interactive assertions.

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

In their docs, [Cypress suggests to chain assertions together](https://docs.cypress.io/guides/references/best-practices.html#Creating-%E2%80%9Ctiny%E2%80%9D-tests-with-a-single-assertion) so that you don't slow down your tests. It is always easy to see what broke in a Cypress test so no need to add a bunch of separate tests with clever names. For interactive tests or tests that follow a user's conversion journey, it would be a real pain to separate out tests leading up to each step of the process.

## Deployment

This app is deployed to Heroku, currently hosted at: https://giving-frontend.herokuapp.com/. Each time a pull request is made, Heroku creates a test environment for manual UAT review.

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

Sometimes the build will fail. Unlike a Travis CI test run, you can't easily click a button to test the deployment again. You can go and manually deploy a change in the "Deploy" section of the Heroku app administration area.

<img width="1043" alt="Screen Shot 2020-06-05 at 3 09 24 PM" src="https://user-images.githubusercontent.com/3640707/83914173-b41f9100-a73e-11ea-9a32-2f0ea0b14584.png">

Also, the Next.js build of the app will try to connect to the API with fund data in it. If that server needs to wake up, then the deployment might fail for that reason. To mitigate this, at least while developing and testing, there could be a Heroku-specific config file that wakes up the API. I am doing this in the Travis CI script already.
