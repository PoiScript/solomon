# Solomon [![Build Status](https://travis-ci.org/PoiScript/Solomon.svg?branch=master)](https://travis-ci.org/PoiScript/Solomon)

A blog framework.

## Installation

```bash
$ git clone https://github.com/PoiScript/Solomon
$ cd Solomon
$ npm install
```

## Configure

Modify `src/config.ts` & `src/app.module.ts`.

## Writing

1. Your post must write in Markdown, extension `.md`.

2. Put your post in `src/markdown`.

3. Each `.md` file must start with a code block.

4. You must also write two files named `about.md` and `link.md`.

## Build

```bash
$ npm run render # render your markdown file to json
$ npm run build
```

## Deploy

### Deploy to Firebase

Modify `.firebaserc` and run

```bash
$ firebase deploy # Mark sure you installed firebase-tools and logged in
```

### Deploy to GitHub Pages

```bash
$ cd dist
$ git init
$ git remote add origin git@github.com:username/username.github.io.git
$ git push
```

## License
Solomon is [MIT](https://github.com/PoiScript/Blog/blob/master/LICENSE) licensed.

- [Angular](https://github.com/angular/angular) is licensed: [MIT](https://github.com/angular/angular/blob/master/LICENSE)
- [Angular CLI](https://github.com/angular/angular-cli) is licensed: [MIT](https://github.com/angular/angular-cli/blob/master/LICENSE)
- [Angular Material](https://github.com/angular/material2) is licensed: [MIT](https://github.com/angular/material2/blob/master/LICENSE)
- [Flex Layout](https://github.com/angular/flex-layout) is licensed: [MIT](https://github.com/angular/flex-layout/blob/master/LICENSE)
