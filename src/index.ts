import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.domain,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

routes(app);

const isTestEnv = process.env.NODE_ENV === "test";

const PORT = isTestEnv ? 0 : process.env.PORT || 3000;
const server = !isTestEnv
  ? app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
  : null;

export { app, server };
