import React, { createContext, useContext, useState } from 'react';
import { Task, GTDBucket, EisenhowerQuadrant } from '../../models/Task';
import { handleTaskCompletion } from './recurrenceEngine';
import { parseNaturalLanguageTask } from '../nlp/voiceToTaskParser';
import { SUPPORTED_REGIONS, RegionConfig } from '../../utils/regionalFormatters';

interface TaskStoreContextType {
  tasks: Task[];
  region: RegionConfig;
  setRegion: (region: RegionConfig) => void;
  addTaskFromNLP: (input: string) => void;
  toggleComplete: (taskId: string) => void;
  moveTaskBucket: (taskId: string, bucket: GTDBucket) => void;
  moveTaskQuadrant: (taskId: string, quadrant: EisenhowerQuadrant) => void;
  deleteTask: (taskId: string) => void;
  exportBackupJSON: () => string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 'seed_1',
    title: 'Review weekly GTD inbox triggers',
    bucket: 'inbox',
    priority: 'high',
    quadrant: 'do_first',
    isUrgent: true,
    isImportant: true,
    isCompleted: false,
    dueDate: Date.now(),
    recurrence: { type: 'repeating', intervalValue: 1, intervalUnit: 'weeks' },
    tags: ['gtd', 'review'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'seed_2',
    title: 'Pick up hardware supplies',
    bucket: 'next_action',
    priority: 'medium',
    quadrant: 'schedule',
    isUrgent: false,
    isImportant: true,
    isCompleted: false,
    dueDate: Date.now() + 86400000,
    recurrence: { type: 'one_off' },
    geofence: {
      id: 'geo_1',
      label: 'Town Centre Hardware',
      latitude: 53.28,
      longitude: -3.83,
      radiusMeters: 250,
      triggerOn: 'enter',
    },
    tags: ['errands'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const TaskStoreContext = createContext<TaskStoreContextType | undefined>(undefined);

export const TaskStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [region, setRegion] = useState<RegionConfig>(SUPPORTED_REGIONS[0]); // Default GB

  const addTaskFromNLP = (input: string) => {
    if (!input.trim()) return;
    const newTask = parseNaturalLanguageTask(input);
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleComplete = (taskId: string) => {
    setTasks((prev) => {
      const target = prev.find((t) => t.id === taskId);
      if (!target) return prev;

      if (target.isCompleted) {
        return prev.map((t) => (t.id === taskId ? { ...t, isCompleted: false, updatedAt: Date.now() } : t));
      }

      const { updatedTask, nextTask } = handleTaskCompletion(target);
      const updatedList = prev.map((t) => (t.id === taskId ? updatedTask : t));
      return nextTask ? [nextTask, ...updatedList] : updatedList;
    });
  };

  const moveTaskBucket = (taskId: string, bucket: GTDBucket) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, bucket, updatedAt: Date.now() } : t))
    );
  };

  const moveTaskQuadrant = (taskId: string, quadrant: EisenhowerQuadrant) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, quadrant, updatedAt: Date.now() } : t))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const exportBackupJSON = () => JSON.stringify({ version: 1, exportedAt: Date.now(), tasks }, null, 2);

  return (
    <TaskStoreContext.Provider
      value={{
        tasks,
        region,
        setRegion,
        addTaskFromNLP,
        toggleComplete,
        moveTaskBucket,
        moveTaskQuadrant,
        deleteTask,
        exportBackupJSON,
      }}
    >
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = () => {
  const context = useContext(TaskStoreContext);
  if (!context) throw new Error('useTaskStore must be used within a TaskStoreProvider');
  return context;
};
