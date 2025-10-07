import React from 'react';
import { ButtonProps } from './Button.types';
import { Spinner } from '../Spinner/Spinner';

const getVariantClasses = (variant: ButtonProps['variant'] = 'primary', disabled: boolean = false): string => {
  if (disabled) return 'opacity-50 cursor-not-allowed';
  const variants = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white border border-[var(--color-primary)]',
    secondary: 'bg-[var(--color-surface)] hover:bg-[var(--color-bg-light)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
    outline: 'bg-transparent hover:bg-[var(--color-bg-light)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
    ghost: 'bg-transparent hover:bg-[var(--color-bg-light)] text-[var(--color-text-primary)]',
    destructive: 'bg-red-500 hover:bg-red-600 text-white  border-red-500',
    link: 'bg-transparent hover:underline text-[var(--color-primary)]',
    light: 'bg-white hover:bg-gray-100 text-[var(--color-text-primary)] border border-gray-300',
  };
  return variants[variant] || variants.primary;
};

const getSizeClasses = (size: ButtonProps['size'] = 'md', square: boolean = false): string => {
  if (square) return 'w-10 h-10 p-0'; // Fixed size for square
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return sizes[size] || sizes.md;
};

const getShapeClasses = (shape: ButtonProps['shape'] = 'rounded'): string => {
  const shapes = {
    rounded: 'rounded-lg',
    'rounded-full': 'rounded-full',
    square: 'rounded',
  };
  return shapes[shape] || shapes.rounded;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  icon,
  square = false,
  shape = 'rounded',
  type = 'button',
  ...props
}) => {
  const variantClasses = getVariantClasses(variant, disabled);
  const sizeClasses = getSizeClasses(size, square);
  const shapeClasses = getShapeClasses(shape);
  const fullClasses = `inline-flex cursor-pointer items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:focus:ring-0 transition-colors ${variantClasses} ${sizeClasses} ${shapeClasses} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = loading ? (
    <Spinner size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} />
  ) : (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  return (
    <button type={type} disabled={disabled || loading} className={fullClasses} {...props}>
      {content}
    </button>
  );
};