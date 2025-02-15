import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(...input));
}

export function formatDate(
  date: string | number | Date,
  {
    locales = 'en-US',
    dateStyle = 'medium',
  }: { locales?: string; dateStyle?: Intl.DateTimeFormatOptions['dateStyle'] } = {}
) {
  return new Intl.DateTimeFormat(locales, { dateStyle }).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

export function sortObjects<T>(arr: T[], prop: keyof T, order: 'asc' | 'desc') {
  return [...arr].sort((a, b) => {
    if (a[prop] > b[prop]) {
      return order === 'asc' ? 1 : -1;
    }
    if (a[prop] < b[prop]) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  });
}
