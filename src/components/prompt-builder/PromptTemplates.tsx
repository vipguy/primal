"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Image, Palette, Camera, Wand2, Pen } from "lucide-react";

interface PromptTemplatesProps {
  onSelect: (template: string) => void;
  disabled?: boolean;
}

const templates = [
  {
    label: "Image prompt",
    icon: Image,
    prompt: "Help me create a detailed prompt for generating an image of a fantasy landscape with dramatic lighting",
  },
  {
    label: "Portrait prompt",
    icon: Camera,
    prompt: "Help me build a prompt for a professional portrait photo with cinematic lighting and bokeh background",
  },
  {
    label: "Art style",
    icon: Palette,
    prompt: "I want to generate an image in the style of Studio Ghibli. Help me write the perfect prompt",
  },
  {
    label: "Improve my prompt",
    icon: Wand2,
    prompt: "I have a rough prompt idea: 'a cat sitting on a chair'. Help me make it much more detailed and effective",
  },
  {
    label: "Creative concept",
    icon: Sparkles,
    prompt: "Give me 3 creative and unique prompt ideas for surreal digital art that would look amazing",
  },
  {
    label: "Text-to-text prompt",
    icon: Pen,
    prompt: "Help me write a system prompt for an AI chatbot that acts as a helpful coding assistant",
  },
];

export function PromptTemplates({ onSelect, disabled }: PromptTemplatesProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-card-foreground">PrimalPrompt</h2>
        <p className="text-muted-foreground text-sm max-w-md">
          Your AI-powered prompt engineering assistant. Get help crafting perfect
          prompts for image generators and AI models.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {templates.map((template) => (
          <Button
            key={template.label}
            variant="outline"
            className="h-auto py-3 px-4 text-left justify-start gap-3 whitespace-normal"
            onClick={() => onSelect(template.prompt)}
            disabled={disabled}
          >
            <template.icon className="h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-sm">{template.label}</span>
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Powered by <span className="font-semibold">puter.js</span> - free, no API key needed
      </p>
    </div>
  );
}
