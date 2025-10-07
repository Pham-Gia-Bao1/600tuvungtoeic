import { useState, useEffect } from 'react';
import { Message } from '../types/chat.types';
import { mockMessages } from '../data/mockData';

export const useMessages = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chatId) {
      // Mock load: Filter or fetch based on chatId
      const filteredMessages = mockMessages.filter((msg) => msg.senderId !== 'user3'); // Simulate for chat1
      setMessages(filteredMessages);
    } else {
      setMessages([]);
    }
    return () => setMessages([]);
  }, [chatId]);

  const loadMessages = (id: string) => {
    // Mock: In real, call chatService
    console.log('Mock load messages for:', id);
  };

  return { messages, loadMessages };
};