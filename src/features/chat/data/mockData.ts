import { Chat, Message, TypingUser, User } from '../types/chat.types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/40',
    status: 'online',
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/40',
    status: 'offline',
  },
  {
    id: 'user3',
    name: 'Bob Johnson',
    avatar: 'https://via.placeholder.com/40',
    status: 'away',
  },
];

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/40',
    lastMessage: {
      id: 'msg1',
      text: 'Hello there!',
      senderId: 'user1',
      sender: mockUsers[0],
      timestamp: new Date('2025-10-06T10:00:00Z'),
      isRead: true,
      type: 'text',
    },
    lastMessageTime: new Date('2025-10-06T10:00:00Z'),
    unreadCount: 2,
    participants: [mockUsers[0]],
    isGroup: false,
  },
  {
    id: 'chat2',
    name: 'Team Meeting',
    avatar: undefined,
    lastMessage: {
      id: 'msg2',
      text: 'See you tomorrow.',
      senderId: 'user2',
      sender: mockUsers[1],
      timestamp: new Date('2025-10-06T12:00:00Z'),
      isRead: false,
      type: 'text',
    },
    lastMessageTime: new Date('2025-10-06T12:00:00Z'),
    unreadCount: 0,
    participants: [mockUsers[1], mockUsers[2]],
    isGroup: true,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    text: 'Hello, how are you?',
    senderId: 'user1',
    sender: mockUsers[0],
    timestamp: new Date('2025-10-06T09:00:00Z'),
    isRead: true,
    type: 'text',
  },
  {
    id: 'msg2',
    text: 'I\'m good, thanks! What about you?',
    senderId: 'current',
    sender: { ...mockUsers[0], id: 'current', name: 'You' },
    timestamp: new Date('2025-10-06T09:05:00Z'),
    isRead: true,
    type: 'text',
  },
  {
    id: 'msg3',
    text: 'Same here. Let\'s catch up later.',
    senderId: 'user1',
    sender: mockUsers[0],
    timestamp: new Date('2025-10-06T09:10:00Z'),
    isRead: false,
    type: 'text',
  },
];

export const mockTypingUsers: TypingUser[] = [
  { userId: 'user1', userName: 'John Doe' },
  { userId: 'user2', userName: 'Jane Smith' },
];