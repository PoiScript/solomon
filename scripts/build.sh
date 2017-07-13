#!/usr/bin/env bash

node scripts/writer.js

echo "REACT_APP_GIT_HASH=$(git rev-parse --short HEAD)" > react/.env
echo "REACT_APP_CONTENT_GIT_HASH=$(git submodule status | awk '{print substr($1,1,7) }')" >> react/.env

yarn build-scss
yarn react:build

node scripts/html.js

mv react/build/* public/
