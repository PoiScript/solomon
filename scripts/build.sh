#!/usr/bin/env bash

ts-node -r tsconfig-paths/register scripts/check
ng run blog:build
ng run blog:server
ts-node -r tsconfig-paths/register scripts/prerender
