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
