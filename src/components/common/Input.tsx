import React from "react";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type="text" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border px-3 py-2 rounded w-full"
    />
  );
};
