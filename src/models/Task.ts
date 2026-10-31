export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskQuadrant = 'do' | 'schedule' | 'delegate' | 'eliminate';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  priority: TaskPriority;
  quadrant?: TaskQuadrant;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
}
