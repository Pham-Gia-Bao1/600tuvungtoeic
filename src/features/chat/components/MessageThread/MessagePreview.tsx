import React from 'react';
import { MessagePreviewProps } from '../../types/chat.types';
import { Badge } from '@/components/common/Badge/Badge';

export const MessagePreview: React.FC<MessagePreviewProps> = ({ message, isUnread }) => {
  return (
    <div className="p-2 text-sm text-gray-500 truncate">
      {message.senderName}: {message.text}
      {isUnread && <Badge variant="unread" className="ml-2">New</Badge>}
    </div>
  );
};