import { Chat } from '../types/chat.types';

export const sortChatsByLastMessage = (chats: Chat[]): Chat[] => {
  return chats.sort((a, b) => new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime());
};

export const getUnreadCount = (chat: Chat): number => chat.unreadCount || 0;