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
- **Theme UI -** Base component library
- **react-hook-form -** Form building helper
- **Framer Motion -** Declarative animation support
- **Recoil -** Atomic state management
- **Next.js -** Server-side rendering and route management
- **Cypress -** Test runner

## Testing

End-to-end testing is currently done via [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell). Unit and integration tests might added later, but the creators of...

