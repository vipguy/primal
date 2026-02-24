/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Type declarations for puter.js v2 SDK loaded via CDN.
 * Only covers the AI chat subset used in this project.
 */

interface PuterAIChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface PuterAIChatOptions {
  model?: string;
  stream?: boolean;
}

interface PuterAIChatResponse {
  message: {
    content: string;
    role: string;
  };
  finish_reason?: string;
}

interface PuterAIChatStreamResponse {
  text: string;
}

type PuterAIChatStreamCallback = (response: PuterAIChatStreamResponse) => void;

interface PuterAIModel {
  id: string;
  provider?: string;
  name?: string;
  aliases?: string[];
  [key: string]: unknown;
}

interface PuterAI {
  chat(
    prompt: string | PuterAIChatMessage[],
    options?: PuterAIChatOptions
  ): Promise<PuterAIChatResponse>;
  chat(
    prompt: string | PuterAIChatMessage[],
    callback: PuterAIChatStreamCallback
  ): Promise<PuterAIChatResponse>;
  chat(
    prompt: string | PuterAIChatMessage[],
    options: PuterAIChatOptions & { stream: true },
  ): Promise<ReadableStream<PuterAIChatStreamResponse>>;
  listModels(provider?: string | null): Promise<PuterAIModel[]>;
}

interface Puter {
  ai: PuterAI;
  print: (text: string) => void;
}

declare const puter: Puter;

interface Window {
  puter: Puter;
}
