import fs from "fs/promises";
import path from "path";
import type { ResponseInput } from "openai/resources/responses/responses.mjs";

let chatList: ResponseInput = [];

async function loadDataController() {
  try {
    const chatListBuffer = await fs.readFile(
      path.join(import.meta.dirname, "../database/chatList.json"),
      { encoding: "utf-8" }
    );

    chatList = JSON.parse(chatListBuffer);
  } catch (e) {
    console.log(e, "error in load chat-list");
  }
}

export { chatList, loadDataController };
