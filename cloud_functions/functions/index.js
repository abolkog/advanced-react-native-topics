const functions = require('firebase-functions');
const admin = require('firebase-admin');
const genCode = require('./gen_code');
const verifyCode = require('./verify_code');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rendezvous-521e6.firebaseio.com'
});


exports.genCode = functions.https.onRequest(genCode);
exports.verifyCode = functions.https.onRequest(verifyCode);