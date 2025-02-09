import express from "express";

import checkoutRouter from "./controller/checkout";
import itemRouter from "./controller/item";

const app = express();
app.use(express.json());

app.use("/api", checkoutRouter);
app.use("/api", itemRouter);

const isTestEnv = process.env.NODE_ENV === "test";

const PORT = isTestEnv ? 0 : process.env.PORT || 3000;
const server = !isTestEnv
  ? app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
  : null;

export { app, server };
