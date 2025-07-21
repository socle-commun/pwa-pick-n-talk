/**
 * Helper for testing schema validation with safe parse
 */
export const testSchemaValidationSafe = <T>(config: {
  validData: T;
  validateSafe: (data: unknown) => { success: boolean; error?: { issues: { message: string }[] } };
  invalidField: string;
  invalidValue: unknown;
  expectedErrorMessage: string;
}) => {
  const { validData, validateSafe, invalidField, invalidValue, expectedErrorMessage } = config;
  const invalidData = { ...validData, [invalidField]: invalidValue };
  const result = validateSafe(invalidData);
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues).toHaveLength(1);
    expect(result.error.issues[0].message).toBe(expectedErrorMessage);
  }
};

/**
 * Helper for testing schema validation that throws
 */
export const testSchemaValidationThrows = <T>(config: {
  validData: T;
  validate: (data: unknown) => T;
  isValid: (data: unknown) => boolean;
  invalidField: string;
  invalidValue: unknown;
}) => {
  const { validData, validate, isValid, invalidField, invalidValue } = config;
  const invalidData = { ...validData, [invalidField]: invalidValue };
  expect(() => validate(invalidData)).toThrow();
  expect(isValid(invalidData)).toBe(false);
};
