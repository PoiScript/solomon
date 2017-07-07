#!/usr/bin/env bash

# install dependencies

yarn

# render markdown

yarn generate:post
yarn generate:rss

# copy public directory
cp -r public amp
cp -r public ng/src
cp -r public react

# save git commit hash to .env files as environment variables

echo "REACT_APP_GIT_HASH=$(git rev-parse --short HEAD)" > react/.env
cd public/content
echo "REACT_APP_CONTENT_GIT_HASH=$(git rev-parse --short HEAD)" >> ../react/.env
