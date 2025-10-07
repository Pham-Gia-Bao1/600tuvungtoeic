import React, { useRef, useEffect } from 'react';
import { MessageGroup } from './MessageGroup';
import { Message, MessageThreadProps } from '../../types/chat.types';
import { DateDivider } from '@/components/common/DateDivider/DateDivider';

export const MessageThread: React.FC<MessageThreadProps> = ({ messages, currentUserId, onLoadMore }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const groupedMessages = messages.reduce((acc, msg) => {
    // Group logic by sender and time
    const key = `${msg.senderId}-${new Date(msg.timestamp).toDateString()}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
      {Object.entries(groupedMessages).map(([date, group]) => (
        <div key={date}>
          <DateDivider date={date} />
          <MessageGroup messages={group} currentUserId={currentUserId} />
        </div>
      ))}
      {onLoadMore && <button onClick={onLoadMore} className="m-2 p-2 bg-gray-300">Load More</button>}
    </div>
  );
};