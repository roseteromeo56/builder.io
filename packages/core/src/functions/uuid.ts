import { randomUUID } from 'crypto';

/**
 * Generate a cryptographically secure UUID (v4).
 */
export function uuidv4() {
  return randomUUID();
}

/**
 * Slightly cleaner and smaller UUIDs
 */
export function uuid() {
  return uuidv4().replace(/-/g, '');
}
