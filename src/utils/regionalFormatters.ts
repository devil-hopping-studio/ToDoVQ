export function formatDate(value: Date | string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value));
}

export function formatTime(value: Date | string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(new Date(value));
}
