#!/usr/bin/env bash

# Build Next.js
yarn build

# Start server.
yarn test:server > /dev/null 2>&1 & nc -zvv 127.0.0.1 3000; out=$?; while [[ $out -ne 0 ]]; do echo "Retry hit port 3000..."; nc -zvv localhost 3000; out=$?; sleep 5; done

# Run tests.
yarn cy:run
