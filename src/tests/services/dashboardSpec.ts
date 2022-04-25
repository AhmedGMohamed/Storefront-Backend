import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";
import { DashboardStore } from "../../services/dashboard";
describe("Dashboard service test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should return an array containg 2 orders with descending order", async () => {
    const Store = new DashboardStore();
    const result = await Store.topFiveProducts();
    expect(JSON.stringify(result)).toEqual(
      '[{"id":2,"name":"Name2","price":2,"category":"Category2","order_counter":"2"},{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}]'
    );
  });
});
