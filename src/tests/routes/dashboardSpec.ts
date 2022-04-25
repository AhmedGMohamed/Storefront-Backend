import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";
import app from "../../index";
import supertest from "supertest";

const request = supertest(app);

describe("Dashboard route test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should response with an array containg 2 orders with descending order", async () => {
    const response = await request.get("/dashboard/top-five");
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toEqual(
      '[{"id":2,"name":"Name2","price":2,"category":"Category2","order_counter":"2"},{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}]'
    );
  });
});
