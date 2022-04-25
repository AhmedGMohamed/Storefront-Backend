import { Product, ProductStore } from "../../models/product";
import insertMockupData from "../../utils/insertMockupData";
import resetTables from "../../utils/resetTables";

describe("Product model test suite", () => {
  beforeAll(async () => {
    await insertMockupData();
  });

  afterAll(async () => {
    await resetTables();
  });

  it("Should return a resolved promise with an array of products", async () => {
    const Products = new ProductStore();
    const result = JSON.stringify(await Products.index());
    expect(result).toEqual(
      '[{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"},{"id":2,"name":"Name2","price":2,"category":"Category2","order_counter":"2"}]'
    );
  });

  it("Should return a resolved promise with one product of id 1", async () => {
    const Products = new ProductStore();
    const result = JSON.stringify(await Products.show(1));
    expect(result).toEqual(
      '{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}'
    );
  });

  it("Should insert a new product with the specified values", async () => {
    const p: Product = {
      name: "Name4",
      price: "3",
      category: "Category3"
    };
    const Products = new ProductStore();
    const result = JSON.stringify(await Products.create(p));
    expect(result).toEqual(
      '{"id":3,"name":"Name4","price":3,"category":"Category3","order_counter":"0"}'
    );
  });

  it("Should edit the previous product's name into Name3", async () => {
    const p: Product = {
      id: "3",
      name: "Name3",
      price: "3",
      category: "Category3"
    };
    const Products = new ProductStore();
    const result = JSON.stringify(await Products.update(p));
    expect(result).toEqual(
      '{"id":3,"name":"Name3","price":3,"category":"Category3","order_counter":"0"}'
    );
  });

  it("Should delete the product with id 3", async () => {
    const Products = new ProductStore();
    const result = JSON.stringify(await Products.delete(3));
    expect(result).toEqual(
      '{"id":3,"name":"Name3","price":3,"category":"Category3","order_counter":"0"}'
    );
  });

  it("Should return an array containing one product with the category as Category1", async () => {
    const Products = new ProductStore();
    const result = JSON.stringify(await Products.productCategory("Category1"));
    expect(result).toEqual(
      '[{"id":1,"name":"Name1","price":1,"category":"Category1","order_counter":"1"}]'
    );
  });
});
