import React, { useState } from 'react';
import { ChatHeader } from '../../../features/chat/components/ChatHeader/ChatHeader';
import { ChatSidebar } from '../../../features/chat/components/ChatSidebar/ChatSidebar';
import { MessageInput } from '../../../features/chat/components/MessageInput/MessageInput';
import { MessageThread } from '../../../features/chat/components/MessageThread/MessageThread';
import { TypingIndicator } from '../../../features/chat/components/TypingIndicator/TypingIndicator';
import { useChat } from '../../../features/chat/hooks/useChat';

export const ChatLayout: React.FC = () => {
  const { chats, selectedChat, messages, currentUserId, typingUsers, isVisible, onSelectChat, onSendMessage, onTypingChange } = useChat();
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!selectedChat) {
    return (
      <div className="flex h-screen items-center justify-center text-[var(--color-text-secondary)]">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--color-bg-dark)]">
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChat.id}
        onSelectChat={onSelectChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader chat={selectedChat} />
        <MessageThread messages={messages} currentUserId={currentUserId} />
        <TypingIndicator typingUsers={typingUsers} isVisible={isVisible} />
        <MessageInput
          onSend={onSendMessage}
          onTypingChange={onTypingChange}
          currentChatId={selectedChat.id}
        />
      </div>
    </div>
  );
};