#!/usr/bin/env bash

# install dependencies

yarn

# save git commit hash to .env files as environment variables

echo "REACT_APP_GIT_HASH=$(git rev-parse --short HEAD)" > .env
echo "REACT_APP_CONTENT_GIT_HASH=$(git submodule status | awk '{print substr($1,1,7) }')" >> .env

# move post.json & markdown.scss

mv public/post.json src/
mv public/markdown.scss src/
