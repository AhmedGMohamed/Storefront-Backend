import { DashboardStore } from "../services/dashboard";
import express from "express";

const router = express.Router();
const Dashboard = new DashboardStore();

router.get(
  "/top-five",
  async (_req: express.Request, res: express.Response) => {
    try {
      /**
       * Gets the response from the products model file and
       * responds to the user with the result
       */
      const response = await Dashboard.topFiveProducts();
      res.json(response);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  }
);

export default router;
