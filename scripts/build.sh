#!/usr/bin/env bash

yarn scss
node scripts/writer.js

echo "REACT_APP_GIT_HASH=$(git rev-parse --short HEAD)" > .env
echo "REACT_APP_BUILD_DATE=$(date +%G-%m-%d)" >> .env

yarn build
node scripts/html.js
yarn postinstall
