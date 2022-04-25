import { User, UserStore } from "../../models/user";
import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";

describe("User model test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should get a list of all users", async () => {
    const Users = new UserStore();
    const result = await Users.index();
    expect(result[0]).toBeTruthy();
    expect(result[1]).toBeTruthy();
  });

  it("Should get the user with id 2", async () => {
    const Users = new UserStore();
    const result = await Users.show("2");
    expect(JSON.stringify(result)).toContain('"id":2');
  });

  it("Should create a new user and hash the password supplied", async () => {
    const Users = new UserStore();
    const user: User = {
      email: "userTest1@example.com",
      firstName: "First Name Test1",
      lastName: "Last Name Test1",
      password: "password"
    };
    const result = await Users.create(user);
    expect(JSON.stringify(result)).toContain('"firstname":"First Name Test1"');
    expect(JSON.stringify(result.password)).toContain("$2b$");
  });

  it("Should update the user with id 2 and hash the password", async () => {
    const Users = new UserStore();
    const user: User = {
      id: "2",
      email: "userTest2@example.com",
      firstName: "First Name Test2",
      lastName: "Last Name Test2",
      password: "password",
      newPassword: "newpassword"
    };
    const result = await Users.update(user);
    expect(JSON.stringify(result)).toContain('"firstname":"First Name Test2"');
    expect(JSON.stringify(result.password)).toContain("$2b$");
  });

  it("Should delete the user with id 3", async () => {
    const Users = new UserStore();
    const result = await Users.delete("3");
    expect(JSON.stringify(result)).toContain('"id":3');
  });

  it("Should authenticate the supplied user and return the user data", async () => {
    const Users = new UserStore();
    const result = await Users.authenticate("2", "newpassword");
    expect(JSON.stringify(result)).toContain(
      '"id":2,"email":"userTest2@example.com"'
    );
  });

  it("Should return null when the wrong user password is given", async () => {
    const Users = new UserStore();
    const result = await Users.authenticate("2", "randomPassword");
    expect(result).toBe(null);
  });
});
