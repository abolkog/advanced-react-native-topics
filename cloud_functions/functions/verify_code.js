const admin = require('firebase-admin');

module.exports = (req, res) => {

    //Check if params (id,code) exists
    if (!req.body.code || !req.body.uid) {
        return res.status(400).send({ error: 'Code and ID are required' })
    }

    const uid = req.body.uid;
    const code = req.body.code;
   

    //Get user by id
    admin.auth().getUser(uid)
        .then(() => {
            const ref = admin.database().ref(`users/${uid}`);
            //Get user data
            ref.once('value').then(snap => {
                const user = snap.val();
                
                //Check Code
                if(user.code !== code) {
                    return res.status(400).send({ error: 'Invalid Code Number' })  
                }

                //Update user
                ref.update({ confirmed: true }).then(() => {
                    return res.send({ success: true })  
                });
            });
        })
        .catch((error) => {
            return res.status(404).send({ error: 'Account not found' })
        });

}