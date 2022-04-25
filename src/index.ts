import express from "express";
import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";
import usersRouter from "./routes/users";
import dashboardRouter from "./routes/dashboard";

const app = express();
const port = 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", (_req, res) => {
  res.json(`Hello World!`);
});

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});

export default app;
