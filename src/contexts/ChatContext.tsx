import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Message, ChatSession } from '../types/common.types';
import { apiService } from '../services/apiService';
import { storageService } from '../services/storageService';
import { getModelsByServer } from '../types/api.types';

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  currentSession: ChatSession | null;
  selectedModel: string;
  selectedServer: string;
  apiKey: string;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setSelectedModel: (modelId: string) => void;
  loadSession: (session: ChatSession) => void;
  startNewChat: () => void;
  setSelectedServer: (serverId: string) => void;
  setApiKey: (key: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [selectedModel, setSelectedModelState] = useState<string>('');
  const [selectedServer, setSelectedServerState] = useState<string>('');
  const [apiKey, setApiKeyState] = useState<string>('');

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const createNewSession = useCallback((): ChatSession => ({
    id: generateId(),
    title: 'New Chat',
    messages: [],
    serverId: selectedServer,
    modelId: selectedModel,
    createdAt: new Date(),
    updatedAt: new Date(),
  }), [selectedServer, selectedModel]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
      model: selectedModel,
    };

    let session = currentSession || createNewSession();
    const updatedMessages = [...session.messages, userMessage];
    session = { ...session, messages: updatedMessages, updatedAt: new Date() };
    
    setMessages(updatedMessages);
    setCurrentSession(session);
    setIsLoading(true);

    try {
      // Convert messages to API format
      const apiMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Use sendMessageWithThinking to get both content and thinking
      const { content, thinking } = await apiService.sendMessageWithThinking(selectedServer, apiKey, selectedModel, apiMessages);

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: content,
        thinking: thinking,
        timestamp: new Date(),
        model: selectedModel,
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      session = {
        ...session,
        messages: finalMessages,
        title: userMessage.content.substring(0, 30) + (userMessage.content.length > 30 ? '...' : ''),
        updatedAt: new Date(),
      };

      setMessages(finalMessages);
      setCurrentSession(session);
      storageService.addSession(session);
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response. Please check your API key and try again.'}`,
        timestamp: new Date(),
        model: selectedModel,
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, selectedServer, selectedModel, apiKey, isLoading, createNewSession]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    if (currentSession) {
      const updatedSession = { ...currentSession, messages: [], updatedAt: new Date() };
      setCurrentSession(updatedSession);
      storageService.updateSession(updatedSession);
    }
  }, [currentSession]);

  const setSelectedModel = useCallback((modelId: string) => {
    setSelectedModelState(modelId);
    storageService.setSelectedModel(modelId);
  }, []);

  const setSelectedServer = useCallback((serverId: string) => {
    setSelectedServerState(serverId);
    storageService.setSelectedServer(serverId);
    const models = getModelsByServer(serverId);
    if (models.length > 0) {
      setSelectedModelState(models[0].id);
      storageService.setSelectedModel(models[0].id);
    }
  }, []);

  const setApiKey = useCallback((key: string) => {
    setApiKeyState(key);
  }, []);

  const loadSession = useCallback((session: ChatSession) => {
    setCurrentSession(session);
    setMessages(session.messages);
    setSelectedServerState(session.serverId);
    setSelectedModelState(session.modelId);
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentSession(null);
    setMessages([]);
  }, []);

  return (
    <ChatContext.Provider value={{
      messages, isLoading, currentSession, selectedModel, selectedServer, apiKey,
      sendMessage, clearMessages, setSelectedModel, loadSession, startNewChat, setSelectedServer, setApiKey,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
