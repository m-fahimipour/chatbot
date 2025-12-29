import express from "express";
import cors from "cors";

import type { Express } from "express";

export function globalMiddleware(app: Express) {
  app.use(express.urlencoded());
  app.use(express.json());
  if (process.env.NODE_ENV == "development") {
    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["POST", "GET"],
      })
    );
  }
}
