const admin = require('firebase-admin');

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

            //Save code and phone number
            admin.database().ref(`users/${uid}`).update({ phone,code}).then(() => {
                return res.send({ success: true });
            })
        })
        .catch((error) => {
            return res.status(404).send({ error: 'Account not found' }) 
        });
    
}