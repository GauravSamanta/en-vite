import pkg from "body-parser";
const { json, urlencoded } = pkg;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Access-Control-Allow-Credentials",
        ],
        credentials: true,
      })
    )
    .get("/", (_, res) => {
      return res.json({ active: true });
    });

  app.use("/api/users", userRoutes);

  return app;
};
