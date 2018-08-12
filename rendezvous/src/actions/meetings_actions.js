import firebase from '../firebase';
import { MEETINGS_FETCHED } from './types';

export const fetchMeetings = () => {
    return (dispatch) => {
        firebase.database().ref('meeting').limitToLast(30).on('value', (snap) => {
            const data = snap.val() || [];
            const meetings = [];
            Object.values(data).forEach(meeting => {
                meetings.push(meeting);
            });

            dispatch({ type: MEETINGS_FETCHED, payload: meetings });
        });
    };
};