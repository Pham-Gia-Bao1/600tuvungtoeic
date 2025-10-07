import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange, onKeyPress, placeholder, disabled = false }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className="input flex-1 resize-none max-h-32 overflow-y-auto"
      rows={1}
    />
  );
};