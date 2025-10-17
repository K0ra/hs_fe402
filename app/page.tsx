export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl font-bold">Portfolio Website</h1>
        <p className="text-lg text-muted-foreground">
          This project contains a gold-standard portfolio website built with pure HTML, CSS, and JavaScript.
        </p>
        <a
          href="/index.html"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Portfolio
        </a>
      </div>
    </main>
  )
}
