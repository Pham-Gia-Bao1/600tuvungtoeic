import { useState, useEffect } from 'react';
import { TypingUser } from '../types/chat.types';
import { mockTypingUsers } from '../data/mockData';

export const useTypingStatus = (chatId: string | null) => {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

  useEffect(() => {
    if (chatId) {
      // Mock: Simulate typing
      const timer = setTimeout(() => setTypingUsers(mockTypingUsers.slice(0, 1)), 1000);
      return () => clearTimeout(timer);
    }
  }, [chatId]);

  const onTypingChange = (isTyping: boolean) => {
    if (isTyping) {
      setTypingUsers((prev) => [...prev, { userId: 'current', userName: 'You' }]);
    } else {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== 'current'));
    }
    // Mock emit: In real, WebSocket
  };

  const isVisible = typingUsers.length > 0;

  return { typingUsers, isVisible, onTypingChange };
};