import express from "express";

import type { Express } from "express";

export function globalMiddleware(app: Express) {
  app.use(express.urlencoded());
  app.use(express.json());
}
