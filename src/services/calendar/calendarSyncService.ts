import { Task } from '../../models/Task';

const formatICSDate = (timestamp: number): string => {
  const d = new Date(timestamp);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export const exportTasksToICS = (tasks: Task[]): string => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ToDoVQ//Local First GTD//EN',
  ];

  tasks.forEach((task) => {
    if (!task.dueDate) return;
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${task.id}@todovq.local`);
    lines.push(`DTSTAMP:${formatICSDate(task.createdAt)}`);
    lines.push(`DTSTART:${formatICSDate(task.dueDate)}`);
    lines.push(`SUMMARY:${task.title}`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
};
