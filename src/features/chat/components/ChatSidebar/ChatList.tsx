import React from 'react';
import { ChatListProps } from '../../types/chat.types';
import { ChatListItem } from './ChatListItem';

export const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} isActive={chat.id === selectedChatId} onSelect={() => onSelect(chat)} />
      ))}
    </div>
  );
};