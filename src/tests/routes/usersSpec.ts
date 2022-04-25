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
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .get("/users")
      .set(
        "Authorization",
        `Bearer ${token}`
      );
    expect(response.body[0]).toBeTruthy();
    expect(response.body[1]).toBeTruthy();
  });

  it("Should get the user with id 2", async () => {
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .get("/users/2")
      .set(
        "Authorization",
        `Bearer ${token}`
      );
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
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .put("/users/7")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        email: "userTest1@example.com",
        firstname: "First Name Test1",
        lastname: "Last Name Test1",
        password: "wrong password",
        newpassword: "new password"
      });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("Should respond with a 401 status code without editing the user data when wrong id is provided", async () => {
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .put("/users/420")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        email: "userTest1@example.com",
        firstname: "First Name Test1",
        lastname: "Last Name Test1",
        password: "password",
        newpassword: "new password"
      });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("Should edit the user when the JWT is valid", async () => {
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .put("/users/9")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
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
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .delete("/users/10")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({ password: "wrong password that won't work" });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("respond with a 401 status code when the wrong id is provided without deleting the user", async () => {
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .delete("/users/420")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({ password: "password" });
    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body)).toContain("Invalid");
  });

  it("Should delete the user when the JWT is valid and the user gives the correct id", async () => {
    const token = (
      await request.post("/users").send({
        email: "random@example.com",
        firstname: "random",
        lastname: "name",
        password: "password"
      })
    ).body.token;
    const response = await request
      .delete("/users/12")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({ password: "password" });
    expect(response.status).toBe(200);
    expect(JSON.stringify(response.body)).toContain(
      '"id":12,"email":"random@example.com"'
    );
  });
});
