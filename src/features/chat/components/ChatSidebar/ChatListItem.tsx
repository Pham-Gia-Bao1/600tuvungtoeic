import React from 'react';
import { ChatListItemProps } from '../../types/chat.types';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { Timestamp } from '@/components/common/Timestamp/Timestamp';
import { Badge } from '@/components/common/Badge/Badge';
import { StatusIndicator } from '@/components/common/StatusIndicator/StatusIndicator';

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onSelect }) => {
  const itemClass = `w-full p-3 flex items-center gap-3 hover:bg-[var(--color-bg-light)] transition-colors ${
    isActive ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-primary)]'
  }`;

  const nameClass = isActive ? 'text-white' : 'text-[var(--color-text-primary)]';

  return (
    <button onClick={() => onSelect(chat)} className={itemClass}>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Avatar src={chat.avatar} alt={chat.name} size="sm" />
        <StatusIndicator status={chat.participants[0]?.status || 'offline'} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium truncate ${nameClass}`}>{chat.name}</span>
          <div className="flex items-center gap-2">
            <Timestamp timestamp={chat.lastMessageTime || new Date()} format="short" />
            {chat.unreadCount > 0 && (
              <Badge variant="unread" size="sm" aria-label={`${chat.unreadCount} unread messages`}>
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] truncate">
          {chat.lastMessage?.text || 'No messages yet'}
        </p>
      </div>
    </button>
  );
};