import { AppHeader } from "@/components/primal-image-tutorial/Header";
import { StepCard } from "@/components/primal-image-tutorial/StepCard";
import { LinkButton } from "@/components/primal-image-tutorial/LinkButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadCloud, ExternalLink, Github, ListChecks, Sparkles } from "lucide-react";
import Link from "next/link";

export interface TutorialStep {
  id: number;
  titlePrefix: string;
  mainAction: string;
  isKeyStep: boolean;
  link?: string;
}

const tutorialSteps: TutorialStep[] = [
  { id: 1, titlePrefix: "Step 1: Setup Pydroid3", mainAction: "Download Pydroid3. Once installed, open its PIP utility and install the 'requests' library by typing 'pip install requests'.", isKeyStep: true },
  { id: 2, titlePrefix: "Step 2: Get Firefox & Extension", mainAction: "Download Firefox browser and install the 'Cookie Editor' extension.", isKeyStep: false },
  { id: 3, titlePrefix: "Step 3: Go to Bing Image Creator", mainAction: "In Firefox, type or navigate to the Bing Image Creator website:", isKeyStep: false, link: "https://www.bing.com/images/create" },
  { id: 4, titlePrefix: "Step 4: Sign In", mainAction: "Sign into your Microsoft account on the Bing Image Creator page.", isKeyStep: true },
  { id: 5, titlePrefix: "Step 5: Grab _U Cookie", mainAction: "Once signed in, click the Cookie Editor extension icon in Firefox and find the cookie named '_U'. Copy its value.", isKeyStep: true },
  { id: 6, titlePrefix: "Step 6: Use the Script", mainAction: "Add your copied _U cookie value into the designated place in the Python script. Then, run the script.", isKeyStep: true },
  { id: 7, titlePrefix: "Step 7: Find Your Images", mainAction: "Your generated images will be saved in a folder named 'bingimage' within your Pydroid3 storage or script location (check file manager).", isKeyStep: true },
];

interface LinkItem {
  href: string;
  text: string;
  icon: typeof DownloadCloud;
}

const downloadLinks: LinkItem[] = [
  { href: "https://play.google.com/store/apps/details?id=ru.iiec.pydroid3", text: "Pydroid 3 on Google Play", icon: DownloadCloud },
  { href: "https://www.mozilla.org/firefox/new/", text: "Mozilla Firefox Browser", icon: DownloadCloud },
  { href: "https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/", text: "Cookie Editor (Firefox Add-on)", icon: DownloadCloud },
];

const externalLinks: LinkItem[] = [
  { href: "https://www.bing.com/images/create", text: "Bing Image Creator", icon: ExternalLink },
  { href: "https://github.com/vipguy/Bing-stuff/tree/main", text: "GitHub Repository (Bing-stuff)", icon: Github },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-4xl space-y-10 md:space-y-12">
        <AppHeader />

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold flex items-center">
              <ListChecks className="mr-3 h-8 w-8 text-primary" />
              Tutorial Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {tutorialSteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <DownloadCloud className="mr-3 h-7 w-7 text-primary" />
              Downloads
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloadLinks.map((link) => (
              <LinkButton key={link.href} href={link.href} text={link.text} icon={link.icon} variant="secondary" />
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <ExternalLink className="mr-3 h-7 w-7 text-primary" />
              External Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {externalLinks.map((link) => (
              <LinkButton key={link.href} href={link.href} text={link.text} icon={link.icon} variant="secondary" />
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-xl border-primary/30 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <Sparkles className="mr-3 h-7 w-7 text-primary" />
              AI Prompt Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Need help crafting the perfect image prompt? Our AI-powered prompt
              builder helps you create detailed, optimized prompts for Bing Image
              Creator and other AI image generators.
            </p>
            <Link href="/prompt-builder">
              <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors">
                <Sparkles className="h-4 w-4" />
                Open Prompt Builder
              </span>
            </Link>
          </CardContent>
        </Card>

        <footer className="text-center text-muted-foreground pt-8 pb-4">
          <p>&copy; {new Date().getFullYear()} PrimalCore. All rights reserved.</p>
          <p>Tutorial for mobile and PC image generation.</p>
        </footer>
      </div>
    </main>
  );
}
