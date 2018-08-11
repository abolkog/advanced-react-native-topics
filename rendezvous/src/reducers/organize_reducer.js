import {
    ORGANIZE_ATTEMPTING,
    ORGANIZE_FAILED,
    ORGANIZE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { saving: false, saved: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORGANIZE_ATTEMPTING:
            return { ...INITIAL_STATE, saving: true };
        case ORGANIZE_SUCCESS: 
            return { saved: true, saving: false };
        case ORGANIZE_FAILED:
            return { saved: false, saving: false };
        default: return state;
    }
};