import { ReactNode } from 'react';

export interface TimestampProps {
  /** The timestamp to format, as a Date object or ISO string. */
  timestamp: Date | string;
  /** Format preset: 'short' (e.g., '2h ago'), 'time' (e.g., '3:45 PM'), 'full' (e.g., 'Oct 7, 2025, 3:45 PM'). */
  format?: 'short' | 'time' | 'full' | 'date';
  /** Custom format string using date-fns tokens (requires date-fns import if custom). */
  customFormat?: string;
  /** Whether to show relative time (e.g., 'just now'). */
  relative?: boolean;
  /** Additional class names for styling. */
  className?: string;
  /** Prefix text (e.g., 'Sent: '). */
  prefix?: ReactNode;
  /** Suffix text (e.g., 'via mobile'). */
  suffix?: ReactNode;
  /** Locale for formatting (e.g., 'en-US'). */
  locale?: string;
  /** Whether to capitalize the output. */
  capitalize?: boolean;
  /** Fallback text if timestamp is invalid. */
  fallback?: string;
  /** Current date for relative calculations (defaults to now). */
  now?: Date;
}