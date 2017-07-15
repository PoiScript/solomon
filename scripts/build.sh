#!/usr/bin/env bash

yarn scss
node scripts/writer.js

echo "REACT_APP_GIT_HASH=$(git rev-parse --short HEAD)" > .env
echo "REACT_APP_CONTENT_GIT_HASH=$(git submodule status | awk '{print substr($1,1,7) }')" >> .env

yarn build
node scripts/html.js
