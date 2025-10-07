import React from 'react';
import { GroupInfoProps } from '../../types/chat.types';
import { GroupBanner } from '@/components/common/GroupBanner/GroupBanner';

export const GroupInfo: React.FC<GroupInfoProps> = ({ chatName, participants }) => {
  return (
    <div className="flex items-center gap-2">
      <GroupBanner participants={participants.slice(0, 3)} /> {/* Shows first 3 avatars */}
      <span className="font-semibold">{chatName}</span>
    </div>
  );
};