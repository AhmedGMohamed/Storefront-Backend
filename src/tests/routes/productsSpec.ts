import app from "../../index";
import supertest from "supertest";
import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";

const request = supertest(app);

describe("Products route test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should respond with a JSON containing and array of products", async () => {
    const response = await request.get("/products");
    expect(JSON.stringify(response.body)).toEqual(
      '[{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"},{"id":2,"name":"Name2","price":2,"category":"Category2","order_counter":"2"}]'
    );
  });

  it("Should respond with a JSON containing one product with id 1", async () => {
    const response = await request.get("/products/1");
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}'
    );
  });

  it("Should create a product and respond with a JSON containing a product with id 3", async () => {
    const response = await request
      .post("/products")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({
        name: "Name4",
        price: "3",
        category: "Category3"
      });
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":3,"name":"Name4","price":3,"category":"Category3","order_counter":"0"}'
    );
  });

  it("Should edit the product with id 3 and respond with a JSON containing a product with id 3", async () => {
    const response = await request
      .put("/products/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({ name: "Name3", price: "3", category: "Category3" });
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":3,"name":"Name3","price":3,"category":"Category3","order_counter":"0"}'
    );
  });

  it("Should delete the product with id 3 and respond with a JSON containing the deleted product", async () => {
    const response = await request
      .delete("/products/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      );
    expect(JSON.stringify(response.body)).toEqual(
      '{"id":3,"name":"Name3","price":3,"category":"Category3","order_counter":"0"}'
    );
  });

  it("Should respond with an array containing one order with the category as Category1", async () => {
    const response = await request.get("/products/category/Category1");
    expect(response.statusCode).toEqual(200);
    expect(JSON.stringify(response.body)).toEqual(
      '[{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}]'
    );
  });
});
