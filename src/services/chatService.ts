import { Chat, Message } from '../features/chat/types/chat.types';
import { mockChats, mockMessages } from '../features/chat/data/mockData';

// const API_BASE = '/api/chat';

export const fetchChats = async (): Promise<Chat[]> => {
  // Mock delay to simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockChats; // Return mock chats; in real: await fetch(`${API_BASE}/chats`).then(res => res.json())
};

export const sendMessage = async (chatId: string, text: string): Promise<Message> => {
  // Mock delay to simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newMessage: Message = {
    id: Date.now().toString(),
    text,
    senderId: 'current',
    sender: {
      id: 'current',
      name: 'You',
      status: 'online' as const,
    },
    timestamp: new Date(),
    isRead: true,
    type: 'text',
  };
  // In real: await fetch(`${API_BASE}/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify({ text }) })
  return newMessage;
};

// Mock WebSocket for real-time (returns a mock object with event emitters)
interface MockWebSocket {
  onmessage: (event: MessageEvent) => void;
  send: (data: string) => void;
  close: () => void;
  readyState: number;
}

export const initWebSocket = (onMessage: (msg: Message) => void): MockWebSocket => {
  const mockWS: MockWebSocket = {
    onmessage: () => {
      const mockMsg: Message = mockMessages[0]; // Simulate incoming message
      onMessage(mockMsg);
    },
    send: (data: string) => console.log('Mock WS send:', data),
    close: () => console.log('Mock WS closed'),
    readyState: 1, // OPEN state
  };

  // Simulate periodic messages
  const interval = setInterval(() => {
    const event = { data: JSON.stringify(mockMessages[1]) } as MessageEvent;
    mockWS.onmessage(event);
  }, 5000);

  mockWS.close = () => {
    clearInterval(interval);
    console.log('Mock WS closed');
  };

  return mockWS;
};