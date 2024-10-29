
import jwt ,{ JwtPayload } from 'jsonwebtoken';

import config from '../app/config/config';

/**
 * Verifies a JWT token with a given secret.
 * 
 * @param {string} token - The JWT token to verify.
 * @param {boolean} isRefreshToken - Indicates if this is a refresh token.
 * @returns {JwtPayload} - The decoded token payload if valid.
 * @throws {Error} - Throws an authorization error if the token is invalid or expired.
 */
export const verifyToken = (
  token: string,
  isRefreshToken: boolean = false
): JwtPayload => {
  try {
    // Choose the correct secret based on the token type
    const secret = isRefreshToken ? config.jwt.refreshSecret : config.jwt.accessSecret;
    
    // Verify the token using the appropriate secret
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    // Throw an error if token verification fails
    throw new Error("You are not authorized!");
  }
};
