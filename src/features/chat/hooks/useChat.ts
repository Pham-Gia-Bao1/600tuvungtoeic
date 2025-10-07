import { useState, useEffect } from 'react';
import { Chat } from '../types/chat.types';
import { mockChats } from '../data/mockData';
import { useMessages } from './useMessages';
import { useTypingStatus } from './useTypingStatus';
import { sortChatsByLastMessage } from '../utils/chatHelpers';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>(mockChats[0]?.id || '');

  const [currentUserId] = useState<string>('current'); // Removed unused setter
  const { messages, loadMessages } = useMessages(selectedChatId);
  const { typingUsers, onTypingChange } = useTypingStatus(selectedChatId);

  const onSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    loadMessages(chatId);
  };

  const onSendMessage = (text: string) => {
    // Mock send: In real, integrate with service/store
    console.log('Mock send:', text);
  };

  useEffect(() => {
    // Initialize with mock data
    const sortedChats = sortChatsByLastMessage(mockChats);
    setChats(sortedChats);
    if (sortedChats.length > 0) {
      setSelectedChatId(sortedChats[0].id);
    }
  }, []);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return {
    chats,
    selectedChat,
    selectedChatId,
    messages,
    currentUserId,
    typingUsers,
    onSelectChat,
    onSendMessage,
    onTypingChange,
    isVisible: typingUsers.length > 0,
  };
};