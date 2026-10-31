import { Task, TaskPriority, GTDBucket, RecurrenceConfig, RecurrenceUnit, EisenhowerQuadrant } from '../../models/Task';

export const parseNaturalLanguageTask = (rawInput: string): Task => {
  const now = Date.now();
  let cleanTitle = rawInput.trim();
  let priority: TaskPriority = 'none';
  let isUrgent = false;
  let isImportant = false;
  let bucket: GTDBucket = 'inbox';
  let dueDate: number | undefined = undefined;
  let recurrence: RecurrenceConfig = { type: 'one_off' };
  const tags: string[] = [];

  // Extract #tags
  const tagMatches = cleanTitle.match(/#[a-zA-Z0-9_-]+/g);
  if (tagMatches) {
    tagMatches.forEach((tag) => {
      tags.push(tag.slice(1).toLowerCase());
      cleanTitle = cleanTitle.replace(tag, '');
    });
  }

  // Extract priority markers (!high, !urgent, !medium, !low)
  if (/\b(urgent|asap|!high|!1)\b/i.test(cleanTitle)) {
    priority = 'high';
    isUrgent = true;
    isImportant = true;
    cleanTitle = cleanTitle.replace(/\b(urgent|asap|!high|!1)\b/gi, '');
  } else if (/\b(important|!medium|!2)\b/i.test(cleanTitle)) {
    priority = 'medium';
    isImportant = true;
    cleanTitle = cleanTitle.replace(/\b(important|!medium|!2)\b/gi, '');
  } else if (/\b(!low|!3)\b/i.test(cleanTitle)) {
    priority = 'low';
    cleanTitle = cleanTitle.replace(/\b(!low|!3)\b/gi, '');
  }

  // Extract Recurrence ("every 2 days", "every week", "every 30 minutes")
  const recurrenceRegex = /\bevery\s+(\d+)?\s*(second|minute|hour|day|week|month|year)s?\b/i;
  const recMatch = cleanTitle.match(recurrenceRegex);
  if (recMatch) {
    const val = recMatch[1] ? parseInt(recMatch[1], 10) : 1;
    const rawUnit = recMatch[2].toLowerCase();
    const unit = (rawUnit.endsWith('s') ? rawUnit : `${rawUnit}s`) as RecurrenceUnit;
    recurrence = {
      type: 'repeating',
      intervalValue: val,
      intervalUnit: unit,
    };
    dueDate = now + 3600 * 1000;
    bucket = 'scheduled';
    cleanTitle = cleanTitle.replace(recurrenceRegex, '');
  }

  // Extract Relative Dates ("today", "tomorrow")
  if (/\btoday\b/i.test(cleanTitle)) {
    dueDate = now;
    bucket = 'next_action';
    cleanTitle = cleanTitle.replace(/\btoday\b/gi, '');
  } else if (/\btomorrow\b/i.test(cleanTitle)) {
    dueDate = now + 86400 * 1000;
    bucket = 'scheduled';
    cleanTitle = cleanTitle.replace(/\btomorrow\b/gi, '');
  }

  // Determine Eisenhower Quadrant
  let quadrant: EisenhowerQuadrant = 'eliminate';
  if (isUrgent && isImportant) quadrant = 'do_first';
  else if (!isUrgent && isImportant) quadrant = 'schedule';
  else if (isUrgent && !isImportant) quadrant = 'delegate';

  cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim() || 'Untitled Task';

  return {
    id: `task_${now}_${Math.random().toString(36).slice(2, 9)}`,
    title: cleanTitle,
    bucket,
    priority,
    quadrant,
    isUrgent,
    isImportant,
    isCompleted: false,
    dueDate,
    recurrence,
    tags,
    createdAt: now,
    updatedAt: now,
  };
};
