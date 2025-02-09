import { Express } from "express";

import checkoutRouter from "../controller/checkout";
import itemsRouter from "../controller/item";

export default (app: Express) => {
  app.use("/api", checkoutRouter);
  app.use("/api", itemsRouter);
};
