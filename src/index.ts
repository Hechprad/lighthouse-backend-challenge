import express, { Request, Response } from "express";
import checkoutRouter from "./routes/checkout";

const app = express();
app.use(express.json());

app.use("/api", checkoutRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Lighthouse Backend Challenge API is running!");
});

const isTestEnv = process.env.NODE_ENV === "test";

const PORT = isTestEnv ? 0 : process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, server };
