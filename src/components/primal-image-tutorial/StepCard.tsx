import type { TutorialStep } from '@/app/page'; // Assuming type is exported from page.tsx or a types file
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface StepCardProps {
  step: TutorialStep;
}

export function StepCard({ step }: StepCardProps) {
  return (
    <Card className={cn(
      "shadow-lg hover:shadow-xl transition-shadow duration-300 w-full",
      step.isKeyStep ? "border-primary border-2" : ""
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl md:text-2xl text-card-foreground">
            <span className="mr-3 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {step.id}
            </span>
            {step.titlePrefix}
          </CardTitle>
          {step.isKeyStep && <Star className="h-6 w-6 text-accent fill-accent flex-shrink-0" aria-label="Key Step"/>}
        </div>
      </CardHeader>
      <CardContent>
        <p className={cn(
          "text-card-foreground leading-relaxed",
          step.isKeyStep ? "font-semibold" : "font-normal"
        )}>
          {step.mainAction}
        </p>
        {step.link && (
          <Link href={step.link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-primary hover:underline break-all font-medium">
            {step.link}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
