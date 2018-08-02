import {
    FB_ATTEMPTING,
    FB_LOGIN_FAILED,
    FB_LOGIN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { loading: false, profile: null, token: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FB_ATTEMPTING:
            return { ...INITIAL_STATE, loading: true };
        case FB_LOGIN_FAILED: 
            return { loading: false, token: null };
        case FB_LOGIN_SUCCESS:
            return { loading: false, token: action.payload.token, profile: action.payload.profile };
        default: return state;
    }
};