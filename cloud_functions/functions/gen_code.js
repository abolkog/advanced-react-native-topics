const admin = require('firebase-admin');
const twilio = require('./twilio_config');
module.exports = (req, res) => {
    //Check if params (id,phone) exists
    if (!req.body.phone || !req.body.uid) {
        return res.status(400).send({ error: 'Phone and ID are required' })
    }
    
    const uid = req.body.uid;
    //Make sure phone container only numbers
    const phone = String(req.body.phone).replace(/[^\d]/g, ''); 
    
    //Get user by id
    admin.auth().getUser(uid)
        .then(user => {
            //Generate code
            const code = Math.floor(Math.random() * 9000 + 1000)
            
            //text via twilio
            twilio.messages.create({
                body: `Your Randezvous code is ${code}`,
                from: '+18604313931',
                to: `+${phone}`
            }).then((message) => {
                //Save code and phone number
                admin.database().ref(`users/${uid}`).update({ phone, code }).then(() => {
                    return res.send({ success: true });
                })
            })
            .catch((err) => {
                return res.status(500).send({ error: 'Failed to send SMS', err }) 
            });

            
        })
        .catch((error) => {
            return res.status(404).send({ error: 'Account not found' }) 
        });
    
}