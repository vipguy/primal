
export function AppHeader() { // Renamed to AppHeader to avoid conflict if a more generic Header is needed
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        <span className="text-primary">Primal</span>ImageTutorial
      </h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
        A step-by-step guide to generating images with Bing Image Creator automation.
        Built for mobile and PC.
      </p>
    </header>
  );
}
