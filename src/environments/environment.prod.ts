export const environment = {
  production: true,
  firebase: {
    apiKey: process.env.CERBERUS_PROD_API_KEY,
    authDomain: "cerberus-production.firebaseapp.com",
    databaseURL: "https://cerberus-production.firebaseio.com",
    projectId: "cerberus-production",
    storageBucket: "cerberus-production.appspot.com",
    messagingSenderId: "28006094024"
  }
};
