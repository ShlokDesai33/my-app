"use client";

import { useChat } from "ai/react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Chat({ context }: { context: string }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat();
  const latestMsg = messages[messages.length - 1];

  useEffect(() => {
    setMessages([{ content: context, id: "context", role: "data" }]);
  }, [context]);

  return (
    <Card className="mt-6 p-6">
      {messages.length > 0 &&
        latestMsg.role !== "user" &&
        latestMsg.role !== "data" && (
          <p className="mb-4">{latestMsg.content}</p>
        )}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Textarea
          value={input}
          disabled={isLoading}
          placeholder="Type your question here."
          onChange={handleInputChange}
        />

        <Button
          className="mt-4 w-full"
          disabled={isLoading || input.length === 0}
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            "Ask Question"
          )}
        </Button>
      </form>
    </Card>
  );
}
