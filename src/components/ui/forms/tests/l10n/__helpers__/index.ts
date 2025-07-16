// Export centralisé de tous les helpers l10n pour tests
export { I18nTestHelper } from "./i18nTestHelpers";
export { mockI18nextSimple, mockI18nextWithInterpolation } from "./mockHelpers";
export { translationAssertions } from "./assertionHelpers";
export {
  validationTestData,
  supportedLanguages,
  testTranslations,
  validationTestSchemas,
  type SupportedLanguage,
  type TestFormSchema
} from "./testData";
