import React, { useState } from 'react';
import { ChatSidebarProps, Chat } from '../../types/chat.types';
import { ChatList } from './ChatList';
import { Input } from '@/components/common/Input/Input';

export const ChatSidebar: React.FC<ChatSidebarProps> = React.memo(({
  chats,
  selectedChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [localCollapsed, setLocalCollapsed] = useState(isCollapsed);

  const handleToggle = () => {
    setLocalCollapsed(!localCollapsed);
    onToggleCollapse?.();
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col h-full text-[var(--color-text-primary)]">
      <div className="p-4 border-b border-[var(--color-border)]">
        <Input
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onSearchChange(e.target.value)}
          placeholder="Search chats"
          className="input" // Uses .input from layers
        />
      </div>
      <ChatList chats={filteredChats} selectedChatId={selectedChatId} onSelect={(chat: Chat) => onSelectChat(chat.id)} />
      <button
        onClick={handleToggle}
        className="btn-primary mt-auto p-2 m-2" // Uses .btn-primary
      >
        {localCollapsed ? 'Expand' : 'Collapse'}
      </button>
    </div>
  );
});
ChatSidebar.displayName = 'ChatSidebar';