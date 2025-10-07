import React from 'react';
import { DateDividerProps } from './DateDivider.types';

const getFormattedDate = (
  dateInput: Date | string,
  format: DateDividerProps['format'] = 'relative',
  customFormat?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US'
): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const isValidDate = !isNaN(date.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  if (!isValidDate) return 'Invalid Date';

  let formatted: string;

  if (customFormat) {
    const formatter = new Intl.DateTimeFormat(locale, customFormat);
    formatted = formatter.format(date);
  } else {
    switch (format) {
      case 'short': {
        formatted = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date); // e.g., "Oct 7"
        break;
      }
      case 'full': {
        formatted = new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(date); // e.g., "October 7, 2025"
        break;
      }
      case 'relative': {
        const diffTime = inputDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0) formatted = 'Today';
        else if (diffDays === -1) formatted = 'Yesterday';
        else if (diffDays > -7) formatted = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date); // e.g., "Monday"
        else formatted = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date);
        break;
      }
      default: {
        formatted = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date);
        break;
      }
    }
  }

  return formatted;
};

export const DateDivider: React.FC<DateDividerProps> = ({
  date,
  format = 'relative',
  customFormat,
  className = '',
  prefix,
  suffix,
  locale = 'en-US',
  withLine = true,
  // fallback = 'Unknown Date',
}) => {
  const formattedDate = getFormattedDate(date, format, customFormat, locale);

  const lineClass = withLine
    ? 'relative before:absolute before:inset-0 before:top-1/2 before:h-px before:bg-[var(--color-border)] before:-translate-x-1/2 before:translate-y-1/2'
    : '';

  const textClass = `relative z-10 px-2 bg-[var(--color-bg-light)] text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide`;

  const content = (
    <>
      {prefix}
      <span>{formattedDate}</span>
      {suffix}
    </>
  );

  return (
    <div className={`flex justify-center my-4 ${lineClass} ${className}`}>
      <div className={textClass}>{content}</div>
    </div>
  );
};