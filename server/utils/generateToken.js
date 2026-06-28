const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for authenticated users
 * @param {string} id - User's MongoDB ObjectId
 * @param {string} role - User's role (citizen, investigator, admin)
 * @returns {string} JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

module.exports = generateToken;
