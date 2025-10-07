import React from 'react';
import { TimestampProps } from './Timestamp.types';
import { formatDistanceToNow, format, isValid } from 'date-fns'; // Assume date-fns is installed; fallback to native if not
import { enUS } from 'date-fns/locale'; // Default locale

const Timestamp: React.FC<TimestampProps> = ({
  timestamp,
  format: fmt = 'short',
  customFormat,
  relative = false,
  className = '',
  prefix,
  suffix,
  locale = 'en-US',
  capitalize = false,
  fallback = 'Invalid date',
//   now = new Date(),
}) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const isValidDate = isValid(date);

  if (!isValidDate) {
    return (
      <time className={className} dateTime={fallback}>
        {fallback}
      </time>
    );
  }

  let formatted: string;

  if (customFormat) {
    formatted = format(date, customFormat, { locale: enUS });
  } else {
    switch (fmt) {
      case 'short':
        formatted = relative
          ? formatDistanceToNow(date, { addSuffix: true, locale: enUS })
          : format(date, 'MMM d, yyyy', { locale: enUS });
        break;
      case 'time':
        formatted = format(date, 'p', { locale: enUS }); // e.g., 3:45 PM
        break;
      case 'full':
        formatted = format(date, 'MMM d, yyyy, p', { locale: enUS });
        break;
      case 'date':
        formatted = format(date, 'MMM d, yyyy', { locale: enUS });
        break;
      default:
        formatted = format(date, 'MMM d, yyyy, p', { locale: enUS });
    }
  }

  if (capitalize) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  const content = (
    <>
      {prefix}
      <time dateTime={date.toISOString()} className={className} title={date.toLocaleString(locale)}>
        {formatted}
      </time>
      {suffix}
    </>
  );

  return <>{content}</>;
};

export { Timestamp };
export type { TimestampProps } from './Timestamp.types';