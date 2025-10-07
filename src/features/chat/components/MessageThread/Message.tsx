import React from 'react';
import { MessageProps } from '../../types/chat.types';
import Avatar from '@/components/common/Avatar/Avatar';
import { Timestamp } from '@/components/common/Timestamp/Timestamp';


export const Message: React.FC<MessageProps> = ({ message, isOwn, isLastInGroup }) => {
  const alignment = isOwn ? 'justify-end' : 'justify-start';
  const bubbleClass = isOwn
    ? 'bg-blue-500 text-white ml-12'
    : 'bg-white dark:bg-gray-700 text-gray-900 mr-12';

  return (
    <div className={`flex ${alignment} gap-2 mb-2 ${isLastInGroup ? '' : 'mb-0'}`}>
      {!isOwn && <Avatar src={message.senderAvatar} size="xs" alt={message.sender.name} />}
      <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${bubbleClass}`}>
        <p className="text-sm">{message.text}</p>
        <Timestamp timestamp={message.timestamp} format="time" className="text-xs opacity-75 mt-1 block" />
      </div>
      {isOwn && <Avatar src={message.senderAvatar} size="xs" className="order-first" alt={message.sender.name} />}
    </div>
  );
};