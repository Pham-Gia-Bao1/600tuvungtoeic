import React from 'react';
import { IconProps } from './Icon.types';
// Import icon library; assume lucide-react installed
import type { LucideProps } from 'lucide-react'; // Import type for Lucide props
import { Search, Menu, X, Send, MoreVertical, Smile, Paperclip } from 'lucide-react'; // Added emoji and attach icons

// Define Lucide-like props interface
interface LucideIconProps extends LucideProps {
  className?: string;
  size?: string | number;
  color?: string;
}

// Icon map for string-based names (typed with Lucide props)
const ICON_MAP: Record<string, React.ComponentType<LucideIconProps>> = {
  search: Search,
  menu: Menu,
  close: X,
  send: Send,
  'more-vertical': MoreVertical,
  emoji: Smile,
  attach: Paperclip,
  // Add more as needed
};

// Fallback SVG for unknown icons (simple placeholder circle)
const FallbackIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
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
  let IconComponent: React.ComponentType<LucideIconProps> | React.FC<{ className?: string; style?: React.CSSProperties }>;

  if (icon) {
    // Custom icon provided (assume it's a component or element)
    const CustomIcon = () => React.cloneElement(icon as React.ReactElement, {
      className,
      style: { width: size, height: size, color }
    });
    IconComponent = CustomIcon;
  } else if (name) {
    // Use map or fallback
    IconComponent = (ICON_MAP[name] || FallbackIcon) as React.ComponentType<LucideIconProps>;
  } else {
    // No icon/name, render nothing
    return null;
  }

  // Variant adjustments (e.g., for filled: change fill/stroke)
  const variantProps = variant === 'filled' ? { fill: color } : { stroke: color, fill: 'none' };

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