"use client";

import IconSubmit from "@/app/components/IconSubmit";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
};

const initial: Message[] = [
  {
    role: "bot",
    content: "Hi, whats poppin",
    timestamp: new Date(),
  },
];

export default function Chatbot() {
  const [conversation, setConversation] = useState<Message[]>(initial);
  const [prompt, setPrompt] = useState<string>("");
  const [messageStream, setMessageStream] = useState("");
  const [isStreaming, setStreaming] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200, // Max height in pixels
      )}px`;
    }
  }, [prompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    const req = {
      model: "gemma3:1b",
      prompt,
    };
    e.preventDefault();
    const new_msg = {
      role: "user",
      content: prompt,
      timestamp: new Date(),
    } as Message;
    setConversation((prev) => [...prev, new_msg]);
    setPrompt("");
    const response = await fetch("http://localhost:8080/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    setStreaming(true);
    let llmContent = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decoded = decoder.decode(value);
      llmContent += decoded;
      setMessageStream((prev) => prev + decoded);
    }
    setStreaming(false);
    setMessageStream("");
    const llm_new_msg = {
      role: "bot",
      content: llmContent,
      timestamp: new Date(),
    } as Message;
    setConversation((prev) => [...prev, llm_new_msg]);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="max-w-[1000px] w-[80%] mb-[150px]">
          {conversation.map((msg, i) => {
            if (msg.role === "user") {
              return (
                <div
                  className="bg-green-950 rounded-xl mt-4 text-white"
                  key={i}
                >
                  <div className="py-4 px-6">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="mt-6">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            );
          })}

          {isStreaming && (
            <div className="mt-6">
              <ReactMarkdown>{messageStream}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 w-full dark:bg-[var(--foreground)] bg-[var(--background)] flex justify-center">
          <div className="flex max-w-[1000px] w-[70%] border p-2 mb-10 rounded-2xl">
            <form
              className="w-full flex"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            >
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`
                w-full resize-none 
                max-h-[200px]  /* Maximum height before scrolling */
                min-h-[44px]   /* Minimum height (like DeepSeek) */
                py-2 px-3 
                bg-transparent
                focus:outline-none
                overflow-y-auto /* Show scrollbar when content exceeds max height */
                scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
              `}
                placeholder="Message FIRE Chat..."
                rows={1}
              />
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="rounded-full bg-amber-500 w-8 h-8"
                >
                  <div className="flex justify-center items-center">
                    <IconSubmit />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
