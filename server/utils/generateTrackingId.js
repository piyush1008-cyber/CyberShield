const crypto = require('crypto');

/**
 * Generate a unique tracking ID for complaints
 * Format: CS-YYYY-XXXXXX
 * Example: CS-2026-A7B3K9
 *
 * @returns {string} Unique tracking ID
 */
const generateTrackingId = () => {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  // Generate 6 random alphanumeric characters
  const randomBytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    code += chars[randomBytes[i] % chars.length];
  }

  return `CS-${year}-${code}`;
};

module.exports = generateTrackingId;
