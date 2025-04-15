/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "id"],
  pseudoLocale: "pseudo",
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: 'locales/{locale}',
      include: ['app/']
    }
  ]
};
