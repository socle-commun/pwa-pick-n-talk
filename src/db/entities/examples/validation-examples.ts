/**
 * @file src/db/entities/examples/validation-examples.ts
 * @description Examples of how to use Zod validation with entities
 * Because apparently you need examples to understand basic concepts
 */

import {
  UserSchema,
  PictogramSchema,
  BinderSchema,
  CategorySchema,
  TranslationSchema,
  SettingSchema,
  HistorySchema,
  validateUser,
  validatePictogram,
  createValidator,
} from "../data";

// Example 1: Basic validation
const validateUserData = (userData: unknown) => {
  try {
    const validUser = validateUser(userData);
    console.log("Valid user:", validUser);
    return validUser;
  } catch (error) {
    console.error("Validation failed:", error);
    throw error;
  }
};

// Example 2: Safe validation (non-throwing)
const safeValidateUserData = (userData: unknown) => {
  const result = UserSchema.safeParse(userData);
  
  if (result.success) {
    console.log("Valid user:", result.data);
    return result.data;
  } else {
    console.error("Validation errors:", result.error.errors);
    return null;
  }
};

// Example 3: Using the generic validator
const userValidator = createValidator(UserSchema);
const pictogramValidator = createValidator(PictogramSchema);

// Example 4: Partial validation for updates
const validateUserUpdate = (updateData: unknown) => {
  const partialSchema = UserSchema.partial();
  return partialSchema.parse(updateData);
};

// Example 5: Custom validation with transformation
const validateAndTransformUser = (userData: unknown) => {
  const transformedSchema = UserSchema.extend({
    email: UserSchema.shape.email.transform(email => email.toLowerCase()),
    name: UserSchema.shape.name.transform(name => name?.trim()),
  });
  
  return transformedSchema.parse(userData);
};

// Example 6: Validation with custom error messages
const StrictUserSchema = UserSchema.extend({
  email: UserSchema.shape.email.refine(
    email => !email.includes('+'),
    "Email addresses with '+' are not allowed because you're probably a bot"
  ),
  password: UserSchema.shape.password.refine(
    password => password ? password.length >= 12 : true,
    "Password must be at least 12 characters, stop being lazy with security"
  ),
});

// Example usage in API endpoints or form handling
export const apiValidation = {
  validateCreateUser: (data: unknown) => validateUser(data),
  validateUpdateUser: (data: unknown) => validateUserUpdate(data),
  validateCreatePictogram: (data: unknown) => validatePictogram(data),
  
  // Safe validation for frontend forms
  safeValidateUser: (data: unknown) => userValidator.validateSafe(data),
  safeValidatePictogram: (data: unknown) => pictogramValidator.validateSafe(data),
};

// Example data validation middleware for Express-like frameworks
export const validationMiddleware = <T>(schema: any) => {
  return (data: unknown): T => {
    try {
      return schema.parse(data);
    } catch (error) {
      throw new Error(`Validation failed: ${error}`);
    }
  };
};

// Example: Validate array of entities
export const validateEntities = {
  users: (data: unknown) => UserSchema.array().parse(data),
  pictograms: (data: unknown) => PictogramSchema.array().parse(data),
  binders: (data: unknown) => BinderSchema.array().parse(data),
};

// Example: Database operations with validation
export const dbOperations = {
  async createUser(userData: unknown) {
    const validUser = validateUser(userData);
    // Here you would save to database
    console.log("Saving validated user:", validUser);
    return validUser;
  },
  
  async updateUser(userId: string, updateData: unknown) {
    const validUpdate = validateUserUpdate(updateData);
    // Here you would update in database
    console.log(`Updating user ${userId} with:`, validUpdate);
    return validUpdate;
  },
};
