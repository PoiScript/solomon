// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  origin_url: '/',
  firebase: {
    apiKey: 'AIzaSyDptUPQOWYnHIDanDsPY_PFtB3fn2v2VfY',
    authDomain: 'solomon-poi.firebaseapp.com',
    databaseURL: 'https://solomon-poi.firebaseio.com',
    projectId: 'solomon-poi',
    storageBucket: 'solomon-poi.appspot.com',
    messagingSenderId: '90437469860'
  }
};
