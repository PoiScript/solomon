#!/usr/bin/env bash

ts-node -r tsconfig-paths/register scripts/check
ng build blog --prod
ng run blog:server
ts-node -r tsconfig-paths/register scripts/prerender

# Don't forget to regenerate ngsw.json!
# File hash had changed after pre-rendering.
yarn ngsw-config dist/blog apps/blog/src/ngsw-config.json /
