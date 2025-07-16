/**
 * Extracts a translated property value from an object's properties field
 * @param properties The properties object containing translations by language
 * @param language The language code (e.g., 'fr', 'en', 'es')
 * @param propertyName The name of the property to extract
 * @returns The translated value or empty string if not found
 */
export function getTranslation(
  properties: Record<string, Record<string, string>> | undefined,
  language: string,
  propertyName: string
): string {
  return properties?.[language]?.[propertyName] || "";
}
