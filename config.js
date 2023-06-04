var admin = require("firebase-admin");

var serviceAccount = require("./blood-donation-sns-firebase-adminsdk-dp41l-289aec241b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin