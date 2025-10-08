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
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
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
  play: Play,
  pause: Pause,
  next: ArrowLeft,
  previous: ArrowRight,
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
    strokeLinecap="round"
    strokeLinejoin="round"
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
  variant = 'stroke', // default variant
  ...props
}) => {
  let IconComponent: React.ComponentType<LucideIconProps> | null = null;

  if (icon) {
    // Custom icon passed directly
    const CustomIcon = () =>
      React.cloneElement(icon as React.ReactElement, {
        className,
        style: { width: size, height: size, color },
      });
    IconComponent = CustomIcon;
  } else if (name) {
    // Lookup icon from map or fallback
    IconComponent = ICON_MAP[name] || FallbackIcon;
  }

  if (!IconComponent) return null;

  // Variant props: Lucide icons handle fill/stroke automatically
  const variantProps =
    variant === 'filled'
      ? { fill: color, stroke: 'none' }
      : { stroke: color, fill: 'none' };

  return (
    <IconComponent
      className={className}
      size={size}
      {...variantProps}
      {...props}
      aria-hidden="true"
    />
  );
};
