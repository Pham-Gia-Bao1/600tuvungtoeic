import React, { forwardRef, useId } from 'react';
import { InputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder = '',
      type = 'text',
      disabled = false,
      required = false,
      name,
      className = '',
      prefix,
      suffix,
      maxLength,
      hasError = false,
      errorMessage,
      inputMode,
      multiline = false,
      rows = 1,
      autoFocus = false,
      readOnly = false,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const baseClasses = 'input'; // Uses the predefined .input class from global styles
    const errorClasses = hasError ? 'border-red-500 focus:border-red-500' : '';
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const fullClasses = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;

    const commonProps = {
      id: inputId,
      name,
      placeholder,
      disabled,
      required,
      maxLength,
      inputMode,
      autoFocus,
      readOnly,
      onChange,
      onBlur,
      onFocus,
      className: 'flex-1',
      ...props,
    };

    const renderInput = () => {
      if (multiline) {
        return (
          <textarea
            {...commonProps}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => onChange?.(e as React.ChangeEvent<HTMLTextAreaElement>)} // Type assertion for textarea
          />
        );
      }

      return (
        <input
          {...commonProps}
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          value={value}
          defaultValue={defaultValue}
        />
      );
    };

    return (
      <div className="relative flex items-center w-full">
        {prefix && <span className="absolute left-3 z-10 pointer-events-none">{prefix}</span>}
        <div className={fullClasses}>
          {renderInput()}
        </div>
        {suffix && <span className="absolute right-3 z-10 pointer-events-none">{suffix}</span>}
        {hasError && errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps } from './Input.types';