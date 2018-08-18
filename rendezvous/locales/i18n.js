import I18n from 'ex-react-native-i18n';

I18n.fallbacks = true;
I18n.translations = {
    en: {
        'logout': 'Logout'
    },
    ar: {
        'logout': 'تسجيل خروج'
    }
};

I18n.locale = 'en';
export default I18n;