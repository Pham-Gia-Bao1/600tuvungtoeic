import React from 'react';
import { GroupBannerProps } from './GroupBanner.types';
import { Avatar } from '../Avatar/Avatar'; // Assuming Avatar is in common/

const DEFAULT_MAX = 3;
const DEFAULT_SIZE = 'md' as const;
const DEFAULT_OVERLAP = '-0.5rem';
const DEFAULT_GAP = '0.25rem';

export const GroupBanner: React.FC<GroupBannerProps> = ({
  participants = [],
  maxAvatars = DEFAULT_MAX,
  showOverflow = true,
  size = DEFAULT_SIZE,
  gap = DEFAULT_GAP,
  overlap = DEFAULT_OVERLAP,
  className = '',
  AvatarComponent = Avatar,
  overflowRenderer,
}) => {
  const displayParticipants = participants.slice(0, maxAvatars);
  const overflowCount = Math.max(0, participants.length - maxAvatars);

  const avatarClass = `relative z-0 ${size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'}`;

  const containerClass = `flex -space-x-2 ${className}`; // Negative space for overlap

  const renderOverflow = (count: number) => {
    if (!showOverflow || count === 0) return null;
    if (overflowRenderer) return overflowRenderer(count);

    return (
      <div className={`flex items-center justify-center ${avatarClass} bg-[var(--color-primary)] text-white border-2 border-[var(--color-surface)] rounded-full font-medium text-xs`}>
        +{count}
      </div>
    );
  };

  return (
    <div className={containerClass} style={{ marginRight: overlap }}>
      {displayParticipants.map((participant, index) => (
        <AvatarComponent
          key={participant.id || index}
          src={participant.avatar}
          alt={participant.name}
          size={size}
          className={`border-2 border-[var(--color-surface)] ${index !== 0 ? `ml-${gap}` : ''}`} // Gap only after first
        />
      ))}
      {renderOverflow(overflowCount)}
    </div>
  );
};