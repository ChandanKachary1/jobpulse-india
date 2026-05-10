'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Moon, Sun, LogOut, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/app/providers';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="font-bold text-xl text-primary">JobPulse</span>
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-secondary rounded-lg transition"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm">Admin</Button>
                    </Link>
                  )}
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/auth/login">
                  <Button size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>

          <nav className="hidden md:flex gap-6 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm font-medium hover:text-primary transition whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col gap-3 p-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm font-medium py-2 px-3 hover:bg-secondary rounded transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
