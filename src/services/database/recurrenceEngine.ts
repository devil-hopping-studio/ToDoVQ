import { Task, RecurrenceUnit } from '../../models/Task';

export const calculateNextDueDate = (currentDueDate: number, unit: RecurrenceUnit, intervalValue: number = 1): number => {
  const date = new Date(currentDueDate);

  switch (unit) {
    case 'seconds':
      date.setSeconds(date.getSeconds() + intervalValue);
      break;
    case 'minutes':
      date.setMinutes(date.getMinutes() + intervalValue);
      break;
    case 'hours':
      date.setHours(date.getHours() + intervalValue);
      break;
    case 'days':
      date.setDate(date.getDate() + intervalValue);
      break;
    case 'weeks':
      date.setDate(date.getDate() + intervalValue * 7);
      break;
    case 'months':
      date.setMonth(date.getMonth() + intervalValue);
      break;
    case 'years':
      date.setFullYear(date.getFullYear() + intervalValue);
      break;
    default:
      break;
  }

  return date.getTime();
};

export const handleTaskCompletion = (task: Task): { updatedTask: Task; nextTask?: Task } => {
  const now = Date.now();

  if (task.recurrence.type === 'one_off' || !task.recurrence.intervalUnit || !task.recurrence.intervalValue) {
    return {
      updatedTask: {
        ...task,
        isCompleted: true,
        updatedAt: now,
      },
    };
  }

  const currentDueDate = task.dueDate || now;
  const nextDueDate = calculateNextDueDate(
    currentDueDate,
    task.recurrence.intervalUnit,
    task.recurrence.intervalValue
  );

  if (task.recurrence.endDate && nextDueDate > task.recurrence.endDate) {
    return {
      updatedTask: {
        ...task,
        isCompleted: true,
        updatedAt: now,
      },
    };
  }

  const nextTask: Task = {
    ...task,
    id: `task_${now}_${Math.random().toString(36).substr(2, 9)}`,
    isCompleted: false,
    dueDate: nextDueDate,
    createdAt: now,
    updatedAt: now,
  };

  return {
    updatedTask: {
      ...task,
      isCompleted: true,
      updatedAt: now,
    },
    nextTask,
  };
};
