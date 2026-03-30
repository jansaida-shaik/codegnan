/**
 * Generates a unique 18-digit ID as a String.
 * This simulates the Snowflake ID format requested by the user.
 * Using String instead of BigInt for IDs resolves serialization 
 * and Prisma Studio issues while keeping the numeric look.
 */
export function generateId(): string {
  // Start with the specific prefix base if requested, or a large random base
  const base = 878600000000000000n;
  
  // Add a 14-digit random number to complete the 18 digits
  const randomPart = BigInt(Math.floor(Math.random() * 99999999999999));
  
  const id = base + randomPart;
  return id.toString();
}
