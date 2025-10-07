import { ReactNode, MouseEvent } from 'react';

export interface IconButtonProps {
  /** The icon to display (string name for built-in icons, e.g., 'search', or ReactNode for custom). */
  icon: string | ReactNode;
  /** Callback fired on button click. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** ARIA label for accessibility. */
  'aria-label'?: string;
  /** ARIA description for expanded state (e.g., for toggle buttons). */
  'aria-expanded'?: boolean;
  /** ARIA controls for linked elements. */
  'aria-controls'?: string;
  /** Variant style ('primary', 'secondary', 'ghost', 'destructive'). */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  /** Size of the button ('sm', 'md', 'lg'). */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button is loading (shows spinner). */
  loading?: boolean;
  /** Custom class names. */
  className?: string;
  /** Type of button ('button' default, 'submit', 'reset'). */
  type?: 'button' | 'submit' | 'reset';
  /** Custom icon component if icon is string. */
  iconComponent?: React.ComponentType<{ className?: string }>;
  /** Tooltip text for hover (requires title or separate Tooltip component). */
  title?: string;
  /** Whether to use rounded-full shape. */
  rounded?: boolean;
}