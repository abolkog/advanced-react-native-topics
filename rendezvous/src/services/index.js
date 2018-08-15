import { Permissions, Notifications } from 'expo';
import firebase from '../firebase';

const registerForPushNotificationsAsync = async (uid) => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    try {
        // Get the token that uniquely identifies this device
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        //Save the token to firebase
        await firebase.database().ref(`users/${uid}`).update({ pushToken: token });

    } catch (e) {
        console.log('Error while saving the token');
        console.log(e);
    }
};

export { registerForPushNotificationsAsync };