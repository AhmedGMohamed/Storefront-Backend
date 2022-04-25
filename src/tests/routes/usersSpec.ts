import app from "../../index";
import supertest from "supertest";
import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";

const request = supertest(app);

describe("Users route test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should get a list of all users", async () => {
    const response = await request.get("/users");
    expect(response.body[0]).toBeTruthy();
    expect(response.body[1]).toBeTruthy();
  });

  it("Should get the user with id 2", async () => {
    const response = await request.get("/users/2");
    expect(JSON.stringify(response.body)).toContain('"id":2');
  });

  it("Should create a user and respond with a JWT token", async () => {
    const response = await request.post("/users").send({
      email: "userTest1@example.com",
      firstname: "First Name Test1",
      lastname: "Last Name Test1",
      password: "password"
    });
    expect(JSON.stringify(response.body)).toContain(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    );
  });

  it("Should respond with a 401 status code without editing the user data when wrong password is provided", async () => {
    const response = await request
      .put("/users/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({
        id: 4,
        email: "userTest1@example.com",
        firstname: "First Name Test1",
        lastname: "Last Name Test1",
        password: "false password that won't work",
        newpassword: "new password"
      });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("Should respond with a 401 status code without editing the user data when wrong id is provided", async () => {
    const response = await request
      .put("/users/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({
        id: 450,
        email: "userTest1@example.com",
        firstname: "First Name Test1",
        lastname: "Last Name Test1",
        password: "false password that won't work",
        newpassword: "new password"
      });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("Should edit the user when the JWT is valid", async () => {
    const response = await request
      .put("/users/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JE16SmNCaGZGeUZnSU52RnZFU2xtaWV0bUVVTllIclhvVlJ6V0V1djIvaXFHTHZmZTc3eFQ2In0sImlhdCI6MTY1MDcyNDg0OH0.xarm8RzQIksPwXtzBzhB1B7A-7ZGRTxRh-wj2faQauY"
      )
      .send({
        id: 4,
        email: "userTest1@example.com",
        firstname: "First Name Test1",
        lastname: "Last Name Test1",
        password: "password",
        newpassword: "new password"
      });
    expect(response.status).toBe(200);
    expect(JSON.stringify(response.body)).toContain(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    );
  });

  it("respond with a 401 status code when the wrong password is provided without deleting the user", async () => {
    const response = await request
      .delete("/users/3")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({ password: "wrong password that won't work" });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("respond with a 401 status code when the wrong id is provided without deleting the user", async () => {
    const response = await request
      .delete("/users/420")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JHhYZ1pEVmZub0x4dVFnVzlLSHNyL3ViYU9xNjQ4cDhMS016V0FOMzVyRzQ4dm16NnVUb0hLIn0sImlhdCI6MTY1MDcxMTcxOX0.JXFGnKgu5c5sH9kRTMJJU45T44BiLfWdfeCBLOOsix0"
      )
      .send({ password: "new password" });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("Should delete the user when the JWT is valid and the user gives the correct id", async () => {
    const response = await request
      .delete("/users/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJlbWFpbCI6InVzZXJUZXN0MUBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkZpcnN0IE5hbWUgVGVzdDEiLCJsYXN0bmFtZSI6Ikxhc3QgTmFtZSBUZXN0MSIsInBhc3N3b3JkIjoiJDJiJDA0JE16SmNCaGZGeUZnSU52RnZFU2xtaWV0bUVVTllIclhvVlJ6V0V1djIvaXFHTHZmZTc3eFQ2In0sImlhdCI6MTY1MDcyNDg0OH0.xarm8RzQIksPwXtzBzhB1B7A-7ZGRTxRh-wj2faQauY"
      )
      .send({ password: "new password" });
    expect(response.status).toBe(200);
    expect(JSON.stringify(response.body)).toContain(
      '"id":4,"email":"userTest1@example.com"'
    );
  });
});
