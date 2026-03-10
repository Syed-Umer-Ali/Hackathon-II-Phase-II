// frontend/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getUserId, removeToken } from '@/lib/auth';
import { TaskList } from '@/components/tasks/TaskList';

interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  completed_at?: string | null;
  created_at: string;
}

interface User {
  user_id: string;
  email: string;
  name: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUserId = getUserId();
    if (!currentUserId) {
      router.push('/login');
    } else {
      setUserId(currentUserId);
      fetchUser();
    }
  }, [router]);

  const fetchUser = async () => {
    try {
      const userData = await api.get<User>('/me');
      setUser(userData);
    } catch (err: any) {
      console.error('Failed to fetch user:', err);
    }
  };

  const fetchTasks = async () => {
    if (!userId) return;
    try {
      const fetchedTasks = await api.get<Task[]>(`/${userId}/tasks`);
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const handleTaskUpdate = async (id: number, updates: Partial<Task>) => {
    if (!userId) return;
    try {
      // Use PUT for general updates, matches backend route
      await api.put(`/${userId}/tasks/${id}`, updates);
      fetchTasks();
    } catch (err: any) {
      setError(err);
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const handleTaskDelete = async (id: number) => {
    if (!userId) return;
    try {
      await api.delete(`/${userId}/tasks/${id}`);
      fetchTasks();
    } catch (err: any) {
      setError(err);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading...</div>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => {
    if (!task.completed) return true;
    if (!task.completed_at) return true;

    // Hide if completed > 1 hour ago (3600000ms)
    const completedTime = new Date(task.completed_at).getTime();
    const now = new Date().getTime();
    return (now - completedTime) < 3600000;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const totalTasks = tasks.length;
  const velocity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-glass-border bg-charcoal/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent tracking-tight">
            ONYX FLOW
          </h1>

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

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-16 border-r border-glass-border bg-charcoal min-h-[calc(100vh-53px)] py-6">
          <nav className="flex flex-col items-center gap-1">
            {[
              { icon: 'fa-home', label: 'Home', href: '/dashboard', active: true },
              { icon: 'fa-tasks', label: 'Tasks', href: '/dashboard' },
              { icon: 'fa-calendar-alt', label: 'Calendar', href: '/dashboard' },
              { icon: 'fa-chart-line', label: 'Analytics', href: '/dashboard' },
              { icon: 'fa-users', label: 'Team', href: '/dashboard' },
              { icon: 'fa-cog', label: 'Settings', href: '/dashboard' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${item.active
                  ? 'bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 text-accent-purple'
                  : 'text-text-secondary hover:bg-glass-bg hover:text-text-primary'
                  }`}
              >
                <i className={`fas ${item.icon} text-base`}></i>
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent-purple rounded-r-full"></div>
                )}
                <div className="absolute left-full ml-2 px-2 py-1 bg-charcoal border border-glass-border rounded-md text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Tasks', value: totalTasks, icon: 'fa-tasks', color: 'accent-cyan' },
              { label: 'Completed', value: completedTasks, icon: 'fa-check-circle', color: 'accent-purple' },
              { label: 'Pending', value: pendingTasks, icon: 'fa-clock', color: 'accent-pink' },
              { label: 'Velocity', value: `${velocity}%`, icon: 'fa-fire', color: 'success' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-charcoal rounded-xl p-5 border border-glass-border hover:border-glass-border/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{stat.label}</span>
                  <i className={`fas ${stat.icon} text-${stat.color}`}></i>
                </div>
                <div className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Kanban Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <i className="fas fa-columns text-accent-purple"></i>
                Task Board
              </h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-[0_4px_15px_rgba(168,85,247,0.3)]"
              >
                <i className="fas fa-plus text-xs"></i>
                Add Task
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {/* All Tasks Column */}
              <div className="bg-charcoal rounded-xl min-w-[320px] w-80 p-4 border border-glass-border flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-glass-border">
                  <div className="text-sm font-semibold flex items-center gap-2 text-text-primary">
                    <i className="fas fa-list-check text-accent-cyan"></i>
                    <span>All Tasks</span>
                  </div>
                  <span className="bg-dark-gray rounded-full px-2.5 py-0.5 text-xs text-text-secondary">
                    {tasks.length}
                  </span>
                </div>
                <TaskList
                  tasks={filteredTasks}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                  columnFilter="subtasks"
                />
              </div>

              {/* Completed Column */}
              <div className="bg-charcoal rounded-xl min-w-[320px] w-80 p-4 border border-glass-border flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-glass-border">
                  <div className="text-sm font-semibold flex items-center gap-2 text-text-primary">
                    <i className="fas fa-check-circle text-success"></i>
                    <span>Completed</span>
                  </div>
                  <span className="bg-dark-gray rounded-full px-2.5 py-0.5 text-xs text-text-secondary">
                    {completedTasks}
                  </span>
                </div>
                <TaskList
                  tasks={filteredTasks.filter(t => t.completed)}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                  columnFilter="community"
                />
              </div>

              {/* Pending Column */}
              <div className="bg-charcoal rounded-xl min-w-[320px] w-80 p-4 border border-glass-border flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-glass-border">
                  <div className="text-sm font-semibold flex items-center gap-2 text-text-primary">
                    <i className="fas fa-hourglass-half text-warning"></i>
                    <span>Pending</span>
                  </div>
                  <span className="bg-dark-gray rounded-full px-2.5 py-0.5 text-xs text-text-secondary">
                    {pendingTasks}
                  </span>
                </div>
                <TaskList
                  tasks={filteredTasks.filter(t => !t.completed)}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                  columnFilter="development"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section: Timeline + Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Project Timeline */}
            <div className="bg-charcoal rounded-xl p-5 border border-glass-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-text-primary">
                  <i className="fas fa-chart-gantt text-accent-cyan"></i>
                  Project Timeline
                </h3>
                <button className="bg-dark-gray text-text-secondary px-3 py-1.5 rounded-lg text-xs hover:text-text-primary transition-colors">
                  View Gantt
                </button>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <div className="text-xs text-text-secondary mb-1">Design Phase</div>
                  <div className="h-5 bg-dark-gray rounded-lg overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg" style={{ boxShadow: '0 0 12px rgba(6,182,212,0.3)' }}></div>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-xs text-text-secondary mb-1">Development</div>
                  <div className="h-5 bg-dark-gray rounded-lg overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg" style={{ boxShadow: '0 0 12px rgba(168,85,247,0.3)' }}></div>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-xs text-text-secondary mb-1">Testing</div>
                  <div className="h-5 bg-dark-gray rounded-lg overflow-hidden">
                    <div className="h-full w-[20%] bg-gradient-to-r from-accent-pink to-danger rounded-lg" style={{ boxShadow: '0 0 12px rgba(217,70,239,0.3)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sprint Progress */}
            <div className="bg-charcoal rounded-xl p-5 border border-glass-border">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-text-primary mb-4">
                <i className="fas fa-chart-line text-accent-purple"></i>
                Sprint Progress
              </h3>
              <div className="flex items-end justify-around h-40 pt-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 rounded-t-lg overflow-hidden" style={{ height: '70%' }}>
                    <div className="w-full h-full bg-gradient-to-t from-accent-cyan to-accent-purple rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-text-secondary">S1</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 rounded-t-lg overflow-hidden" style={{ height: '50%' }}>
                    <div className="w-full h-full bg-gradient-to-t from-accent-purple to-accent-pink rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-text-secondary">S2</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 rounded-t-lg overflow-hidden" style={{ height: '90%' }}>
                    <div className="w-full h-full bg-gradient-to-t from-accent-pink to-accent-purple rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-text-secondary">S3</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 rounded-t-lg overflow-hidden" style={{ height: '60%' }}>
                    <div className="w-full h-full bg-gradient-to-t from-accent-cyan to-accent-pink rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-text-secondary">S4</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowTaskForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <TaskFormModal onTaskCreated={() => { fetchTasks(); setShowTaskForm(false); }} onClose={() => setShowTaskForm(false)} />
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md"
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

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={() => setShowTaskForm(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white text-xl flex items-center justify-center shadow-[0_6px_20px_rgba(168,85,247,0.4)] z-40 transition-all duration-300 hover:scale-110"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

function TaskFormModal({ onTaskCreated, onClose }: { onTaskCreated: () => void; onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userId = getUserId();
      if (!userId) throw new Error('You must be logged in to create a task.');
      // Backend now accepts title, description, and priority
      await api.post(`/${userId}/tasks`, { title, description: description || null, priority });
      onTaskCreated();
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="bg-charcoal rounded-xl p-6 w-full max-w-md border border-glass-border shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-text-primary">Add New Task</h3>
        <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <p className="mb-4 text-sm text-danger">{error.message}</p>}
        <div className="mb-4">
          <label htmlFor="modal-title" className="block text-sm font-medium text-text-secondary mb-1">Title</label>
          <input
            id="modal-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-dark-gray text-text-primary rounded-lg border border-glass-border focus:outline-none focus:ring-1 focus:ring-accent-purple"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="modal-desc" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
          <textarea
            id="modal-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-dark-gray text-text-primary rounded-lg border border-glass-border focus:outline-none focus:ring-1 focus:ring-accent-purple"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">Priority</label>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${priority === level
                  ? level === 'high'
                    ? 'bg-danger/15 text-danger border border-danger'
                    : level === 'medium'
                      ? 'bg-warning/15 text-warning border border-warning'
                      : 'bg-success/15 text-success border border-success'
                  : 'bg-dark-gray text-text-secondary border border-transparent'
                  }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 font-medium text-text-primary bg-dark-gray rounded-lg hover:bg-light-gray transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 font-medium text-white bg-gradient-to-r from-accent-purple to-accent-cyan rounded-lg hover:opacity-90 transition-all"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}