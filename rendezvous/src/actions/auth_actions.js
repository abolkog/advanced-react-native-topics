import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import firebase from '../firebase';
import FbConfig from '../FbConfig';

import { 
    FB_ATTEMPTING,
    FB_LOGIN_FAILED,
    FB_LOGIN_SUCCESS,
    REFRESH_PROFILE
} from './types';

export const facebookLogin = () => {
    return async (dispatch) => {
        dispatch({ type: FB_ATTEMPTING });

        //1- Facebook Login
        const { token, type } = await Facebook.logInWithReadPermissionsAsync(FbConfig.appId,
            { permissions: ['public_profile'] });
        
        if (type === 'cancel') {
            return dispatch({ type: FB_LOGIN_FAILED });
        }

        finishLogin(dispatch, token);
    };
};

const finishLogin = async (dispatch, token) => {
    try {
        //2- Firebase Sign in 
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        const { user: { displayName, photoURL, uid } } = 
            await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        
        //3- Save User Information
        let profile = { displayName, photoURL, uid };
        await firebase.database().ref(`users/${uid}`).update(profile);
        
        const snap = await firebase.database().ref(`users/${uid}`).once('value');
        profile = snap.val();
        
        //4- Save Token
        await AsyncStorage.setItem('fb_token', token);
        // await AsyncStorage.setItem('user_id', uid);

        //Auth Logic Completed
        return dispatch({ type: FB_LOGIN_SUCCESS, payload: { token, profile } });
    } catch (e) {
        console.log(e);
        return dispatch({ type: FB_LOGIN_FAILED });
    }
    
};

export const refreshProfileData = (uid) => {
    return async (dispatch) => {
        const snap = await firebase.database().ref(`users/${uid}`).once('value');
        const profile = snap.val();
        return dispatch({ type: REFRESH_PROFILE, payload: { profile } });
    };
};