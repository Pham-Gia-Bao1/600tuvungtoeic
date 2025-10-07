import React from 'react';
import { GroupInfo } from './GroupInfo';
import { HeaderActions } from './HeaderActions';
import { ChatHeaderProps } from '../../types/chat.types';

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack }) => {
  return (
    <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] p-4 flex items-center justify-between text-[var(--color-text-primary)]">
      <button onClick={onBack} className="mr-2">← Back</button> {/* IconButton */}
      <GroupInfo chatName={chat.name} participants={chat.participants} />
      <HeaderActions onSearch={() => {}} onMenu={() => {}} />
    </div>
  );
};