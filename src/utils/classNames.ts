/**
 * Class name utilities
 * Helper functions for conditional class composition
 */

/**
 * Merge class names conditionally
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter((cls): cls is string => typeof cls === 'string' && cls.length > 0)
    .join(' ')
}

/**
 * Merge Tailwind classes with conditional support
 */
export function tailwind(
  base: string,
  conditional: Record<string, boolean> = {}
): string {
  const classes = [base]

  Object.entries(conditional).forEach(([cls, condition]) => {
    if (condition) {
      classes.push(cls)
    }
  })

  return classes.join(' ')
}
