"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Circle, Square, Triangle } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <Circle
          className="absolute top-20 right-1/4 w-32 h-32 text-primary/30"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <Square
          className="absolute top-1/3 left-1/4 w-24 h-24 text-accent/40"
          style={{
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * -0.15}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <Triangle
          className="absolute bottom-1/4 right-1/3 w-40 h-40 text-muted/30"
          style={{
            transform: `translateY(${scrollY * 0.4}px) rotate(${scrollY * 0.2}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Foundation</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <Button variant="ghost" size="sm" className="border border-border/50 hover:border-border">
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section - Asymmetrical Layout */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-12 gap-12 items-center min-h-[80vh]">
          {/* Left side - Takes up 7 columns */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
                Build something
                <span className="block text-muted-foreground">extraordinary</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed">
                A modern foundation for your next project. Clean, elegant, and ready to scale with your vision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="ghost" size="lg" className="border border-border hover:border-foreground group">
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
                Learn More
              </Button>
            </div>

            {/* Stats - Asymmetrical placement */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/50">
              <div>
                <div className="text-3xl font-bold">99%</div>
                <div className="text-sm text-muted-foreground">Performance</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm text-muted-foreground">Possibilities</div>
              </div>
            </div>
          </div>

          {/* Right side - Takes up 5 columns with geometric accent */}
          <div className="md:col-span-5 relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border/50 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-primary/30 rotate-45 animate-pulse" />
              </div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-accent/20 rounded-full" />
              <div className="absolute bottom-12 left-12 w-24 h-24 border border-muted/30" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-32">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-8 border border-border/50 rounded-lg hover:border-border transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Square className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Modern Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built with the latest design principles and best practices for a contemporary look.
              </p>
            </div>

            <div className="space-y-4 p-8 border border-border/50 rounded-lg hover:border-border transition-colors md:mt-12">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Circle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Fully Responsive</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seamlessly adapts to any screen size, from mobile to desktop and beyond.
              </p>
            </div>

            <div className="space-y-4 p-8 border border-border/50 rounded-lg hover:border-border transition-colors">
              <div className="w-12 h-12 bg-muted/10 rounded-lg flex items-center justify-center">
                <Triangle className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Easy to Customize</h3>
              <p className="text-muted-foreground leading-relaxed">
                Flexible architecture that grows with your needs and adapts to your style.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">© 2025 Foundation. Built with care.</div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
