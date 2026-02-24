"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, Cpu } from "lucide-react";

interface ModelSelectorProps {
  models: PuterAIModel[];
  selectedModel: string;
  onModelChange: (model: string) => void;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function ModelSelector({
  models,
  selectedModel,
  onModelChange,
  isLoading,
  error,
  onRefresh,
}: ModelSelectorProps) {
  if (error) {
    return (
      <div className="flex items-center gap-2 text-xs text-destructive">
        <span>{error}</span>
        <Button variant="ghost" size="sm" onClick={onRefresh} className="h-6 px-2">
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Cpu className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      {isLoading ? (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Loading models...</span>
        </div>
      ) : (
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="h-7 text-xs w-[220px] sm:w-[280px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id} className="text-xs">
                {model.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={isLoading}
        className="h-7 w-7 p-0 flex-shrink-0"
        title="Refresh model list"
      >
        <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
}
