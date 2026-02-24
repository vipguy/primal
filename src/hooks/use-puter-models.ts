"use client";

import { useState, useEffect, useCallback } from "react";

export function usePuterModels() {
  const [models, setModels] = useState<PuterAIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [modelsError, setModelsError] = useState<string | null>(null);

  const fetchModels = useCallback(async () => {
    setIsLoadingModels(true);
    setModelsError(null);

    try {
      if (typeof window === "undefined" || !window.puter?.ai) {
        throw new Error("Puter.js is not loaded yet.");
      }

      const modelList = await puter.ai.listModels();

      // Filter to only chat/text models (exclude image, embedding, etc.)
      const chatModels = modelList.filter((m) => {
        const id = m.id.toLowerCase();
        // Include models that are likely chat/text models
        return (
          !id.includes("dall-e") &&
          !id.includes("stable-diffusion") &&
          !id.includes("embedding") &&
          !id.includes("tts") &&
          !id.includes("whisper") &&
          !id.includes("moderation")
        );
      });

      // Sort alphabetically by id
      chatModels.sort((a, b) => a.id.localeCompare(b.id));

      setModels(chatModels);

      // Set default model if none selected
      if (!selectedModel && chatModels.length > 0) {
        // Prefer gpt-4o-mini or claude as default, fall back to first
        const preferred = chatModels.find(
          (m) =>
            m.id.includes("gpt-4o-mini") ||
            m.id.includes("claude-3.5-sonnet")
        );
        setSelectedModel(preferred?.id || chatModels[0].id);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load models";
      setModelsError(errorMessage);
    } finally {
      setIsLoadingModels(false);
    }
  }, [selectedModel]);

  // Retry fetching models - puter.js may load after component mounts
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const tryFetch = () => {
      if (typeof window !== "undefined" && window.puter?.ai) {
        fetchModels();
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryFetch, 500);
      } else {
        setIsLoadingModels(false);
        setModelsError("Puter.js failed to load. Please refresh the page.");
      }
    };

    tryFetch();
  }, [fetchModels]);

  return {
    models,
    selectedModel,
    setSelectedModel,
    isLoadingModels,
    modelsError,
    refetchModels: fetchModels,
  };
}
