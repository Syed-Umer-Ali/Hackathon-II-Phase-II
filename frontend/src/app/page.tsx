import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent-purple/30">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-charcoal/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
              <i className="fas fa-layer-group text-white text-xs"></i>
            </div>
            <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
              ONYX FLOW
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <Link href="#" className="hover:text-text-primary transition-colors">Features</Link>
            <Link href="#" className="hover:text-text-primary transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-text-primary transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-medium rounded-full bg-white text-obsidian hover:bg-opacity-90 transition-all shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text + CTA */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-semibold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
              </span>
              Next-Gen Task Management
            </div>

            <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Organize your
              <span className="block italic bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan bg-clip-text text-transparent">Workflow</span>
              with Precision.
            </h2>

            <p className="text-xl text-text-secondary max-w-xl leading-relaxed">
              Onyx Flow combines minimalist design with high-performance tools to help you track, manage, and complete your projects faster than ever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-2xl font-bold text-center text-white shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:scale-105 hover:shadow-[0_12px_40px_rgba(168,85,247,0.4)] transition-all duration-300"
              >
                Create Free Account
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-glass-bg border border-glass-border rounded-2xl font-bold text-center hover:bg-dark-gray transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-8 border-t border-glass-border">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-obsidian bg-dark-gray overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-text-primary block">Join 2,000+ Teams</span>
                <span className="text-text-secondary text-xs">Scaling their operations with Onyx</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component / Image Mockup */}
          <div className="relative group">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/30 to-accent-cyan/30 rounded-[40px] blur-[60px] group-hover:opacity-70 transition-opacity opacity-40 -z-10"></div>

            {/* The "Hero Image" replacement - A high-end UI mockup card */}
            <div className="relative bg-charcoal/80 border border-glass-border backdrop-blur-2xl rounded-[40px] p-8 shadow-[0_25px_50px_rgba(0,0,0,0.5)] transform rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/50"></div>
                  <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                  <div className="w-3 h-3 rounded-full bg-success/50"></div>
                </div>
                <div className="text-xs text-text-secondary font-mono tracking-widest uppercase">System Status: Active</div>
              </div>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-dark-gray border border-white/5 shadow-inner">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-accent-cyan">Weekly Goal</span>
                    <span className="text-xs px-2 py-1 rounded bg-accent-cyan/10 text-accent-cyan">80% Done</span>
                  </div>
                  <div className="h-2 bg-obsidian rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-gradient-to-r from-accent-purple to-accent-cyan"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-obsidian/50 border border-glass-border">
                    <div className="text-xs text-text-secondary mb-1">Active Projects</div>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-obsidian/50 border border-glass-border">
                    <div className="text-xs text-text-secondary mb-1">Completed</div>
                    <div className="text-2xl font-bold">156</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-accent-purple/10 to-transparent border-l-4 border-accent-purple">
                  <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold">New Version Available</div>
                    <div className="text-xs text-text-secondary">v4.2.0 deployed successfully</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Accessory Cards */}
            <div className="absolute top-[15%] -right-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl hidden xl:block animate-bounce" style={{ animationDuration: '4s' }}>
              <i className="fas fa-check-circle text-success text-2xl"></i>
            </div>
            <div className="absolute bottom-[15%] -left-12 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl hidden xl:block animate-bounce" style={{ animationDuration: '5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-pink"></div>
                <div className="w-20 h-2 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-glass-border bg-charcoal/30 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                  <i className="fas fa-layer-group text-white text-[10px]"></i>
                </div>
                <span className="text-lg font-bold tracking-tighter">ONYX FLOW</span>
              </div>
              <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
                Elevating task management for modern teams through elite design and seamless experiences.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-text-secondary font-medium">
                <li><Link href="#" className="hover:text-text-primary">Workflow</Link></li>
                <li><Link href="#" className="hover:text-text-primary">Enterprise</Link></li>
                <li><Link href="#" className="hover:text-text-primary">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-text-secondary font-medium">
                <li><Link href="#" className="hover:text-text-primary">About Us</Link></li>
                <li><Link href="#" className="hover:text-text-primary">Careers</Link></li>
                <li><Link href="#" className="hover:text-text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-text-secondary font-medium">
                <li><Link href="#" className="hover:text-text-primary">Privacy</Link></li>
                <li><Link href="#" className="hover:text-text-primary">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-text-secondary">
              &copy; 2026 ONYX FLOW Inc. All rights reserved. Built for professional excellence.
            </p>
            <div className="flex gap-6 text-text-secondary">
              <Link href="#" className="hover:text-text-primary"><i className="fab fa-twitter"></i></Link>
              <Link href="#" className="hover:text-text-primary"><i className="fab fa-github"></i></Link>
              <Link href="#" className="hover:text-text-primary"><i className="fab fa-linkedin"></i></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
