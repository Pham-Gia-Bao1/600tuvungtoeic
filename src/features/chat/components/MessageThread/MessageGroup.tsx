import React from 'react';
import { MessageGroupProps } from '../../types/chat.types';
import { Message as MessageComponent } from './Message'; 

export const MessageGroup: React.FC<MessageGroupProps> = ({ messages, currentUserId }) => {
  const isOwnGroup = messages[0].senderId === currentUserId;
  const isLastInGroup = (index: number) => index === messages.length - 1; // Simplified: No need for msg param

  return (
    <div className={isOwnGroup ? 'flex flex-col items-end' : 'flex flex-col items-start'}>
      {messages.map((msg, index) => (
        <MessageComponent
          key={msg.id}
          message={msg}
          isOwn={isOwnGroup}
          isLastInGroup={isLastInGroup(index)}
        />
      ))}
    </div>
  );
};