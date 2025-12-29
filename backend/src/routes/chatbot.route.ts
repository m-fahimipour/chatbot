import { Router } from "express";
import { conversation, getChatList } from "~/controllers/chatbot.controller.ts";
import { chatErrorHandler } from "~/middlewares/errors/chatErrorHandler.middleware.ts";
import { chatValidatorMiddleware } from "~/middlewares/validators/chat.validator.middleware.ts";

const chatbotRoutes = Router({
  caseSensitive: true,
  strict: true,
});

chatbotRoutes.post(
  "/chat",
  chatValidatorMiddleware,
  chatErrorHandler,
  conversation
);

chatbotRoutes.get("/chat", getChatList);

export { chatbotRoutes };
