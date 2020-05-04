// next.config.js
require("dotenv").config();
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  },
});
