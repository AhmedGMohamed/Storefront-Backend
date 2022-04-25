import Client from "../database";

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};

export type ProductOrder = {
  id?: string;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderStore {
  /**
   * @description Returns an array of all orders found in the database
   * @returns {Promise<Array<Order>>} Promise object containing an array with objects of type Order
   **/
  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT id, status, user_id FROM orders";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Returns one order using a supplied id
   * @param {string} id
   * @returns {Promise<Order>} Promise object containing an object of type order
   **/
  async show(id: string | number): Promise<Order> {
    try {
      const sql = "SELECT id, status, user_id FROM orders WHERE id=$1";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      [0];
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Creates an order using the supplied data
   * @param {object} o - Object of type Order
   * @returns {Promise<Order>} Promise object containing an object of type Order
   **/
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, parseInt(o.user_id)]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Updates an order using the supplied data
   * @param {object} o - Object of type Order
   * @returns {Promise<Order>} Promise object containing an object of type Order
   **/
  async update(o: Order): Promise<Order> {
    try {
      const sql = "UPDATE orders SET status = $1 WHERE id=$2 RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description deletes an order using the specified id
   * @param {(string | number)} id
   * @returns {Promise<Order>} Promise object containing an object of type Order
   **/
  async delete(id: string | number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=$1 RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Returns an array of orders made by a specific user using the user id
   * @param {(string | number)} user_id
   * @returns {Promise<Array<Order>>} Promise object containing an array with objects of type Order
   **/
  async orderUser(user_id: string | number): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const conn = await Client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Adds a product to an order with the specified quantity, and increasing the product orders counter
   * @param {object} p - Object of type ProductOrder
   * @returns {Promise<ProductOrder>} Promise object containing an object of type ProductOrder
   **/
  async addProductOrder(p: ProductOrder): Promise<ProductOrder> {
    try {
      const conn = await Client.connect();

      //Get the currenct order count for the product ordered
      const getSql = "SELECT order_counter FROM products WHERE id = $1";
      const result1 = await conn.query(getSql, [p.product_id]);
      let orderCount = parseInt(result1.rows[0].order_counter);
      orderCount += p.quantity;
      //Increase the product count by the ordered quantity of the product
      const updateSql = "UPDATE products SET order_counter = $1 WHERE id = $2";
      await conn.query(updateSql, [orderCount, p.product_id]);

      //Insert an item into the order_product row
      const insertSql =
        "INSERT INTO order_product (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
      const result2 = await conn.query(insertSql, [
        p.quantity,
        p.order_id,
        p.product_id
      ]);
      conn.release();
      return result2.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @description Returns an array of orders completed by the user with the specified id
   * @param {(string | number)} user_id - The user's id used to retrieve the orders
   * @returns {Promise<Array<Order>>} Promise object containing an array with objects of type Order
   */
  async completedOrdersByUser(user_id: string | number): Promise<Order[]> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'closed'";
      const conn = await Client.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
