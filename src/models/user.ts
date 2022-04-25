import Client from "../database";
import hasher from "../utils/hasher";
import passwordChecker from "../utils/checkPassword";

export type User = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  newPassword?: string;
};

export class UserStore {
  /**
   * @description Returns an array of all users found in the database
   * @returns {Promise<Array<User>>} Promise object containing an array with objects of type User
   **/
  async index(): Promise<User[]> {
    const conn = await Client.connect();
    const sql = "SELECT id, email, firstName, lastName, password FROM users";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  /**
   * @description Creates a product using the supplied data
   * @param {(string | number)} id - the id of the user to retrieve from the database
   * @returns {Promise<User>} Promise object containing an object of type User
   **/
  async show(id: string | number): Promise<User> {
    const conn = await Client.connect();
    const sql =
      "SELECT id, email, firstName, lastName, password FROM users WHERE id = $1";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }

  /**
   * @description Creates a user using the supplied data
   * @param {object} u - Object of type User
   * @returns {Promise<User>} Promise object containing an object of type User
   **/
  async create(u: User): Promise<User> {
    const conn = await Client.connect();
    const sql =
      "INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING id, email, firstName, lastName, password";
    const hash = hasher(u.password);
    const result = await conn.query(sql, [
      u.email,
      u.firstName,
      u.lastName,
      hash
    ]);
    conn.release();
    return result.rows[0];
  }

  /**
   * @description Updates a user using the supplied data
   * @param {object} u - Object of type User
   * @returns {Promise<User>} Promise object containing an object of type User
   **/
  async update(u: User): Promise<User> {
    const conn = await Client.connect();
    const sql =
      "UPDATE users SET email = $1, firstName = $2, lastName = $3, password = $4 WHERE id = $5 RETURNING id, email, firstName, lastName, password";
    const hash = hasher(u.newPassword as string);
    const result = await conn.query(sql, [
      u.email,
      u.firstName,
      u.lastName,
      hash,
      u.id
    ]);
    conn.release();
    return result.rows[0];
  }

  /**
   * @description Deletes a user using the supplied data
   * @param {(string | number)} id - The id of the user to be deleted
   * @returns {Promise<User>} Promise object containing an object of type User
   **/
  async delete(id: string | number): Promise<User> {
    const conn = await Client.connect();
    const sql =
      "DELETE FROM users WHERE id = $1 RETURNING id, email, firstName, lastName, password";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }

  /**
   * @description Authenticates a user using the id of the user and the password by checking them against the database
   * @param {(string | number)} id - The id of the user to authenticate
   * @param {string} password - The password of the user to check against
   * @returns {Promise<(User | null)>} Promise object containing an object of type User or null if the user is not authenticated
   **/
  async authenticate(
    id: string | number,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT id, email, firstName, lastName, password FROM users WHERE id = $1";
      const result = await conn.query(sql, [id]);
      if (result.rows.length) {
        const user = result.rows[0];
        //Checks if the password supplied is the same as the password in the database and returns the user
        if (await passwordChecker(id, password)) {
          return user;
        }
      }
      //return null if the password check failed
      return null;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
