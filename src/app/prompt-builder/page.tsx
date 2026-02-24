"use client";

import { PromptBuilderChat } from "@/components/prompt-builder/PromptBuilderChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PromptBuilderPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Tutorial
            </Button>
          </Link>
        </div>

        {/* Page header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            <Sparkles className="inline-block h-8 w-8 text-primary mr-2 -mt-1" />
            <span className="text-primary">Primal</span>Prompt Builder
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Chat with AI to craft the perfect prompts for Bing Image Creator,
            DALL-E, Midjourney, and more. Powered by puter.js.
          </p>
        </header>

        {/* Chat interface */}
        <PromptBuilderChat />

        <footer className="text-center text-muted-foreground pt-4 pb-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} PrimalCore. AI responses are
            generated using puter.js - no API key or account required.
          </p>
        </footer>
      </div>
    </main>
  );
}
