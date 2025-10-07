import React from 'react';
import { StatusIndicatorProps } from './StatusIndicator.types';

const getStatusClasses = (status: StatusIndicatorProps['status'], size: StatusIndicatorProps['size'] = 'sm'): string => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };
  const sizeClass = sizes[size] || sizes.sm;

  const statusClasses = {
    online: 'bg-green-500 animate-pulse',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  return `${sizeClass} rounded-full ${statusClasses[status] || statusClasses.offline}`;
};

const getLabelText = (status: StatusIndicatorProps['status'], customLabel?: string): string => {
  if (customLabel) return customLabel;
  const labels = {
    online: 'Online',
    offline: 'Offline',
    away: 'Away',
  };
  return labels[status] || 'Unknown';
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'sm',
  withLabel = false,
  label,
  className = '',
  icon,
  clickable = false,
  title = getLabelText(status, label),
  'aria-label': ariaLabel = title,
}) => {
  const indicatorClass = getStatusClasses(status, size);
  const containerClass = `flex items-center gap-1 ${clickable ? 'cursor-pointer' : ''} ${className}`;
  const IndicatorElement = icon || <div className={indicatorClass} />;

  const elementProps = {
    title,
    'aria-label': ariaLabel,
    role: 'img',
    'aria-hidden': withLabel ? false : true, // Fixed: Use booleans, not strings
  };

  return (
    <div className={containerClass}>
      <span {...elementProps}>{IndicatorElement}</span> {/* Removed duplication; clickable doesn't affect span props */}
      {withLabel && <span className="text-xs text-[var(--color-text-secondary)] capitalize">{getLabelText(status, label)}</span>}
    </div>
  );
};

export { StatusIndicator };
export type { StatusIndicatorProps } from './StatusIndicator.types';