export type GTDBucket = 'inbox' | 'next_action' | 'waiting_for' | 'someday_maybe' | 'scheduled';
export type TaskPriority = 'high' | 'medium' | 'low' | 'none';
export type EisenhowerQuadrant = 'do_first' | 'schedule' | 'delegate' | 'eliminate';
export type RecurrenceUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

export interface RecurrenceConfig {
  type: 'one_off' | 'repeating';
  intervalValue?: number;
  intervalUnit?: RecurrenceUnit;
  endDate?: number;
}

export interface GeofenceTrigger {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  triggerOn: 'enter' | 'exit' | 'both';
}

export interface Task {
  id: string;
  title: string;
  notes?: string;
  bucket: GTDBucket;
  priority: TaskPriority;
  quadrant: EisenhowerQuadrant;
  isUrgent: boolean;
  isImportant: boolean;
  isCompleted: boolean;
  dueDate?: number;
  recurrence: RecurrenceConfig;
  geofence?: GeofenceTrigger;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}
