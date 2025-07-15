import { faker } from "@faker-js/faker";

// Configuration de Faker pour des résultats reproductibles
faker.seed(123);

// ============================================================================
// USER DATA GENERATORS
// ============================================================================

export const generateValidUser = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  username: faker.internet.username(),
  password: faker.internet.password({ length: 12, memorable: true, prefix: "Aa1!" }),
  age: faker.number.int({ min: 18, max: 65 }),
  phone: faker.phone.number(),
  bio: faker.lorem.paragraph(),
  avatar: faker.image.avatar(),
  website: faker.internet.url(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
  },
  preferences: {
    language: faker.helpers.arrayElement(["en-US", "fr-FR", "es-ES"]),
    theme: faker.helpers.arrayElement(["light", "dark", "auto"]),
    notifications: faker.datatype.boolean(),
  },
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const generateUserArray = (count: number = 5) =>
  Array.from({ length: count }, () => generateValidUser());

// ============================================================================
// EMAIL GENERATORS (keeping your existing logic)
// ============================================================================

// Générateurs d'emails valides et invalides
export const generateValidEmails = (count = 6): string[] =>
  Array.from({ length: count }, () => faker.internet.email());

export const generateInvalidEmails = (): string[] => [
  "invalid-email",
  "missing@",
  "@missing-local.com",
  `spaces in@${faker.internet.domainName()}`,
  `double@@${faker.internet.domainName()}`,
  `.starting-dot@${faker.internet.domainName()}`,
  `ending-dot.@${faker.internet.domainName()}`,
];

// Messages d'erreur attendus
export const validationMessages = {
  email: {
    invalid: "Invalid email format",
    empty: "This field cannot be empty",
  },
  required: {
    empty: "This field cannot be empty",
  },
  string: {
    tooShort: (min: number) => `Text too short (minimum ${min} characters)`,
    tooLong: (max: number) => `Text too long (maximum ${max} characters)`,
  },
  number: {
    tooSmall: (min: number) => `Number too small (minimum ${min})`,
    tooBig: (max: number) => `Number too big (maximum ${max})`,
  },
} as const;

// Générateurs de données de test pour différents scénarios
export const generateTestData = () => ({
  validUser: {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password({ length: 12 }),
    age: faker.number.int({ min: 18, max: 65 }),
    bio: faker.person.bio(),
  },
  invalidUser: {
    email: "invalid-email",
    name: "",
    password: faker.internet.password({ length: 3 }), // Too short
    age: faker.number.int({ min: 10, max: 17 }), // Too young
    bio: faker.lorem.paragraphs(10), // Too long
  },
  edgeCases: {
    minAge: 18,
    maxAge: 120,
    minPasswordLength: 8,
    maxBioLength: 500,
    minValidAge: faker.number.int({ min: 18, max: 25 }),
    maxValidAge: faker.number.int({ min: 115, max: 120 }),
    shortPassword: faker.internet.password({ length: 7 }),
    longBio: faker.lorem.paragraphs(20),
  },
});

// Générateurs spécialisés pour les tests
export const testFactories = {
  email: {
    valid: () => faker.internet.email(),
    invalid: () => faker.helpers.arrayElement(generateInvalidEmails()),
  },
  name: {
    valid: () => faker.person.fullName(),
    empty: () => "",
    long: () => faker.lorem.words(50),
  },
  password: {
    valid: () => faker.internet.password({ length: 12 }),
    short: () => faker.internet.password({ length: 3 }),
    long: () => faker.internet.password({ length: 100 }),
  },
  age: {
    valid: () => faker.number.int({ min: 18, max: 65 }),
    tooYoung: () => faker.number.int({ min: 1, max: 17 }),
    tooOld: () => faker.number.int({ min: 121, max: 150 }),
  },
  bio: {
    valid: () => faker.person.bio(),
    empty: () => "",
    tooLong: () => faker.lorem.paragraphs(20),
  },
};
