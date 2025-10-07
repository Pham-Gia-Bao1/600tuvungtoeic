import React from 'react';
import { HeaderActionsProps } from '../../types/chat.types';
import { IconButton } from '@/components/common/IconButton/IconButton';

export const HeaderActions: React.FC<HeaderActionsProps> = ({ onSearch, onMenu }) => {
  return (
    <div className="flex gap-2">
      <IconButton icon="search" onClick={onSearch} aria-label="Search messages" />
      <IconButton icon="menu" onClick={onMenu} aria-label="Chat menu" />
    </div>
  );
};