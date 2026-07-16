import type { Message, ChatSession } from './common.types';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentSession: ChatSession | null;
  selectedModel: string;
  selectedServer: string;
}

export interface ChatActions {
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setSelectedModel: (modelId: string) => void;
  loadSession: (session: ChatSession) => void;
}
