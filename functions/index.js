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
const cors = require("cors")({ origin: true });

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

// List all users
exports.listAllUsers = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const listAllUsers = await admin.auth().listUsers();
    res.send(listAllUsers);
  });
});

// Delete a user
exports.deleteUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { uid } = JSON.parse(req.body);
    if (!uid) {
      res.status(400).send("Missing UID");
      return;
    }
    await admin.auth().deleteUser(uid);
    res.send(`User with UID ${uid} has been deleted`);
  });
});

// Update a user to disable him
exports.disableUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    console.log(req.body);
    const { uid, condition } = JSON.parse(req.body);
    if (!uid) {
      res.status(400).send("Missing UID");
      return;
    }
    await admin.auth().updateUser(uid, { disabled: condition });
    res.send(`User with UID ${uid} has been disabled`);
  });
});
