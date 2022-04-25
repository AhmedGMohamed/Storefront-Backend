import { Order, ProductOrder, OrderStore } from "../../models/order";
import Client from "../../database";
import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";

describe("Order model test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should return a resolved promise with an array of orders", async () => {
    const Orders = new OrderStore();
    const result = JSON.stringify(await Orders.index());
    expect(result).toEqual(
      '[{"id":1,"status":"closed","user_id":"1"},{"id":2,"status":"open","user_id":"2"}]'
    );
  });

  it("Should return a resolved promise with one order of id 1", async () => {
    const Orders = new OrderStore();
    const result = JSON.stringify(await Orders.show(1));
    expect(result).toEqual('{"id":1,"status":"closed","user_id":"1"}');
  });

  it("Should insert a new order that has the specified values", async () => {
    const o: Order = {
      status: "Status4",
      user_id: "3"
    };
    const Orders = new OrderStore();
    const result = JSON.stringify(await Orders.create(o));
    expect(result).toEqual('{"id":3,"status":"Status4","user_id":"3"}');
  });

  it("Should edit the previous order's status into Status3", async () => {
    const o: Order = {
      id: "3",
      status: "Status3",
      user_id: "3"
    };
    const Orders = new OrderStore();
    const result = JSON.stringify(await Orders.update(o));
    expect(result).toEqual('{"id":3,"status":"Status3","user_id":"3"}');
  });

  it("Should delete the order with id 3", async () => {
    const Orders = new OrderStore();
    const result = JSON.stringify(await Orders.delete(3));
    expect(result).toEqual('{"id":3,"status":"Status3","user_id":"3"}');
  });

  it("Should return an array with one order using the user_id of 2", async () => {
    const Orders = new OrderStore();
    const result = await Orders.orderUser("2");
    expect(JSON.stringify(result)).toContain(
      '[{"id":2,"status":"open","user_id":"2"}]'
    );
  });

  it("Should create an item in the order_product table and increase the order_counter count", async () => {
    const order: ProductOrder = {
      quantity: 5,
      product_id: "1",
      order_id: "1"
    };
    const sql = "SELECT order_counter FROM products WHERE id = $1";
    const conn = await Client.connect();
    const Orders = new OrderStore();
    const result = await Orders.addProductOrder(order);
    const count = parseInt(
      (await conn.query(sql, [order.order_id])).rows[0].order_counter
    );
    conn.release();
    expect(JSON.stringify(result)).toContain('"order_id":"1","product_id":"1"');
    expect(count).toEqual(6);
  });

  it("Should return an array with one order where the user id = 1 and the status of the order is closed", async () => {
    const Orders = new OrderStore();
    const result = await Orders.completedOrdersByUser(1);
    expect(JSON.stringify(result)).toEqual(
      '[{"id":1,"status":"closed","user_id":"1"}]'
    );
  });
});
