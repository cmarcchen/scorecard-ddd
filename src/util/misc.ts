/**
 * Miscellaneous shared functions go here.
 */

/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

// Add one month to a string
export function addOneMonth(month: string): string {
  const date = new Date(month + '-01');
  date.setMonth(date.getMonth() + 1);
  const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const newYear = date.getFullYear().toString();
  return `${newYear}-${newMonth}`;
}
