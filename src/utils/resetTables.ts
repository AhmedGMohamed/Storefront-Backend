import Client from "../database";

/**
 * @description Resets all of the database tables to use the database again in other test suites
 */
async function resetTables() {
  const conn = await Client.connect();

  /**
   * @description Drops the order_product table to wipe the data inside
   */
  async function dropOrderProduct() {
    const sql = "DROP TABLE order_product";
    await conn.query(sql);
  }

  /**
   * @description Drops the orders table to wipe the data inside
   */
  async function dropOrders() {
    const sql = "DROP TABLE orders";
    await conn.query(sql);
  }

  /**
   * @description Drops the products table to wipe the data inside
   */
  async function dropProducts() {
    const conn = await Client.connect();
    const sql = "DROP TABLE products";
    await conn.query(sql);
    conn.release();
  }

  /**
   * @description Drops the users table to wipe the data inside
   */
  async function dropUsers() {
    const sql = "DROP TABLE users";
    await conn.query(sql);
  }

  /**
   * @description Creates a new users table
   */
  async function createUsers() {
    const sql =
      "CREATE TABLE users (id SERIAL PRIMARY KEY,email VARCHAR(255) NOT NULL,firstName VARCHAR(32) NOT NULL,lastName VARCHAR(32) NOT NULL,password varchar(512) NOT NULL)";
    await conn.query(sql);
  }

  /**
   * @description Creates a new products table
   */
  async function createProducts() {
    const conn = await Client.connect();
    const sql =
      "CREATE TABLE products (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,price integer NOT NULL,category VARCHAR(128) NOT NULL,order_counter BIGINT DEFAULT 0)";
    await conn.query(sql);
    conn.release();
  }

  /**
   * @description Creates a new orders table
   */
  async function createOrders() {
    const sql =
      "CREATE TABLE orders (id SERIAL PRIMARY KEY,status VARCHAR(64) NOT NULL,user_id BIGINT NOT NULL REFERENCES users(id))";
    await conn.query(sql);
  }

  /**
   * @description Creates a new order_product table
   */
  async function createOrderProduct() {
    const sql =
      "CREATE TABLE order_product (id SERIAL PRIMARY KEY,quantity INTEGER NOT NULL,order_id BIGINT NOT NULL REFERENCES orders(id),product_id BIGINT NOT NULL REFERENCES products(id))";
    await conn.query(sql);
  }
  await dropOrderProduct();
  await dropOrders();
  await dropProducts();
  await dropUsers();

  await createUsers();
  await createProducts();
  await createOrders();
  await createOrderProduct();

  conn.release();
}

export default resetTables;
