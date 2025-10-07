// src/features/chat/types/chat.types.ts
// Using ES Modules (no namespaces, explicit exports for modular imports)
// import { ReactNode } from 'react'; // Uncomment if needed later

// ========== Base Models ==========
export interface User {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    sender: User;
    timestamp: Date;
    isRead: boolean;
    type: 'text' | 'image' | 'attachment';
    senderAvatar?: string; // Optional avatar URL for sender
    senderName?: string; // Optional sender name for previews
}

export interface Chat {
    id: string;
    name: string;
    avatar?: string;
    lastMessage?: Message;
    lastMessageTime?: Date;
    unreadCount: number;
    participants: User[];
    isGroup: boolean;
    
}

export enum ChatType {
    DIRECT = 'direct',
    GROUP = 'group',
}

export interface TypingUser {
    userId: string;
    userName: string;
}

// ========== Component Props ==========

export interface ChatSidebarProps {
    chats: Chat[];
    selectedChatId: string;
    onSelectChat: (chatId: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

export interface ChatListProps {
    chats: Chat[];
    selectedChatId: string;
    onSelect: (chat: Chat) => void;
}

export interface ChatListItemProps {
    chat: Chat;
    isActive: boolean;
    onSelect: (chat: Chat) => void;
}

export interface ChatHeaderProps {
    chat: Chat;
    onBack?: () => void;
}

export interface GroupInfoProps {
    chatName: string;
    participants: User[];
}

export interface HeaderActionsProps {
    onSearch: () => void;
    onMenu: () => void;
}

export interface MessageThreadProps {
    messages: Message[];
    currentUserId: string;
    onLoadMore?: () => void;
}

export interface MessageProps {
    message: Message;
    isOwn: boolean;
    isLastInGroup: boolean;
}

export interface MessageGroupProps {
    messages: Message[];
    currentUserId: string;
}

export interface MessagePreviewProps {
    message: Message;
    isUnread: boolean;
}

export interface MessageInputProps {
    onSend: (text: string) => void;
    onTypingChange: (isTyping: boolean) => void;
    currentChatId: string;
}

export interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    disabled?: boolean;
}

export interface TypingIndicatorProps {
    typingUsers: TypingUser[];
    isVisible: boolean;
}
