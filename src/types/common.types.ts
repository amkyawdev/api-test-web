export interface Model {
  id: string;
  name: string;
  description: string;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  description: string;
  models: Model[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  serverId: string;
  modelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKeyConfig {
  server: string;
  key: string;
  isValid: boolean;
  lastTested?: Date;
}
