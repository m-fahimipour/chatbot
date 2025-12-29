import type { Request, Response } from "express";
import type { ResponseInputItem } from "openai/resources/responses/responses.mjs";
import { openai } from "~/configs/openAI.config.ts";
import { chatList } from "~/controllers/loadData.controller.ts";

export async function conversation(req: Request, res: Response) {
  const { body } = req;

  try {
    const userChatObject: ResponseInputItem = body;

    const resAI = await openai.responses.create({
      model: "gemma3:1b",
      instructions: "you should play role as frontend developer",
      input: [...chatList, body],
    });

    chatList.push(userChatObject);
    resAI.output.forEach((item) => {
      chatList.push(item);
    });

    res.status(200).json(chatList.at(-1));
  } catch (e) {
    return res.status(400).json({
      message: JSON.stringify(e),
      status: 400,
    });
  }
}

export async function getChatList(req: Request, res: Response) {
  res.json(chatList).status(200);
}
