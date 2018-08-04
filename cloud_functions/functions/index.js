const functions = require('firebase-functions');
const genCode = require('./gen_code');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.greeting = functions.https.onRequest((request, response) => {
    const body = request.body;
    const name = request.body.name;

    response.send({
        greeting: `Hello ${name}`,
        body: body
    });
});

exports.genCode = functions.https.onRequest(genCode);