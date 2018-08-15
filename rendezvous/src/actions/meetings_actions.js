import firebase from '../firebase';
import { MEETINGS_FETCHED, SINGLE_DONE, SINGLE_FETCHING } from './types';

// Get All Meetings
export const fetchMeetings = () => {
    return (dispatch) => {
        firebase.database().ref('meeting').limitToLast(30).on('value', (snap) => {
            // const data = snap.val() || [];
            // const meetings = [];
            // Object.values(data).forEach(meeting => {
            //     meetings.push(meeting);
            // });

            const meetings = [];
            snap.forEach(record => {
                const meeting = record.val();
                meeting.id = record.key;
                meetings.push(meeting);
            });

            dispatch({ type: MEETINGS_FETCHED, payload: meetings });
        });
    };
};

// Get Single Meeting by id (key)
export const fetchSingleMeeting = (id) => {
    return async (dispatch) => {
        dispatch({ type: SINGLE_FETCHING });
        const snap = await firebase.database().ref(`meeting/${id}`).once('value');
        const meeting = snap.val();
        console.log(meeting);

        return dispatch({ type: SINGLE_DONE, payload: meeting });
    };
};