import Client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: string;
  category: string;
};

export class ProductStore {
  /**
   * @description Returns an array of all products found in the database
   * @returns {Promise<Array<Product>>} Promise object containing an array with objects of type Product
   */
  async index(): Promise<Product[]> {
    try {
      const sql =
        "SELECT id, name, price, category, order_counter FROM products";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Returns one product using a supplied id
   * @param {(string | number)} id - The id of the product to retrieve from the database
   * @returns {Promise<Product>} Promise object containing an object of type Product
   */
  async show(id: string | number): Promise<Product> {
    try {
      const sql =
        "SELECT id, name, price, category, order_counter FROM products WHERE id=$1";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Creates a product using the supplied data
   * @param {object} p - Object of type Product
   * @returns {Promise<Product>} Promise object containing an object of type Product
   **/
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        p.name,
        parseInt(p.price),
        p.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Updates a product using the supplied data
   * @param {object} p - Object of type Product
   * @returns {Promise<Product>} Promise object containing an object of type Product
   **/
  async update(p: Product): Promise<Product> {
    try {
      const sql =
        "UPDATE products SET name= $1, price = $2, category = $3 WHERE id = $4 RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        p.name,
        parseInt(p.price),
        p.category,
        p.id
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Deletes a product using the specified id
   * @param {(string|number)} id - The product id to be deleted
   * @returns {Promise<Product>} Promise object containing an object of type Product
   **/
  async delete(id: string | number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Finds all products with a matching category
   * @param {string} category - Category type to search against
   * @returns {Promise<Array<Product>>} Promise object containing an array with objects of type Product
   **/
  async productCategory(category: string): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products WHERE category = $1";
      const conn = await Client.connect();
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
