/**
 * Lightweight class name concatenation helper.
 * Filters out falsy values (null, undefined, false, empty string).
 */
export function cn(
  ...classes: (string | undefined | null | false | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}
