// frontend/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { getUserId } from '@/lib/auth';
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

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const currentUserId = getUserId();
    if (currentUserId) {
      setUserId(currentUserId);
    }
  }, []);

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
      await api.put(`/${userId}/tasks/${id}`, updates);
      fetchTasks();
    } catch (err: any) {
      setError(err);
    }
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

  if (!userId) return null;

  const filteredTasks = tasks.filter(task => {
    if (!task.completed) return true;
    if (!task.completed_at) return true;
    const completedTime = new Date(task.completed_at).getTime();
    const now = new Date().getTime();
    return (now - completedTime) < 3600000;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;
  const velocity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6">
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
              columnFilter="all"
            />
          </div>

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
              columnFilter="completed"
            />
          </div>

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
              columnFilter="pending"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-charcoal rounded-xl p-5 border border-glass-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-text-primary">
              <i className="fas fa-chart-gantt text-accent-cyan"></i>
              Project Timeline
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Design Phase', progress: 70, from: 'accent-cyan', to: 'accent-purple' },
              { label: 'Development', progress: 45, from: 'accent-purple', to: 'accent-pink' },
              { label: 'Testing', progress: 20, from: 'accent-pink', to: 'danger' },
            ].map((phase) => (
              <div key={phase.label} className="relative">
                <div className="text-xs text-text-secondary mb-1">{phase.label}</div>
                <div className="h-5 bg-dark-gray rounded-lg overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${phase.from} to-${phase.to} rounded-lg`}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-charcoal rounded-xl p-5 border border-glass-border">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-text-primary mb-4">
            <i className="fas fa-chart-line text-accent-purple"></i>
            Sprint Progress
          </h3>
          <div className="flex items-end justify-around h-40 pt-6">
            {[
              { h: '70%', from: 'accent-cyan', to: 'accent-purple', label: 'S1' },
              { h: '50%', from: 'accent-purple', to: 'accent-pink', label: 'S2' },
              { h: '90%', from: 'accent-pink', to: 'accent-purple', label: 'S3' },
              { h: '60%', from: 'accent-cyan', to: 'accent-pink', label: 'S4' },
            ].map((sprint, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-8 rounded-t-lg overflow-hidden" style={{ height: sprint.h }}>
                  <div className={`w-full h-full bg-gradient-to-t from-${sprint.from} to-${sprint.to} rounded-t-lg`}></div>
                </div>
                <span className="text-xs text-text-secondary">{sprint.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showTaskForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowTaskForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <TaskFormModal onTaskCreated={() => { fetchTasks(); setShowTaskForm(false); }} onClose={() => setShowTaskForm(false)} />
          </div>
        </div>
      )}
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