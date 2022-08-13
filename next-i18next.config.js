export const debug = process.env.NODE_ENV === 'development';
export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'de'],
};
export const reloadOnPrerender = process.env.NODE_ENV === 'development';