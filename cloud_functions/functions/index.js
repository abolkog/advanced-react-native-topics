const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const genCode = require('./gen_code');
const verifyCode = require('./verify_code');
const fetch = require('node-fetch');

const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://rendezvous-521e6.firebaseio.com'
});


exports.genCode = functions.https.onRequest(genCode);

exports.verifyCode = functions.https.onRequest(verifyCode);

exports.pushNotifications = functions.database.ref('meeting/{meetingId}').onCreate((snap) => {
    
    //Get meeting id
    const meetingId = snap.key;

    //All push messages for all users
    const messages = [];

    return firebase.database().ref('users').once('value').then(snapshot => {
        snapshot.forEach((snap) => {
            
            //Get push Token
            const pushToken = snap.val().pushToken;

            if (pushToken) {
                messages.push({
                    "to": pushToken,
                    "sound": "default",
                    "title": "New Meeting",
                    "body": "A new meeting has been added",
                    "data": { "meetingId": meetingId }
                });
            }
        });

        return Promise.all(messages);
    }).then(message => {
        
        //Push Messages
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

    }).catch(err => {
        console.log('error');
        console.log(err);
    });
});