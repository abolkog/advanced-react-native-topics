import { MEETINGS_FETCHED } from '../actions/types';

const INITIAL_STATE = { fetching: true, result: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       case MEETINGS_FETCHED:
            return { fetching: false, result: action.payload };
        default: return state;
    }
};