'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalUsers: 0,
    totalAdmitCards: 0,
    views: 0,
  });
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: jobsCount } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true });

        const { count: admitCount } = await supabase
          .from('admit_cards')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalJobs: jobsCount || 0,
          totalUsers: 100,
          totalAdmitCards: admitCount || 0,
          views: 5000,
        });

        setAnalyticsData([
          { date: 'Mon', jobs: 10, views: 240 },
          { date: 'Tue', jobs: 15, views: 310 },
          { date: 'Wed', jobs: 8, views: 200 },
          { date: 'Thu', jobs: 20, views: 380 },
          { date: 'Fri', jobs: 12, views: 290 },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (user && isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-poppins mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admit Cards</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdmitCards}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.views}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="jobs">Manage Jobs</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Jobs posted and page views this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#ef4444" />
                  <Bar dataKey="views" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>Add, edit, or delete job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button>Add New Job</Button>
                <Button variant="outline">Import Jobs</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Job management interface coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage banners, admit cards, and other content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start">Manage Banners</Button>
                <Button className="w-full justify-start" variant="outline">Manage Admit Cards</Button>
                <Button className="w-full justify-start" variant="outline">Manage Results</Button>
                <Button className="w-full justify-start" variant="outline">Manage Categories</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Configure system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <input
                    type="text"
                    defaultValue="JobPulse India"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Admin Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full px-3 py-2 border rounded opacity-50"
                  />
                </div>
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
