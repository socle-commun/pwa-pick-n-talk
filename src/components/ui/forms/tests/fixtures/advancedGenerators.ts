import { faker } from "@faker-js/faker";

// ============================================================================
// EDGE CASE GENERATORS
// ============================================================================

export const generateEdgeCaseStrings = () => [
  "", // Empty
  " ", // Single space
  "   ", // Multiple spaces
  "\n", // Newline
  "\t", // Tab
  "a", // Single character
  "a".repeat(1000), // Very long string
  "🚀💻🎯", // Emojis only
  "Hello 🌍 World", // Mixed content
  "  leading and trailing spaces  ",
  "Special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?",
  "Unicode: àáâãäåæçèéêëìíîïðñòóôõö",
  "Numbers: 1234567890",
  "Mixed: Hello123!@#",
];

export const generateEdgeCaseNumbers = () => [
  0, // Zero
  -1, // Negative
  1, // Positive
  0.1, // Decimal
  -0.1, // Negative decimal
  Number.MAX_SAFE_INTEGER, // Very large
  Number.MIN_SAFE_INTEGER, // Very small
  Number.POSITIVE_INFINITY, // Infinity
  Number.NEGATIVE_INFINITY, // Negative infinity
  Number.NaN, // NaN
];

export const generateEdgeCaseDates = () => [
  new Date("1900-01-01"), // Very old
  new Date("2100-12-31"), // Far future
  new Date(0), // Unix epoch
  new Date("invalid"), // Invalid date
  new Date(), // Current date
  faker.date.past({ years: 100 }), // Random old date
  faker.date.future({ years: 100 }), // Random future date
];

// ============================================================================
// BUSINESS DATA GENERATORS
// ============================================================================

export const generateProduct = () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  category: faker.commerce.department(),
  brand: faker.company.name(),
  sku: faker.string.alphanumeric(8).toUpperCase(),
  inStock: faker.datatype.boolean(),
  quantity: faker.number.int({ min: 0, max: 100 }),
  images: Array.from({ length: 3 }, () => faker.image.url()),
  tags: faker.helpers.arrayElements(
    ["popular", "new", "sale", "limited", "exclusive"],
    { min: 1, max: 3 }
  ),
  createdAt: faker.date.past(),
});

export const generateOrder = () => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  status: faker.helpers.arrayElement([
    "pending", "processing", "shipped", "delivered", "cancelled"
  ]),
  total: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
  orderDate: faker.date.past(),
  estimatedDelivery: faker.date.future(),
});

// ============================================================================
// ADVANCED FORM GENERATORS
// ============================================================================

export const generateRegisterForm = () => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12, memorable: true, prefix: "Aa1!" }),
  confirmPassword: "", // Will be set to match password
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  acceptTerms: true,
  newsletter: faker.datatype.boolean(),
});

export const generateProfileForm = () => ({
  ...generateRegisterForm(),
  currentPassword: faker.internet.password({ length: 12 }),
  newPassword: faker.internet.password({ length: 12 }),
  bio: faker.lorem.paragraph(),
  website: faker.internet.url(),
  location: faker.location.city(),
  birthDate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const generateRandomEnum = <T extends Record<string, string>>(
  enumObject: T
): T[keyof T] => {
  const values = Object.values(enumObject) as T[keyof T][];
  return faker.helpers.arrayElement(values);
};

export const generatePartialObject = <T extends Record<string, unknown>>(
  fullObject: T,
  fieldsToInclude?: (keyof T)[]
): Partial<T> => {
  if (fieldsToInclude) {
    return Object.fromEntries(
      fieldsToInclude.map(key => [key, fullObject[key]])
    ) as Partial<T>;
  }
  
  const keys = Object.keys(fullObject) as (keyof T)[];
  const selectedKeys = faker.helpers.arrayElements(keys, { min: 1, max: keys.length });
  
  return Object.fromEntries(
    selectedKeys.map(key => [key, fullObject[key]])
  ) as Partial<T>;
};
