import Client from "../database";
import { Product } from "../models/product";

export class DashboardStore {
  /**
   * @description Retrieves an array of the top five ordered
   *  products from the database
   * @returns {Promise<Array<Product>>} Promise object containing an array with objects of type Product
   */
  async topFiveProducts(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products ORDER BY order_counter DESC LIMIT 5";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
