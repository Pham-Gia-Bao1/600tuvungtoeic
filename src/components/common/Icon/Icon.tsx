import React from 'react';
import { IconProps } from './Icon.types';
import type { LucideProps } from 'lucide-react';
import {
  Search,
  Menu,
  X,
  Send,
  MoreVertical,
  Smile,
  Paperclip,
  Users,
  BookOpen,
  Headphones,
  Newspaper,
  Award,
} from 'lucide-react';


// Define Lucide-like props interface
interface LucideIconProps extends LucideProps {
  className?: string;
  size?: string | number;
  color?: string;
}

// Map icon string keys -> Lucide components
const ICON_MAP: Record<string, React.ComponentType<LucideIconProps>> = {
  search: Search,
  menu: Menu,
  close: X,
  send: Send,
  'more-vertical': MoreVertical,
  emoji: Smile,
  attach: Paperclip,
  users: Users,
  'book-open': BookOpen,
  headphones: Headphones,
  newspaper: Newspaper,
  award: Award,
};

// Fallback SVG for unknown icons
const FallbackIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 20,
  color = 'currentColor',
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const Icon: React.FC<IconProps> = ({
  name,
  icon,
  className = '',
  size = 20,
  color = 'currentColor',
  variant = 'default',
  ...props
}) => {
  let IconComponent:
    | React.ComponentType<LucideIconProps>
    | React.FC<{ className?: string; style?: React.CSSProperties }>;

  if (icon) {
    // If passed a custom ReactNode or component
    const CustomIcon = () =>
      React.cloneElement(icon as React.ReactElement, {
        className,
        style: { width: size, height: size, color },
      });
    IconComponent = CustomIcon;
  } else if (name) {
    // Lookup in ICON_MAP or fallback
    IconComponent = (ICON_MAP[name] || FallbackIcon) as React.ComponentType<LucideIconProps>;
  } else {
    return null;
  }

  // Variant support (filled vs stroke)
  const variantProps =
    variant === 'filled'
      ? { fill: color }
      : { stroke: color, fill: 'none' };

  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
      {...variantProps}
      {...props}
      aria-hidden="true"
    />
  );
};
