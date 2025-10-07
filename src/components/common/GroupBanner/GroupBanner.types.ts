import { ReactNode } from 'react';
import { User } from '../../../features/chat/types/chat.types'; // Adjust path if global User

export interface GroupBannerProps {
  /** Array of user objects to display avatars for. */
  participants: User[];
  /** Maximum number of avatars to show (defaults to 3). */
  maxAvatars?: number;
  /** Whether to show a '+N' badge for overflow participants. */
  showOverflow?: boolean;
  /** Size of each avatar ('sm', 'md', 'lg'). */
  size?: 'sm' | 'md' | 'lg';
  /** Gap between avatars (in rem, e.g., '0.5'). */
  gap?: string;
  /** Overlap amount for stacked avatars (negative margin, e.g., '-0.5rem'). */
  overlap?: string;
  /** Additional class names for the container. */
  className?: string;
  /** Custom avatar component if not using default Avatar. */
  AvatarComponent?: React.ComponentType<unknown>;
  /** Render prop for custom overflow badge. */
  overflowRenderer?: (count: number) => ReactNode;
}