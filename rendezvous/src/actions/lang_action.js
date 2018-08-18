import { CHANGE_LANGUAGE } from './types';
import I18n from '../../locales/i18n';

export const changeLocale = (locale) => {
    I18n.locale = locale;
    return { type: CHANGE_LANGUAGE, payload: locale };
};