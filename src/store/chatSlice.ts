import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '../features/chat/types/chat.types';

interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  messages: Message[];
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.selectedChatId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setChats, selectChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;