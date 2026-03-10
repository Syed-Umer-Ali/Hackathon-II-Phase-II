// frontend/src/components/tasks/TaskList.tsx
'use client';

import { useState } from 'react';

// Define a type for the task for type safety
interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  progress?: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (id: number, updates: Partial<Task>) => void;
  onTaskDelete: (id: number) => void;
  columnFilter?: string;
}

function TaskItem({ task, onTaskUpdate, onTaskDelete }: { task: Task, onTaskUpdate: (id: number, updates: Partial<Task>) => void, onTaskDelete: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = () => {
    onTaskUpdate(task.id, { title: newTitle });
    setIsEditing(false);
  };

  // Get priority class
  const getPriorityClass = (priority: string | undefined) => {
    switch (priority) {
      case 'high': return 'priority-high bg-[rgba(239,68,68,0.15)] text-danger';
      case 'medium': return 'priority-medium bg-[rgba(245,158,11,0.15)] text-warning';
      case 'low': return 'priority-low bg-[rgba(16,185,129,0.15)] text-success';
      default: return 'priority-low bg-[rgba(16,185,129,0.15)] text-success';
    }
  };

  // Get progress class
  const getProgressClass = (progress: number | undefined) => {
    if (progress === 100) return 'progress-100 bg-gradient-to-r from-accent-purple to-accent-cyan';
    if (progress && progress >= 75) return 'progress-75 bg-gradient-to-r from-accent-purple to-accent-cyan';
    if (progress && progress >= 40) return 'progress-40 bg-gradient-to-r from-accent-cyan to-accent-purple';
    return 'progress-10 bg-gradient-to-r from-accent-pink to-accent-purple';
  };

  return (
    <div className={`task-card bg-dark-gray rounded-xl p-4 mb-3 border border-glass-border transition-all duration-300 relative overflow-hidden ${task.completed ? 'opacity-60' : ''}`}>
      <div className="task-card-bg absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-cyan"></div>

      <div className="flex items-start gap-3">
        <button
          onClick={() => onTaskUpdate(task.id, { completed: !task.completed })}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${task.completed
              ? 'bg-accent-cyan border-accent-cyan text-obsidian'
              : 'border-glass-border hover:border-accent-cyan text-transparent'
            }`}
          title={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          <i className="fas fa-check text-[10px] font-bold"></i>
        </button>

        <div className="flex-1 min-w-0">
          <div className={`task-title font-semibold mb-1 text-base transition-all ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'
            }`}>
            {task.title}
          </div>
          {task.description && (
            <div className={`task-desc text-sm text-text-secondary mb-3 line-clamp-2 ${task.completed ? 'opacity-50' : ''}`}>
              {task.description}
            </div>
          )}

          <div className="task-meta flex justify-between items-center text-xs">
            <div className={`task-priority px-2 py-1 rounded-2xl ${getPriorityClass(task.priority)}`}>
              {task.priority?.toUpperCase() || 'LOW'}
            </div>
            <div className="task-assignee flex items-center gap-1.5">
              <div className="assignee-avatar w-5 h-5 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan"></div>
              <span>Me</span>
            </div>
          </div>
        </div>
      </div>
      {task.progress !== undefined && task.progress > 0 && (
        <div className="progress-bar h-1.5 bg-light-gray rounded-3px mt-3 overflow-hidden">
          <div className={`progress-fill ${getProgressClass(task.progress)}`} style={{ width: `${task.progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export function TaskList({ tasks, onTaskUpdate, onTaskDelete, columnFilter }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-text-secondary">No tasks in this column</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} />
      ))}
    </div>
  );
}