import bcrypt from "bcrypt";
import { UserStore } from "../models/user";

const pepper = process.env.BCRYPT_PASSWORD as string;

/**
 * @description Checks the password supplied against the hashed password found in the database
 * @param {(string | number)} id - The id of the user to check
 * @param {string} userPassword - The password of the user to compare against the hashed password in the database
 * @returns {Promise<boolean>} promise object containing a boolean value indicating whether the password matches the hashed password
 */
async function checker(
  id: string | number,
  userPassword: string
): Promise<boolean> {
  const Users = new UserStore();
  const databasePassword = (await Users.show(id)).password;
  const result = bcrypt.compareSync(userPassword + pepper, databasePassword);
  return result;
}

export default checker;
