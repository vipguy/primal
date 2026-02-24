"use client";

import { useState, useCallback, useRef } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are PrimalPrompt, an expert AI prompt engineering assistant. Your job is to help users craft, refine, and optimize prompts for AI image generators (like Bing Image Creator, DALL-E, Midjourney, Stable Diffusion) and text-based AI models.

When a user asks for help:
1. Ask clarifying questions about their goal if the request is vague.
2. Suggest well-structured prompts with specific details (style, lighting, composition, mood, medium).
3. Explain WHY certain prompt techniques work (e.g., weighted terms, negative prompts, style references).
4. Offer multiple prompt variations when appropriate.
5. Help iterate and improve prompts based on user feedback.

Format your responses clearly with the actual prompts in code blocks so they are easy to copy. Keep explanations concise but informative.`;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function usePuterChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const sendMessage = useCallback(async (userContent: string) => {
    if (!userContent.trim() || isLoading) return;

    setError(null);
    abortRef.current = false;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: userContent.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (typeof window === "undefined" || !window.puter?.ai) {
        throw new Error(
          "Puter.js is not loaded yet. Please refresh the page and try again."
        );
      }

      // Build conversation history for context
      const conversationHistory: PuterAIChatMessage[] = [
        { role: "system", content: SYSTEM_PROMPT },
      ];

      // Include recent messages for context (last 20 to avoid token limits)
      const recentMessages = [...messages.slice(-20), userMessage];
      for (const msg of recentMessages) {
        if (msg.role === "user" || msg.role === "assistant") {
          conversationHistory.push({
            role: msg.role,
            content: msg.content,
          });
        }
      }

      const response = await puter.ai.chat(conversationHistory);

      if (abortRef.current) return;

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: response.message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    abortRef.current = true;
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
