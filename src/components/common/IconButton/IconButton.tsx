import React, { forwardRef } from 'react';
import { IconButtonProps } from './IconButton.types';
import { Icon } from '../Icon/Icon'; // Import the new Icon component

const getVariantClasses = (variant: IconButtonProps['variant'] = 'ghost', disabled: boolean = false): string => {
  if (disabled) return 'opacity-50 cursor-not-allowed';
  const variants = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white border border-[var(--color-primary)]',
    secondary: 'bg-[var(--color-surface)] hover:bg-[var(--color-bg-light)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
    ghost: 'bg-transparent hover:bg-[var(--color-bg-light)] text-[var(--color-text-primary)]',
    destructive: 'bg-red-500 hover:bg-red-600 text-white border border-red-500',
  };
  return variants[variant] || variants.ghost;
};

const getSizeClasses = (size: IconButtonProps['size'] = 'md'): string => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  return sizes[size] || sizes.md;
};

const getShapeClasses = (rounded: boolean = false): string => rounded ? 'rounded-full' : 'rounded-lg';

const getIconSize = (size: IconButtonProps['size'] = 'md'): number => {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  return sizes[size] || 20;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      onClick,
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      variant = 'ghost',
      size = 'md',
      disabled = false,
      loading = false,
      className = '',
      type = 'button',
      title,
      rounded = true,
      ...props
    },
    ref
  ) => {
    const iconSize = getIconSize(size);
    const iconClass = `flex-shrink-0`;
    const isStringIcon = typeof icon === 'string';

    const variantClasses = getVariantClasses(variant, disabled);
    const sizeClasses = getSizeClasses(size);
    const shapeClasses = getShapeClasses(rounded);
    const fullClasses = `inline-flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:focus:ring-0 transition-colors ${variantClasses} ${sizeClasses} ${shapeClasses} ${className}`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      onClick?.(e);
    };

    const ariaProps = {
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
    };

    const iconElement = loading ? (
      <svg className={`${iconClass} animate-spin`} viewBox="0 0 24 24" width={iconSize} height={iconSize}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ) : isStringIcon ? (
      <Icon name={icon} size={iconSize} className={iconClass} aria-hidden="true" />
    ) : (
      <Icon icon={icon} size={iconSize} className={iconClass} aria-hidden="true" />
    );

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled || loading}
        className={fullClasses}
        title={title || ariaLabel}
        {...ariaProps}
        {...props}
      >
        {iconElement}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonProps } from './IconButton.types';