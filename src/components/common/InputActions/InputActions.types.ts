import { ReactNode } from 'react';

export interface InputActionsProps {
  /** Callback for emoji picker open. */
  onEmoji?: () => void;
  /** Callback for attachment picker open. */
  onAttach?: () => void;
  /** Callback for send action (if inline). */
  onSend?: () => void;
  /** Whether actions are disabled. */
  disabled?: boolean;
  /** Custom action items (array of { icon, onClick, ariaLabel }). */
  customActions?: Array<{
    icon: ReactNode;
    onClick: () => void;
    ariaLabel: string;
  }>;
  /** Size of action icons ('sm', 'md'). */
  size?: 'sm' | 'md';
  /** Additional class names for the container. */
  className?: string;
}