import decode from "jwt-decode";

interface TokenPayload {
  [key: string]: object | number;
}

/**
 * @description Splits the authorization header, decodes the token and returns the token payload
 * @param {string} authHeader - The authorization header to be decoded
 * @returns {Promise<TokenPayload>} Promise object containing an object of type TokenPayload
 */
function decoder(authHeader: string): TokenPayload {
  const token = authHeader.split(" ")[1];
  const decoded: TokenPayload = decode(token);
  return decoded;
}

export default decoder;
