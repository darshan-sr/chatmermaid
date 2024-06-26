"use client";
import React, { useState, useEffect } from "react";
import {
  BotMessage,
  SpinnerMessage,
  UserMessage,
} from "@/components/chat/message";
import { Separator } from "@/components/ui/separator";
import { useChat } from "ai/react";
import { CircleArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Message } from "ai";
import useChatStore from "@/store/chat-store";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import { EmptyScreen } from "@/app/new/empty-screen";

type ChatBoxProps = {
  diagramId: string;
  code: string;
  onChange: (val: string) => void;
};

export default function ChatBox({ diagramId, code, onChange }: ChatBoxProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [initialChats, setInitialChats] = useState<Message[]>([]);
  const [hasResponseStarted, setHasResponseStarted] = useState(false);
  const { chat, fetchChat } = useChatStore();
  useEffect(() => {
    const fetchData = async () => {
      setInitialChats(chat);
      console.log("chat", chat);
      scrollDown();
    };
    fetchData();
  }, [chat, diagramId]);

  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      initialMessages: initialChats,
      onResponse: () => setHasResponseStarted(true),
      onFinish: () => {
        setHasResponseStarted(false);
        fetchChat(diagramId);
      },
      onError: (error) =>
        toast.error(
          error.message || "An error occurred. Please try again later."
        ),
      body: { diagramId, prompt },
    });

  useEffect(() => {
    setPrompt(input);
  }, [input]);

  useEffect(() => {
    scrollDown();
  }, [messages]);

  // useEffect(() => {
  //   const updateData = async () => {
  //     if (messages[0]) {
  //       const data = await updateChats(diagramId, messages);
  //       if (data) toast.success("Chat saved successfully");
  //     }
  //   };
  //   if (!isLoading) updateData();
  // }, [messages, diagramId, isLoading]);

  function scrollDown() {
    var myDiv = document.getElementById("chatbox");
    if (myDiv) {
      myDiv.scrollTop = myDiv.scrollHeight;
    }
  }

  useEffect(() => {
    if (isLoading) scrollDown();
  });

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === "Return") && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const { theme } = useTheme();

  return (
    <>
      <div className="relative h-full">
        <div
          id="chatbox"
          className="relative h-full overflow-scroll pb-32 md:pl-16  max-w-full pl-2  pr-4 pt-4"
        >
          {messages.length != 0 ? (
            messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <UserMessage>{m.content}</UserMessage>
                ) : (
                  <BotMessage
                    text={m.content}
                    isLoading={isLoading}
                    code={code}
                    onChange={onChange}
                    theme={theme}
                  />
                )}

                {m.id !== messages[messages.length - 1].id ||
                isLoading ||
                hasResponseStarted ? (
                  <Separator className="my-4" />
                ) : (
                  <div className="my-4" />
                )}
              </div>
            ))
          ) : (
            <EmptyScreen />
          )}
          <div> {isLoading && !hasResponseStarted && <SpinnerMessage />}</div>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t    flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full p-[8px] rounded-sm">
            <div className="relative flex max-h-60   grow flex-col overflow-hidden   rounded-md  sm:border sm:px-2 bg-neutral-50 dark:bg-[rgb(16,16,16)]">
              <Textarea
                maxRows={4}
                aria-label="maximum height"
                placeholder="Describe your diagram..."
                onKeyDown={handleKeyDown}
                className="min-h-[30px] w-11/12 resize-none bg-transparent px-2 pt-4 pb-10 focus-within:outline-none sm:text-sm"
                value={input}
                onChange={handleInputChange}
              />

              <div className="absolute right-2 bottom-2 flex flex-row gap-2   ">
                {/* <div className="flex items-center pt-1 space-x-1">
                  <Checkbox className="size-3 p-0" id="terms2" />
                  <label
                    htmlFor="terms2"
                    className="font-medium text-[10px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    use current diagram
                  </label>
                </div> */}
                <Button
                  type="submit"
                  className="flex flex-row gap-1"
                  size={"sm"}
                  disabled={input === ""}
                >
                  Send
                  <CircleArrowRight className="size-3" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
