import supertest from "supertest";
import app from "../../index";
import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";

const request = supertest(app);

describe("Orders route test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should respond with a JSON containing an array of orders & HTTP status code 200", async () => {
    const response = await request
      .get("/orders")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      );
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toEqual(
      '[{"id":1,"status":"closed","user_id":"1"},{"id":2,"status":"open","user_id":"2"}]'
    );
  });

  it("Should respond with a JSON containing an order with id 1 & HTTP status code 200 ", async () => {
    const response = await request
      .get("/orders/1")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      );
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":1,"status":"closed","user_id":"1"}'
    );
  });

  it("Should create an order and respond with a JSON containing an order with id 3, Status4 & HTTP status code 200 ", async () => {
    const response = await request
      .post("/orders")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({ status: "Status4", user_id: "3" });
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":3,"status":"Status4","user_id":"3"}'
    );
  });

  it("Should edit the order with id 3 and respond with a JSON containing an order with id 3, Status3, & HTTP status code 200", async () => {
    const response = await request
      .put("/orders/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({ status: "Status3", user_id: "3" });
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":3,"status":"Status3","user_id":"3"}'
    );
  });

  it("Should delete the order with id 3 and respond with a JSON containing the delted order with an HTTP status code 200", async () => {
    const response = await request
      .delete("/orders/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      );
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":3,"status":"Status3","user_id":"3"}'
    );
  });

  it("Should add a new item to the order_product table", async () => {
    const response = await request
      .post("/orders/product/1")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({ quantity: 5, order_id: "2" });
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toContain(
      '"order_id":"2","product_id":"1"'
    );
  });
});
