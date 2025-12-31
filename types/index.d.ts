// Type definitions for ext-secure-links 2.0.1
// Project: https://github.com/ashantyk/ext-secure-links
// Definitions by: Gabriel Barbieru <https://github.com/ashantyk>

/**
 * Validates a secure link.
 * @param {string} url - The URL to validate.
 * @param {string} secret - The secret key used to generate the hash.
 * @returns {boolean} True if the link is valid, false otherwise.
 */
export declare function validate(url: string, secret: string): boolean;

/**
 * Validates a secure link using raw components.
 * @param {string} pathname - The pathname of the URL.
 * @param {string} secret - The secret key used to generate the hash.
 * @param {string} hash - The hash to validate against.
 * @param {number} expire - The expiration timestamp.
 * @returns {boolean} True if the link is valid, false otherwise.
 */
export declare function validateRaw(pathname: string, secret: string, hash: string, expire: number): boolean;

/**
 * Generates a secure link.
 * @param {string} pathname - The pathname of the URL.
 * @param {string} secret - The secret key used to generate the hash.
 * @param {number} ttl - The time-to-live (TTL) in seconds.
 * @returns {string} The generated secure link.
 */
export declare function generate(pathname: string, secret: string, ttl: number): string;
