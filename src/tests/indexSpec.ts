import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Index file test Suit", () => {
  it("Should have a body with the correct response", async () => {
    const response = await request.get("/");
    expect(response.body).toBe("Hello World!");
  });

  it("Should response with a 404 status code", async () => {
    const response = await request.get("/non-existent-endpoint");
    expect(response.statusCode).toBe(404);
  });
});
