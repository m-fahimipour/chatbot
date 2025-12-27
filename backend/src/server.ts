import express from "express";
import { loadDataController } from "~/controllers/loadData.controller.ts";
import { globalMiddleware } from "~/middlewares/global.middleware.ts";
import { chatbotRoutes } from "~/routes/chatbot.route.ts";

// server
const server = express();

// middlewares
globalMiddleware(server);

// Routes
server.use(chatbotRoutes);

// load data
await loadDataController();

// run server
server.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log("server is running");
});
