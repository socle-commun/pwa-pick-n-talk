import { faker } from "@faker-js/faker";

// ============================================================================
// COMPLEX UTILITY FUNCTIONS
// ============================================================================

export const generateWithMissingFields = <T extends Record<string, unknown>>(
  generator: () => T,
  fieldsToRemove: (keyof T)[]
): Partial<T> => {
  const fullObject = generator();
  const result = { ...fullObject };
  
  fieldsToRemove.forEach(field => {
    delete result[field];
  });
  
  return result;
};

export const generateArrayWithVariations = <T>(
  generator: () => T,
  count: number = 5,
  variations?: Array<(item: T) => T>
): T[] => {
  const items = Array.from({ length: count }, generator);
  
  if (variations) {
    return items.map((item, index) => {
      const variation = variations[index % variations.length];
      return variation ? variation(item) : item;
    });
  }
  
  return items;
};

export const generateFieldCombinations = <T extends Record<string, unknown>>(
  baseObject: T,
  fieldVariations: Partial<Record<keyof T, unknown[]>>
): T[] => {
  const combinations: T[] = [];
  const fields = Object.keys(fieldVariations) as (keyof T)[];
  
  // Generate all possible combinations
  const generateCombination = (index: number, current: T): void => {
    if (index >= fields.length) {
      combinations.push({ ...current });
      return;
    }
    
    const field = fields[index];
    const values = fieldVariations[field] || [];
    
    values.forEach(value => {
      generateCombination(index + 1, { ...current, [field]: value });
    });
  };
  
  generateCombination(0, baseObject);
  return combinations.slice(0, 50); // Limit to prevent explosion
};

export const generateRealisticTestScenarios = <T>(
  generator: () => T,
  scenarios: Array<{ name: string; modifier: (item: T) => T }>
) => {
  return scenarios.reduce((acc, scenario) => {
    acc[scenario.name] = scenario.modifier(generator());
    return acc;
  }, {} as Record<string, T>);
};

// ============================================================================
// SEED MANAGEMENT UTILITIES
// ============================================================================

export const generateWithSeed = <T>(seed: number, generator: () => T): T => {
  const originalSeed = faker.seed();
  faker.seed(seed);
  const result = generator();
  faker.seed(originalSeed || []);
  return result;
};

export const createSeededGenerator = <T>(baseGenerator: () => T, seed: number) => {
  return () => generateWithSeed(seed, baseGenerator);
};

export const generateConsistentTestData = <T>(
  generator: () => T,
  identifier: string
): T => {
  // Create a numeric seed from string for consistency
  const seed = identifier.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return generateWithSeed(seed, generator);
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const createFieldValidator = <T>(
  validData: T,
  invalidVariations: Partial<Record<keyof T, unknown[]>>
) => {
  return {
    valid: validData,
    invalid: Object.entries(invalidVariations).reduce((acc, [field, values]) => {
      acc[field as keyof T] = (values as unknown[]).map(value => ({
        ...validData,
        [field]: value,
      }));
      return acc;
    }, {} as Record<keyof T, T[]>),
  };
};
