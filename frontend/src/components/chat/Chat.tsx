import type {
  ResponseInput,
  ResponseInputItem,
} from "openai/resources/responses/responses.js";
import { useState } from "react";

export function Chat() {
  const [messages, setMessages] = useState<ResponseInput>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function sendMessage(message: string) {
    const requestBody: ResponseInputItem = {
      type: "message",
      role: "user",
      content: message,
    };
    const resApi = await fetch("http://localhost:2020/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const res = await resApi.json();

    if (resApi.ok) setMessages((prev) => [...prev, res]);
  }

  return (
    <div className="h-dvh overflow-auto flex flex-col items-center py-5 gap-3">
      {/* chat section */}
      <div className="flex flex-col grow gap-4 overflow-auto w-full px-40">
        {messages.map((item, index) => {
          if (item.type === "message" && typeof item.content === "string") {
            return (
              <p
                key={index}
                className="px-4 py-2 rounded-4xl bg-gray-600 text-white self-end"
              >
                {item.content}
              </p>
            );
          } else if (
            item.type === "message" &&
            typeof item.content === "object" &&
            item.content[0].type === "output_text"
          ) {
            return (
              <p
                key={index}
                className="px-4 py-2 rounded-4xl bg-gray-600 text-white self-start max-w-3/4"
              >
                {item.content[0].text}
              </p>
            );
          }
        })}

        {isLoading ? "is loading...." : null}
      </div>
      {/* input section */}
      <label
        htmlFor="input"
        className="flex items-center px-7 py-1 rounded-full bg-gray-700 max-w-3xl w-full h-15"
      >
        <textarea
          id="input"
          className="outline-none placeholder:text-amber-50 placeholder:opacity-50 caret-white resize-none w-full text-white"
          placeholder="write your text"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              const value = e.currentTarget.value;
              e.preventDefault();
              setIsLoading(true);
              setMessages((prev) => [
                ...prev,
                {
                  role: "user",
                  content: value,
                  type: "message",
                },
              ]);
              sendMessage(value).finally(() => setIsLoading(false));
              return;
            }
          }}
        />
      </label>
    </div>
  );
}
