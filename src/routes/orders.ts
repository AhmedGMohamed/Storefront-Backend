import express from "express";
import { Order, ProductOrder, OrderStore } from "../models/order";
import authenticate from "../middlewares/verifyAuthToken";

const router = express.Router();
const Orders = new OrderStore();

router.get(
  "/",
  authenticate,
  async (_req: express.Request, res: express.Response) => {
    // Gets an array of all orders in the database and returns them to the client
    try {
      const result = await Orders.index();
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.get(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Gets an order object from the database using the supplied id
    try {
      const id = req.params.id;
      const result = await Orders.show(id);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

router.get(
  "/user/:user_id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Gets an array of closed orders made by a user using the given id in the request parameters
    try {
      const user_id = req.params.user_id;
      const result = await Orders.orderUser(user_id);
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
    // Creates an order using the data in the request body
    try {
      const order: Order = {
        status: req.body.status,
        user_id: req.body.user_id
      };
      const result = await Orders.create(order);
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
    // Edits the order with the id in the request parameters and data in the request body
    try {
      const order: Order = {
        id: req.params.id,
        status: req.body.status,
        user_id: req.body.user_id
      };
      const result = await Orders.update(order);
      res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Deletes the order with the id in the request parameters
    const id = req.params.id;
    const result = await Orders.delete(id);
    res.json(result);
  }
);

router.post(
  "/:order_id/product",
  authenticate,
  async (req: express.Request, res: express.Response) => {
    // Adds a product to an existing open order
    try {
      const productOrder: ProductOrder = {
        quantity: parseInt(req.body.quantity),
        order_id: req.params.order_id,
        product_id: req.body.product_id
      };
      const orderStatus = (await Orders.show(productOrder.order_id)).status;
      if (orderStatus != "open") {
        throw new Error(
          `Could not add product ${productOrder.product_id} to order ${productOrder.order_id} because order status is ${orderStatus}`
        );
      }
      const result = await Orders.addProductOrder(productOrder);
      res.json(result);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

export default router;
