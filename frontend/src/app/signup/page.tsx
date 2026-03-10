// frontend/src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/register', { email, password, name });
      router.push('/login');
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-charcoal rounded-xl border border-glass-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <h2 className="text-2xl font-bold text-center text-text-primary">Create your account</h2>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-secondary">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-glass-border rounded-lg bg-dark-gray text-text-primary shadow-sm focus:ring-accent-purple focus:border-accent-purple outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-secondary">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-glass-border rounded-lg bg-dark-gray text-text-primary shadow-sm focus:ring-accent-purple focus:border-accent-purple outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-secondary">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-glass-border rounded-lg bg-dark-gray text-text-primary shadow-sm focus:ring-accent-purple focus:border-accent-purple outline-none transition-colors"
            />
          </div>
          {error && <p className="text-sm text-danger">{error.message}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2.5 font-medium text-white bg-gradient-to-r from-accent-purple to-accent-cyan rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-300 shadow-[0_4px_15px_rgba(168,85,247,0.3)]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="text-accent-cyan hover:text-accent-purple transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}