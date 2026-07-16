import type { ChatSession, ApiKeyConfig } from '../types/common.types';

const STORAGE_KEYS = {
  CHAT_HISTORY: 'api_test_chat_history',
  API_KEYS: 'api_test_api_keys',
  CURRENT_SESSION: 'api_test_current_session',
  SELECTED_SERVER: 'api_test_selected_server',
  SELECTED_MODEL: 'api_test_selected_model',
};

export const storageService = {
  // Chat History
  getChatHistory: (): ChatSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    if (data) {
      const sessions = JSON.parse(data);
      return sessions.map((s: ChatSession) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }));
    }
    return [];
  },

  saveChatHistory: (sessions: ChatSession[]): void => {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(sessions));
  },

  addSession: (session: ChatSession): void => {
    const sessions = storageService.getChatHistory();
    sessions.unshift(session);
    storageService.saveChatHistory(sessions);
  },

  updateSession: (session: ChatSession): void => {
    const sessions = storageService.getChatHistory();
    const index = sessions.findIndex(s => s.id === session.id);
    if (index !== -1) {
      sessions[index] = session;
      storageService.saveChatHistory(sessions);
    }
  },

  deleteSession: (sessionId: string): void => {
    const sessions = storageService.getChatHistory();
    const filtered = sessions.filter(s => s.id !== sessionId);
    storageService.saveChatHistory(filtered);
  },

  // API Keys
  getApiKeys: (): Record<string, ApiKeyConfig> => {
    const data = localStorage.getItem(STORAGE_KEYS.API_KEYS);
    return data ? JSON.parse(data) : {};
  },

  saveApiKey: (serverId: string, key: string): void => {
    const keys = storageService.getApiKeys();
    keys[serverId] = { server: serverId, key, isValid: true, lastTested: new Date() };
    localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
  },

  getApiKey: (serverId: string): string | null => {
    const keys = storageService.getApiKeys();
    return keys[serverId]?.key || null;
  },

  // Settings
  getSelectedServer: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_SERVER);
  },

  setSelectedServer: (serverId: string): void => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SERVER, serverId);
  },

  getSelectedModel: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_MODEL);
  },

  setSelectedModel: (modelId: string): void => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_MODEL, modelId);
  },
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}
