/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// TODO: Replace the following with the path to your service account key file
const serviceAccount = require("./e-commerce-7bd3f-firebase-adminsdk-62zdi-95c672fd54.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyDCM5ZBp7Sdpgvon_e_AlCXMn19HY6h2iI",
  authDomain: "e-commerce-7bd3f.firebaseapp.com",
  projectId: "e-commerce-7bd3f",
  storageBucket: "e-commerce-7bd3f.appspot.com",
  messagingSenderId: "695233770176",
  appId: "1:695233770176:web:0e426d88ba6e1e0cddb325",
});

exports.beforeSignIn = functions.auth.user().beforeSignIn(() => {
  console.log("About to signin");
});

exports.assignUserRole = functions.auth.user().onCreate(async (user) => {
  // check if the Firebase user exists
  if (user) {
    // assign "client" role to every new user

    await admin
      .auth()
      .setCustomUserClaims(user.uid, {
        admin: true,
      })
      .then(() => {
        console.log(`Role "client" assigned to user ${user.uid}`);
      })
      .catch((error) => {
        console.log(error);
        console.log(`Error assigning role to user ${user.uid}: `, error);
      });
  } else {
    console.log("No user found");
  }
});

// exports.userCreated = functions.auth.user().onCreate(async (user) => {
//   // Set custom user claims on this newly created user.
//   const res = await admin
//     .auth()
//     .setCustomUserClaims(user.uid, { role: "admin" });
//   // The new custom claims will propagate to the user's ID token the
//   // next time a new one is issued.

//   // Log the user's details
//   console.log(user.uid);
//   console.log(user.displayName);
// });
