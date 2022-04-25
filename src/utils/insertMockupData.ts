import Client from "../database";

async function insertData() {
  const conn = await Client.connect();

  /**
   * @description Inserts sample users into the database to be used in jasmine tests
   */
  async function insertUsers() {
    for (let i = 1; i <= 3; i++) {
      const sql =
        "INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4)";
      await conn.query(sql, [
        `user${i}@example.com`,
        `First Name${i}`,
        `Last Name${i}`,
        `password`
      ]);
    }
  }

  /**
   * @description Inserts sample orders into the database to be used in jasmine tests
   */
  async function insertOrders() {
    for (let i = 1; i <= 2; i++) {
      const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2)";
      if (i % 2 === 0) {
        await conn.query(sql, [`open`, `${i}`]);
      } else {
        await conn.query(sql, ["closed", `${i}`]);
      }
    }
  }

  /**
   * @description Inserts sample products into the database to be used in jasmine tests
   */
  async function insertProducts() {
    for (let i = 1; i <= 2; i++) {
      const sql =
        "INSERT INTO products (name, price, category, order_counter) VALUES ($1, $2, $3, $4)";
      await conn.query(sql, [`Name${i}`, i, `Category${i}`, i]);
    }
  }

  await insertUsers();
  await insertOrders();
  await insertProducts();

  conn.release();
}

export default insertData;
