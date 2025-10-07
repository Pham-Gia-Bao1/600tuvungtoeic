import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** The button content (text, icon, or ReactNode). */
  children: ReactNode;
  /** Variant style ('primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'). */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Size of the button ('sm', 'md', 'lg'). */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button is loading (shows spinner). */
  loading?: boolean;
  /** Custom class names. */
  className?: string;
  /** Whether to use full width. */
  fullWidth?: boolean;
  /** Icon component or element (renders before children). */
  icon?: ReactNode;
  /** Whether to square the button (no text, icon only). */
  square?: boolean;
  /** Shape ('rounded', 'rounded-full', 'square'). */
  shape?: 'rounded' | 'rounded-full' | 'square';
  /** Type of button ('button' default, 'submit', 'reset'). */
  type?: 'button' | 'submit' | 'reset';
}