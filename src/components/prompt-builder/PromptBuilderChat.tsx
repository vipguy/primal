"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePuterChat } from "@/hooks/use-puter-chat";
import { usePuterModels } from "@/hooks/use-puter-models";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { PromptTemplates } from "./PromptTemplates";
import { ModelSelector } from "./ModelSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PromptBuilderChat() {
  const { messages, isLoading, error, sendMessage, clearMessages } =
    usePuterChat();
  const {
    models,
    selectedModel,
    setSelectedModel,
    isLoadingModels,
    modelsError,
    refetchModels,
  } = usePuterModels();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(
    (content: string) => {
      sendMessage(content, selectedModel || undefined);
    },
    [sendMessage, selectedModel]
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] sm:h-[600px] md:h-[700px] bg-card rounded-lg border border-border shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col gap-2 px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-card-foreground">
              PrimalPrompt AI
            </span>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-muted-foreground hover:text-destructive h-8 gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          )}
        </div>
        {/* Model selector */}
        <ModelSelector
          models={models}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          isLoading={isLoadingModels}
          error={modelsError}
          onRefresh={refetchModels}
        />
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="h-full">
          {messages.length === 0 ? (
            <PromptTemplates onSelect={handleSend} disabled={isLoading} />
          ) : (
            <div className="divide-y divide-border/50">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex gap-3 py-4 px-3 bg-card/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">
                      Thinking{selectedModel ? ` (${selectedModel})` : ""}...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="px-3 py-2">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
        placeholder="Ask me to help build a prompt..."
      />
    </div>
  );
}
