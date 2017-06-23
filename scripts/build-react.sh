#!/usr/bin/env bash

cd react

# Build CSS

node-sass-chokidar src/ -o src/ --output-style compressed

# Production Build of React

react-scripts build

# Crawler

react-snapshot

# Replace Empty HTML Tag with Post

node scripts/replace-html.js

# Move All HTML Files to /path/to/file/index.html

node scripts/moving-html.js

# Move Compiled Output to Deploy Directory

cp -R build/. ../dist
