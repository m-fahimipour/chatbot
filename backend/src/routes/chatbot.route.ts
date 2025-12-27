import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type { ChatCompletionMessageParam } from "openai/resources.js";
import { openai } from "~/configs/openAI.config.ts";
import { chatList } from "~/controllers/loadData.controller.ts";
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
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const userChatObject: ChatCompletionMessageParam = {
        role: "user",
        content: body.message,
      };
      const resAI = await openai.chat.completions.create({
        model: process.env.MODEL_NAME || "gpt-4.1-mini",
        messages: [...chatList, userChatObject],
      });

      chatList.push(userChatObject);
      chatList.push(resAI.choices[0].message);

      res.json(chatList.at(-1)).status(200);
    } catch (e) {
      res
        .json({
          message: JSON.stringify(e),
          status: 400,
        })
        .status(400);
    }
  }
);

export { chatbotRoutes };
