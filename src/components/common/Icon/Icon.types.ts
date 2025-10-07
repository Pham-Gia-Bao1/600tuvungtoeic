import { ReactNode, ComponentType } from 'react';

export interface IconProps {
  /** The icon name (e.g., 'search', 'menu') or a custom ReactNode. */
  name?: string;
  /** Custom icon component if not using a predefined name. */
  icon?: ReactNode | ComponentType<{ className?: string; size?: string | number; color?: string }> | React.ElementType;
  /** CSS class names for the icon SVG or element. */
  className?: string;
  /** Size of the icon (e.g., '16', '20', '24' for width/height in px). */
  size?: string | number;
  /** Color of the icon (e.g., 'currentColor', or hex/rgb). */
  color?: string;
  /** Whether the icon should be filled or stroked (for SVG icons). */
  variant?: 'default' | 'filled' | 'outlined';
  /** Additional props to pass to the underlying SVG or element. */
  [key: string]: unknown;
}