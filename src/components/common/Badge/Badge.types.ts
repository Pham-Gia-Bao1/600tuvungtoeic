import { ReactNode } from 'react';

export interface BadgeProps {
  /** The content to display inside the badge (e.g., number, text, icon). */
  children: ReactNode;
  /** Variant style for the badge (e.g., 'unread', 'online', 'offline', 'primary'). */
  variant?: 'unread' | 'online' | 'offline' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /** Size of the badge ('sm', 'md', 'lg'). */
  size?: 'sm' | 'md' | 'lg';
  /** Shape of the badge ('rounded', 'pill', 'square'). */
  shape?: 'rounded' | 'pill' | 'square';
  /** Whether the badge is outlined (border only). */
  outlined?: boolean;
  /** Additional class names for custom styling. */
  className?: string;
  /** Whether to hide the badge if children is falsy or zero. */
  hiddenIfEmpty?: boolean;
  /** Accessibility label for screen readers. */
  'aria-label'?: string;
  /** Role for the badge (defaults to 'status' for variants like online/offline). */
  role?: string;
}