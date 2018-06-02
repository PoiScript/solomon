#!/usr/bin/env bash

ts-node -r tsconfig-paths/register scripts/check
ng build blog --prod
ng run blog:server
ts-node -r tsconfig-paths/register scripts/prerender
