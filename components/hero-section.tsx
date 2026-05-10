'use client';

import React from 'react';
import { Search, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
              Find Your <span className="text-primary">Dream Government Job</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Access latest government job alerts, admit cards, results, and answer keys in one place. Fast, reliable, and always updated.
            </p>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs, results, admit cards..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none bg-background text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card text-center">
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </div>
              <div className="glass-card text-center">
                <div className="text-3xl font-bold text-accent">100K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="glass-card text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block space-y-4">
            <div className="glass-card">
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">Get instant notifications for new job postings</p>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Trending Jobs</h3>
                  <p className="text-sm text-muted-foreground">See what jobs are trending in your region</p>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Join 100K+ job seekers on WhatsApp & Telegram</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
