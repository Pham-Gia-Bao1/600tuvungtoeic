import { ReactNode } from 'react';

export interface StatusIndicatorProps {
  /** The status to display ('online', 'offline', 'away'). */
  status: 'online' | 'offline' | 'away';
  /** Size of the indicator ('sm', 'md', 'lg'). */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show a label text next to the indicator (e.g., 'Online'). */
  withLabel?: boolean;
  /** Custom label text if withLabel is true. */
  label?: string;
  /** Additional class names for the container. */
  className?: string;
  /** Icon component or element to use instead of default dot. */
  icon?: ReactNode;
  /** Whether the indicator is clickable (e.g., for tooltip). */
  clickable?: boolean;
  /** Title/tooltip for the indicator. */
  title?: string;
  /** ARIA label for accessibility. */
  'aria-label'?: string;
}