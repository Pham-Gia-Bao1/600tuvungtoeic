import { ReactNode } from 'react';

export interface DateDividerProps {
  /** The date to display, as a Date object or ISO/date string. */
  date: Date | string;
  /** Format preset: 'short' (e.g., 'Oct 7'), 'full' (e.g., 'October 7, 2025'), 'relative' (e.g., 'Today', 'Yesterday'). */
  format?: 'short' | 'full' | 'relative';
  /** Custom format string using Intl.DateTimeFormat options or date-fns tokens. */
  customFormat?: Intl.DateTimeFormatOptions;
  /** Additional class names for the divider container. */
  className?: string;
  /** Prefix text (e.g., 'Messages on '). */
  prefix?: ReactNode;
  /** Suffix text (e.g., 'Continue'). */
  suffix?: ReactNode;
  /** Locale for formatting (e.g., 'en-US'). Defaults to 'en-US'. */
  locale?: string;
  /** Whether to add a horizontal line above/below the date. */
  withLine?: boolean;
  /** Fallback text if date is invalid. */
  fallback?: string;
}