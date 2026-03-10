// frontend/src/components/tasks/TaskForm.tsx
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { getUserId } from '@/lib/auth'; // Assuming a function to get user id

interface TaskFormProps {
  onTaskCreated: () => void;
  className?: string;
}

export function TaskForm({ onTaskCreated, className }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState<Error | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userId = getUserId(); // This function needs to be implemented
      if (!userId) {
        throw new Error('You must be logged in to create a task.');
      }
      await api.post(`/${userId}/tasks`, {
        title,
        description,
        priority,
        progress: 0
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      onTaskCreated();
      setIsOpen(false);
    } catch (err: any) {
      setError(err);
    }
  };

  // If className is provided, render as a floating button
  if (className) {
    return (
      <button
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <i className="fas fa-plus"></i>
      </button>
    );
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-charcoal rounded-xl p-6 w-full max-w-md border border-glass-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Add New Task</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-secondary hover:text-text-primary"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="mb-4 text-sm text-danger">{error.message}</p>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-dark-gray text-text-primary rounded-lg border border-glass-border focus:outline-none focus:ring-1 focus:ring-accent-purple"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-dark-gray text-text-primary rounded-lg border border-glass-border focus:outline-none focus:ring-1 focus:ring-accent-purple"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Priority
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPriority(level)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    priority === level
                      ? level === 'high'
                        ? 'bg-[rgba(239,68,68,0.15)] text-danger border border-danger'
                        : level === 'medium'
                          ? 'bg-[rgba(245,158,11,0.15)] text-warning border border-warning'
                          : 'bg-[rgba(16,185,129,0.15)] text-success border border-success'
                      : 'bg-dark-gray text-text-secondary'
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
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 font-medium text-text-primary bg-dark-gray rounded-lg hover:bg-light-gray"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 font-medium text-white bg-gradient-to-r from-accent-purple to-accent-cyan rounded-lg hover:opacity-90"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}