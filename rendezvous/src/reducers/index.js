import { combineReducers } from 'redux';

import auth from './auth_reducer';
import organize from './organize_reducer';
import meetings from './meetings_reducer';
import language from './lang_reducer';

export default combineReducers({
    auth,
    organize,
    meetings,
    language
});