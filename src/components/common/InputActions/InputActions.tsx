import React from 'react';
import { InputActionsProps } from './InputActions.types';
import { IconButton } from '../IconButton/IconButton';
import { Icon } from '../Icon/Icon';

export const InputActions: React.FC<InputActionsProps> = ({
  onEmoji,
  onAttach,
  onSend,
  disabled = false,
  customActions = [],
  size = 'md',
  className = '',
}) => {
  const defaultActions = [
    ...(onEmoji ? [{ icon: 'emoji', onClick: onEmoji, ariaLabel: 'Open emoji picker' }] : []),
    ...(onAttach ? [{ icon: 'attach', onClick: onAttach, ariaLabel: 'Attach file' }] : []),
    ...(onSend ? [{ icon: 'send', onClick: onSend, ariaLabel: 'Send message' }] : []),
  ];

  const allActions = [...defaultActions, ...customActions];

  if (allActions.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {allActions.map((action, index) => (
        <IconButton
          key={index}
          icon={typeof action.icon === 'string' ? <Icon name={action.icon} size={20} /> : action.icon}
          onClick={action.onClick}
          aria-label={action.ariaLabel}
          variant="ghost"
          size={size}
          disabled={disabled}
          rounded={true}
        />
      ))}
    </div>
  );
};