// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build -c production` then `environment.production.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDT5PIPiQWv1xw1rcnxAa7stZ5pdMXk9uM',
    authDomain: 'cerberus-develop.firebaseapp.com',
    databaseURL: 'https://cerberus-develop.firebaseio.com',
    projectId: 'cerberus-develop',
    storageBucket: 'cerberus-develop.appspot.com',
    messagingSenderId: '78367178329',
  },
};
