/**
 * Temporary cn utility function for className concatenation during MUI migration
 * This is a simple replacement that will be removed once all components are migrated
 */

type ClassValue = string | string[] | undefined | null | false;

export default function cn(...classes: ClassValue[]): string {
  const flatten = (items: ClassValue[]): string[] => {
    const result: string[] = [];
    for (const item of items) {
      if (Array.isArray(item)) {
        result.push(...flatten(item));
      } else if (typeof item === "string") {
        result.push(item);
      }
    }
    return result;
  };

  return flatten(classes)
    .filter(Boolean)
    .join(" ")
    .trim();
}
