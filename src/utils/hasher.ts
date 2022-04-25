import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALTROUNDS as string;

/**
 * @description Encrypts and hashes the password supplied using bcrypt
 * @param {string} password - The passwort to encrypt using bcrypt
 * @returns {string} The encrypted(hashed) password
 */
function hash(password: string): string {
  const hashedPassword = bcrypt.hashSync(
    password + pepper,
    parseInt(saltRounds)
  );
  return hashedPassword;
}

export default hash;
