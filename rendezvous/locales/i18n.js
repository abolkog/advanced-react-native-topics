import I18n from 'ex-react-native-i18n';

import ar from './arabic.json';
import en from './english.json';

I18n.fallbacks = true;
I18n.translations = {
    en,
    ar
};

I18n.locale = 'en';
export default I18n;