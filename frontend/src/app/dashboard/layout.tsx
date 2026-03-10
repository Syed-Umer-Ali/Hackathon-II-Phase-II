// frontend/src/app/dashboard/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getUserId, removeToken } from '@/lib/auth';

interface User {
  user_id: string;
  email: string;
  name: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const userId = getUserId();

    if (!userId) {
      router.push('/login');
    } else {
      fetchUser();
      setIsLoading(false);
    }

    // Listen for profile updates from child components
    const handleUserUpdate = () => fetchUser();
    window.addEventListener('user-updated', handleUserUpdate);
    return () => window.removeEventListener('user-updated', handleUserUpdate);
  }, [router]);

  const fetchUser = async () => {
    try {
      const userData = await api.get<User>('/me');
      setUser(userData);
    } catch (err: any) {
      console.error('Failed to fetch user:', err);
      // Extra safety: if fetchUser fails due to auth, let api.ts handle redirect
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  // Prevent hydration mismatch by returning null or a consistent loading state on server
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan animate-pulse"></div>
          <p className="text-text-secondary animate-pulse text-sm font-medium tracking-widest uppercase">Initializing Onyx...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: 'fa-home', label: 'Dashboard', href: '/dashboard' },
    { icon: 'fa-calendar-alt', label: 'Calendar', href: '/dashboard/calendar' },
    { icon: 'fa-chart-line', label: 'Analytics', href: '/dashboard/analytics' },
    { icon: 'fa-users', label: 'Team', href: '/dashboard/team' },
    { icon: 'fa-cog', label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-glass-border bg-charcoal/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
              <i className="fas fa-layer-group text-white text-xs"></i>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent tracking-tight">
              ONYX FLOW
            </h1>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center bg-dark-gray rounded-xl px-4 py-2.5 w-96 border border-glass-border">
            <i className="fas fa-search text-text-secondary text-sm"></i>
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent text-text-primary text-sm ml-3 outline-none w-full placeholder:text-text-secondary"
            />
          </div>

          {/* User Area */}
          <div className="flex items-center gap-4">
            <button className="relative text-text-secondary hover:text-text-primary transition-colors">
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-pink rounded-full"></span>
            </button>
            <div
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-3 bg-dark-gray rounded-xl px-3 py-2 border border-glass-border cursor-pointer hover:bg-light-gray transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan flex items-center justify-center font-bold text-xs text-white">
                {user?.name?.charAt(0) || user?.email?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-text-primary hidden sm:block">{user?.name || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-text-secondary hover:text-danger transition-colors text-sm"
              title="Logout"
            >
              <i className="fas fa-sign-out-alt text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-16 border-r border-glass-border bg-charcoal h-full py-6 flex-shrink-0">
          <nav className="flex flex-col items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 text-accent-purple'
                    : 'text-text-secondary hover:bg-glass-bg hover:text-text-primary'
                    }`}
                >
                  <i className={`fas ${item.icon} text-base`}></i>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent-purple rounded-r-full"></div>
                  )}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-charcoal border border-glass-border rounded-md text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Child Content */}
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md"
          onClick={() => setShowProfileModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div className="bg-charcoal rounded-xl p-6 w-full max-w-sm border border-glass-border shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-text-primary">Personal Info</h3>
                <button onClick={() => setShowProfileModal(false)} className="text-text-secondary hover:text-text-primary transition-colors">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan flex items-center justify-center text-3xl font-bold text-white mb-4">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <h4 className="text-lg font-semibold text-text-primary">{user.name || 'User'}</h4>
                <p className="text-sm text-text-secondary">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-dark-gray rounded-lg border border-glass-border">
                  <span className="block text-xs text-text-secondary uppercase mb-1">User ID</span>
                  <span className="text-sm text-text-primary font-mono truncate block">{user.user_id}</span>
                </div>
                <div className="p-4 bg-dark-gray rounded-lg border border-glass-border">
                  <span className="block text-xs text-text-secondary uppercase mb-1">Status</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    <span className="text-sm text-text-primary">Online</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full mt-6 py-2.5 bg-dark-gray hover:bg-light-gray text-text-primary font-medium rounded-lg transition-colors border border-glass-border"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
