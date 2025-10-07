import React, { useState } from 'react';
import { InputField } from './InputField';
import { MessageInputProps } from '../../types/chat.types';
import { InputActions } from '@/components/common/InputActions/InputActions';
import { Button } from '@/components/common/Button/Button';

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, onTypingChange, currentChatId }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    const typing = newValue.length > 0;
    onTypingChange(typing);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 flex items-end gap-2">
      <InputActions onEmoji={() => {}} onAttach={() => {}} />
      <InputField
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        disabled={!currentChatId}
      />
      <Button onClick={handleSend} disabled={!value.trim()} variant="primary">
        Send
      </Button>
    </div>
  );
};