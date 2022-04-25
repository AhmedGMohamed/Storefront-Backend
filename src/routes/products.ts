import { Product, ProductStore } from "../models/product";
import authenticate from "../middlewares/verifyAuthToken";
import express from "express";

const router = express.Router();
const Products = new ProductStore();

router.get("/", async (_req: express.Request, res: express.Response) => {
  // Gets an array of all products from the database
  try {
    const result = await Products.index();
    res.json(result);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  // Gets a product using the id supplied in the request parameters
  try {
    const id = req.params.id;
    const result = await Products.show(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(`${error}`);
  }
});

router.get(
  "/category/:category",
  async (req: express.Request, res: express.Response) => {
    // Gets an array of products having the category specified in the request parameters
    try {
      const category = req.params.category;
      const result = await Products.productCategory(category);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.post(
  "/",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Creates an order using the data supplied in the request body
    try {
      const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
      };
      const result = await Products.create(product);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.put(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Edits the product with id supplied in the request parameters using the data provided in the request body
    try {
      const product: Product = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
      };
      const result = await Products.update(product);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Deletes a product using the id supplied in the request parameters
    try {
      const id = req.params.id;
      const result = await Products.delete(id);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

export default router;
