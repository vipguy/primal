import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  text: string;
  icon?: LucideIcon;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function LinkButton({ href, text, icon: Icon, className, variant = "default" }: LinkButtonProps) {
  return (
    <Button asChild variant={variant} className={cn("w-full justify-start text-left h-auto py-3 px-4 shadow-md hover:shadow-lg transition-shadow", className)}>
      <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
        {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
        <span className="flex-1 whitespace-normal break-words">{text}</span>
      </Link>
    </Button>
  );
}
