import React from 'react';
import { BadgeProps } from './Badge.types';

const getVariantClasses = (variant: BadgeProps['variant'] = 'primary', outlined: boolean = false): string => {
  const base = outlined ? 'border-2' : 'bg-';
  const variants = {
    unread: `${base}blue-500 text-white border-blue-500`,
    online: `${base}green-500 text-white border-green-500`,
    offline: `${base}gray-500 text-white border-gray-500`,
    primary: `${base}blue-500 text-white border-blue-500`,
    secondary: `${base}gray-600 text-white border-gray-600`,
    success: `${base}green-500 text-white border-green-500`,
    error: `${base}red-500 text-white border-red-500`,
    warning: `${base}yellow-500 text-white border-yellow-500`,
  };
  return variants[variant] || variants.primary;
};

const getSizeClasses = (size: BadgeProps['size'] = 'md'): string => {
  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  return sizes[size] || sizes.md;
};

const getShapeClasses = (shape: BadgeProps['shape'] = 'rounded'): string => {
  const shapes = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded',
  };
  return shapes[shape] || shapes.rounded;
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  outlined = false,
  className = '',
  hiddenIfEmpty = false,
  'aria-label': ariaLabel,
  role = 'status',
}) => {
  // Hide if empty and hiddenIfEmpty is true (e.g., for unread count of 0)
  if (hiddenIfEmpty && (!children || (typeof children === 'number' && children === 0))) {
    return null;
  }

  const variantClasses = getVariantClasses(variant, outlined);
  const sizeClasses = getSizeClasses(size);
  const shapeClasses = getShapeClasses(shape);
  const fullClasses = `inline-flex items-center justify-center font-medium ${variantClasses} ${sizeClasses} ${shapeClasses} ${className}`;

  // For numbers > 99, show '99+' to save space
  const displayChildren = typeof children === 'number' ? (children > 99 ? '99+' : children) : children;

  return (
    <span className={fullClasses} aria-label={ariaLabel} role={role}>
      {displayChildren}
    </span>
  );
};

export { Badge };
export type { BadgeProps } from './Badge.types';