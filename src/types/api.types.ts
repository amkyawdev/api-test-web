import type { Server, Model } from './common.types';

export interface ApiTestResult {
  success: boolean;
  message: string;
  server: string;
  timestamp: Date;
  latency?: number;
}

export const SERVERS: Server[] = [
  { 
    id: 'gemini', 
    name: 'Gemini', 
    icon: '✨', 
    description: "Google's AI model family", 
    models: [
      { id: 'gemini-pro', name: 'Gemini Pro', description: 'Best for general tasks' },
      { id: 'gemini-ultra', name: 'Gemini Ultra', description: 'Most capable model' },
      { id: 'gemini-flash', name: 'Gemini Flash', description: 'Fast and efficient' },
      { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', description: 'Multimodal vision' },
      { id: 'gemini-nano', name: 'Gemini Nano', description: 'On-device model' },
    ] 
  },
  { 
    id: 'claude', 
    name: 'Claude', 
    icon: '🧠', 
    description: "Anthropic's AI assistant", 
    models: [
      { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Most powerful' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Balanced performance' },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', description: 'Fastest responses' },
      { id: 'claude-2', name: 'Claude 2', description: 'Previous generation' },
      { id: 'claude-instant', name: 'Claude Instant', description: 'Quick responses' },
    ] 
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    icon: '🔍', 
    description: 'Deep search and reasoning AI', 
    models: [
      { id: 'deepseek-v3', name: 'DeepSeek V3', description: 'Latest flagship' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder', description: 'Programming focused' },
      { id: 'deepseek-chat', name: 'DeepSeek Chat', description: 'General conversation' },
      { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', description: 'Advanced reasoning' },
      { id: 'deepseek-v2', name: 'DeepSeek V2', description: 'Previous version' },
    ] 
  },
  { 
    id: 'openai', 
    name: 'OpenAI', 
    icon: '🤖', 
    description: 'GPT models by OpenAI', 
    models: [
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Latest GPT-4' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
      { id: 'gpt-4-vision', name: 'GPT-4 Vision', description: 'Multimodal' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
      { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5 16K', description: 'Long context' },
      { id: 'davinci-003', name: 'Davinci 003', description: 'Legacy model' },
      { id: 'text-davinci-003', name: 'Text Davinci', description: 'Text completion' },
    ] 
  },
  { 
    id: 'elevenlabs', 
    name: 'ElevenLabs', 
    icon: '🎙️', 
    description: 'Voice AI and synthesis', 
    models: [
      { id: 'eleven-multilingual-v2', name: 'Multilingual V2', description: 'Multi-language voice' },
      { id: 'eleven-english-v2', name: 'English V2', description: 'English optimized' },
      { id: 'eleven-monolingual-v1', name: 'Monolingual V1', description: 'Single language' },
      { id: 'eleven-turbo-v2', name: 'Turbo V2', description: 'Fast synthesis' },
      { id: 'eleven-voice-design', name: 'Voice Design', description: 'Custom voice creation' },
    ] 
  },
  { 
    id: 'perplexity', 
    name: 'Perplexity', 
    icon: '🔎', 
    description: 'Perplexity AI with web search', 
    models: [
      { id: 'perplexity-online', name: 'Online', description: 'Web search integrated' },
      { id: 'perplexity-pro', name: 'Pro', description: 'Advanced capabilities' },
      { id: 'perplexity-academic', name: 'Academic', description: 'Research focused' },
      { id: 'perplexity-writing', name: 'Writing', description: 'Content creation' },
      { id: 'perplexity-coder', name: 'Coder', description: 'Programming assistant' },
    ] 
  },
  { 
    id: 'ollama', 
    name: 'Ollama', 
    icon: '🦙', 
    description: 'Local LLM runner', 
    models: [
      { id: 'llama-3-70b', name: 'Llama 3 70B', description: 'Large local model' },
      { id: 'llama-3-8b', name: 'Llama 3 8B', description: 'Medium local model' },
      { id: 'mistral-7b', name: 'Mistral 7B', description: 'Efficient model' },
      { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', description: 'MoE model' },
      { id: 'codellama-34b', name: 'CodeLlama 34B', description: 'Code focused' },
      { id: 'phi-3-mini', name: 'Phi-3 Mini', description: 'Small but capable' },
      { id: 'gemma-7b', name: 'Gemma 7B', description: "Google's open model" },
      { id: 'qwen-2-72b', name: 'Qwen 2 72B', description: 'Large Chinese model' },
      { id: 'llama-2-70b', name: 'Llama 2 70B', description: 'Previous gen large' },
      { id: 'neural-chat-7b', name: 'Neural Chat 7B', description: 'Fine-tuned chat' },
    ] 
  },
  { 
    id: 'openrouter', 
    name: 'OpenRouter', 
    icon: '🌐', 
    description: 'Multi-model router', 
    models: [
      { id: 'openrouter-default', name: 'Default', description: 'Multi-model router' },
      { id: 'openrouter-best', name: 'Best', description: 'Smart routing' },
      { id: 'openrouter-fast', name: 'Fast', description: 'Speed optimized' },
      { id: 'openrouter-cheap', name: 'Cheap', description: 'Cost optimized' },
      { id: 'openrouter-pro', name: 'Pro', description: 'Advanced features' },
    ] 
  },
  { 
    id: 'minimax', 
    name: 'MiniMax', 
    icon: '⚡', 
    description: 'MiniMax AI platform', 
    models: [
      { id: 'minimax-abab-6.5', name: 'Abab 6.5', description: 'Latest Chinese model' },
      { id: 'minimax-abab-6', name: 'Abab 6', description: 'Previous version' },
      { id: 'minimax-chat', name: 'Chat', description: 'General conversation' },
      { id: 'minimax-assistant', name: 'Assistant', description: 'Task oriented' },
      { id: 'minimax-turbo', name: 'Turbo', description: 'Fast responses' },
    ] 
  },
  { 
    id: 'cerebras', 
    name: 'Cerebras', 
    icon: '💎', 
    description: 'Cerebras AI hardware models', 
    models: [
      { id: 'cerebras-gpt-13b', name: 'GPT-13B', description: 'Balanced performance' },
      { id: 'cerebras-gpt-6.7b', name: 'GPT-6.7B', description: 'Efficient model' },
      { id: 'cerebras-gpt-2.7b', name: 'GPT-2.7B', description: 'Small but capable' },
      { id: 'cerebras-gpt-111m', name: 'GPT-111M', description: 'Tiny model' },
      { id: 'cerebras-instruct', name: 'Instruct', description: 'Instruction tuned' },
    ] 
  },
  { 
    id: 'groq', 
    name: 'Groq', 
    icon: '⚡', 
    description: 'Groq AI inference', 
    models: [
      { id: 'groq-mixtral-8x7b', name: 'Mixtral 8x7B', description: 'Fast inference' },
      { id: 'groq-llama-3-70b', name: 'Llama 3 70B', description: 'High performance' },
      { id: 'groq-llama-3-8b', name: 'Llama 3 8B', description: 'Efficient' },
      { id: 'groq-gemma-7b', name: 'Gemma 7B', description: 'Google model' },
      { id: 'groq-llama-2-70b', name: 'Llama 2 70B', description: 'Previous gen' },
    ] 
  },
  { 
    id: 'grok', 
    name: 'Grok', 
    icon: '🟣', 
    description: 'xAI Grok models', 
    models: [
      { id: 'grok-1.5', name: 'Grok 1.5', description: 'Latest version' },
      { id: 'grok-1', name: 'Grok 1', description: 'Original model' },
      { id: 'grok-pro', name: 'Grok Pro', description: 'Advanced reasoning' },
      { id: 'grok-vision', name: 'Grok Vision', description: 'Multimodal' },
      { id: 'grok-coding', name: 'Grok Coding', description: 'Programming focused' },
    ] 
  },
];

export const getServerById = (id: string): Server | undefined => {
  return SERVERS.find(s => s.id === id);
};

export const getModelsByServer = (serverId: string): Model[] => {
  const server = getServerById(serverId);
  return server?.models || [];
};

export const getAllModels = (): Model[] => {
  return SERVERS.flatMap(s => s.models);
};

export const getModelById = (modelId: string): Model | undefined => {
  return getAllModels().find(m => m.id === modelId);
};

export const getServerByModelId = (modelId: string): Server | undefined => {
  return SERVERS.find(s => s.models.some(m => m.id === modelId));
};
