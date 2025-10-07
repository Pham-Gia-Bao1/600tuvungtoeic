import React from 'react';
import { TypingIndicatorProps } from '../../types/chat.types';

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingUsers, isVisible }) => {
  if (!isVisible || typingUsers.length === 0) return null;

  return (
    <div className="flex items-center gap-1 p-3 text-sm text-gray-500">
      <div className="flex gap-1">
        {typingUsers.map((_, i) => (
          <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
      <span>{typingUsers.length > 1 ? `${typingUsers[0]} and ${typingUsers.length - 1} others` : `${typingUsers[0]}`} is typing...</span>
    </div>
  );
};