import { ChangeEvent, FocusEvent, ReactNode } from 'react';

export interface InputProps {
  /** The value of the input. */
  value?: string;
  /** The default value of the input. */
  defaultValue?: string;
  /** Callback fired when the value changes. */
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Callback fired when the input loses focus. */
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Callback fired when the input gains focus. */
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** The type of input (e.g., 'text', 'email', 'password'). */
  type?: string;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Whether the input is required. */
  required?: boolean;
  /** The input name attribute. */
  name?: string;
  /** Additional class names to apply. */
  className?: string;
  /** Prefix icon or element. */
  prefix?: ReactNode;
  /** Suffix icon or element. */
  suffix?: ReactNode;
  /** Maximum length of the input. */
  maxLength?: number;
  /** Whether to show error state. */
  hasError?: boolean;
  /** Error message for validation display (optional). */
  errorMessage?: string;
  /** Input mode for mobile (e.g., 'text', 'numeric'). */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** Whether it's a multiline input (renders as textarea). */
  multiline?: boolean;
  /** Number of rows for textarea. */
  rows?: number;
  /** Auto-focus the input. */
  autoFocus?: boolean;
  /** Read-only input. */
  readOnly?: boolean;
  /** ID for the input element. */
  id?: string;
}