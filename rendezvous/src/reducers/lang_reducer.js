import { CHANGE_LANGUAGE } from '../actions/types';

const INITIAL_STATE = { locale: 'en' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return { locale: action.payload };
        default: return state;
    }
};