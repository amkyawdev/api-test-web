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
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', description: 'Latest fast model' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast and efficient' },
      { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash 8B', description: 'Lightweight version' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Most capable' },
      { id: 'gemini-1.5-pro-002', name: 'Gemini 1.5 Pro v2', description: 'Updated version' },
      { id: 'gemini-exp-1121', name: 'Gemini Experimental', description: 'Experimental model' },
    ] 
  },
  { 
    id: 'claude', 
    name: 'Claude', 
    icon: '🧠', 
    description: "Anthropic's AI assistant", 
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', description: 'Latest balanced' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', description: 'Fast and smart' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: 'Most powerful' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', description: 'Balanced performance' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', description: 'Fastest responses' },
      { id: 'claude-2.1', name: 'Claude 2.1', description: 'Previous generation' },
    ] 
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    icon: '🔍', 
    description: 'Deep search and reasoning AI', 
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat', description: 'General conversation' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder', description: 'Code specialist' },
      { id: 'deepseek-coder-33b', name: 'DeepSeek Coder 33B', description: 'Large code model' },
      { id: 'deepseek-math', name: 'DeepSeek Math', description: 'Math reasoning' },
      { id: 'deepseek-prover', name: 'DeepSeek Prover', description: 'Formal math proof' },
    ] 
  },
  { 
    id: 'openai', 
    name: 'OpenAI', 
    icon: '🤖', 
    description: 'GPT models by OpenAI', 
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Latest flagship' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast and affordable' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Previous top model' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
      { id: 'gpt-4o-2024-08-06', name: 'GPT-4o v2', description: 'Updated version' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
      { id: 'o1-preview', name: 'o1 Preview', description: 'Reasoning model' },
      { id: 'o1-mini', name: 'o1 Mini', description: 'Fast reasoning' },
    ] 
  },
  { 
    id: 'elevenlabs', 
    name: 'ElevenLabs', 
    icon: '🎙️', 
    description: 'Voice AI and synthesis', 
    models: [
      { id: 'eleven_multilingual_v2', name: 'Multilingual V2', description: 'Multi-language voice' },
      { id: 'eleven_english_v2', name: 'English V2', description: 'English optimized' },
      { id: 'eleven_monolingual_v1', name: 'Monolingual V1', description: 'Single language' },
      { id: 'eleven_turbo_v2', name: 'Turbo V2', description: 'Fast synthesis' },
    ] 
  },
  { 
    id: 'perplexity', 
    name: 'Perplexity', 
    icon: '🔎', 
    description: 'Perplexity AI with web search', 
    models: [
      { id: 'llama-3.1-sonar-large-128k-online', name: 'Sonar Large Online', description: 'Web search enabled' },
      { id: 'llama-3.1-sonar-small-128k-online', name: 'Sonar Small Online', description: 'Fast web search' },
      { id: 'llama-3.1-sonar-large-128k', name: 'Sonar Large', description: 'High quality' },
      { id: 'llama-3.1-sonar-small-128k', name: 'Sonar Small', description: 'Efficient' },
    ] 
  },
  { 
    id: 'ollama', 
    name: 'Ollama', 
    icon: '🦙', 
    description: 'Local LLM runner', 
    models: [
      { id: 'llama3.3', name: 'Llama 3.3 70B', description: 'Latest Llama' },
      { id: 'llama3.2', name: 'Llama 3.2', description: 'Newest version' },
      { id: 'llama3.2-vision', name: 'Llama 3.2 Vision', description: 'With vision' },
      { id: 'llama3.1', name: 'Llama 3.1 405B', description: 'Largest model' },
      { id: 'mistral-nemo', name: 'Mistral Nemo', description: 'Balanced' },
      { id: 'mistral-large', name: 'Mistral Large', description: 'Most capable' },
      { id: 'mixtral', name: 'Mixtral 8x22B', description: 'Mixture of experts' },
      { id: 'codellama', name: 'CodeLlama', description: 'Code specialist' },
      { id: 'qwen2.5', name: 'Qwen 2.5', description: 'Chinese model' },
      { id: 'qwen2.5-coder', name: 'Qwen 2.5 Coder', description: 'Code focused' },
      { id: 'phi4', name: 'Phi-4', description: 'Small but capable' },
      { id: 'gemma2', name: 'Gemma 2', description: "Google's open" },
      { id: 'nemotron', name: 'Nemotron', description: 'NVIDIA model' },
      { id: ' WizardLM2', name: 'WizardLM 2', description: 'Wizard version' },
      { id: 'wizardlm2-moe', name: 'WizardLM 2 MoE', description: 'Mixture of experts' },
      { id: 'starling-lm', name: 'Starling LM', description: 'High quality chat' },
    ] 
  },
  { 
    id: 'openrouter', 
    name: 'OpenRouter', 
    icon: '🌐', 
    description: 'Multi-model router', 
    models: [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Via OpenRouter' },
      { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'Via OpenRouter' },
      { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5', description: 'Via OpenRouter' },
      { id: 'meta-llama/llama-3.1-405b', name: 'Llama 3.1 405B', description: 'Via OpenRouter' },
      { id: 'mistralai/mixtral-8x22b', name: 'Mixtral 8x22B', description: 'Via OpenRouter' },
      { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat', description: 'Via OpenRouter' },
      { id: 'perplexity/llama-3.1-sonar-large', name: 'Perplexity Sonar', description: 'Via OpenRouter' },
    ] 
  },
  { 
    id: 'minimax', 
    name: 'MiniMax', 
    icon: '⚡', 
    description: 'MiniMax AI platform', 
    models: [
      { id: 'abab6.5s', name: 'Abab 6.5S', description: 'Speed optimized' },
      { id: 'abab6.5g', name: 'Abab 6.5G', description: 'General use' },
      { id: 'abab6.5', name: 'Abab 6.5', description: 'Standard model' },
      { id: 'abab5.5', name: 'Abab 5.5', description: 'Previous version' },
    ] 
  },
  { 
    id: 'cerebras', 
    name: 'Cerebras', 
    icon: '💎', 
    description: 'Cerebras AI hardware models', 
    models: [
      { id: 'llama3.3-70b', name: 'Llama 3.3 70B', description: 'Fast inference' },
      { id: 'llama3.1-8b', name: 'Llama 3.1 8B', description: 'Efficient' },
      { id: 'llama3.1-70b', name: 'Llama 3.1 70B', description: 'High performance' },
      { id: 'mistral-7b', name: 'Mistral 7B', description: 'Popular model' },
      { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', description: 'MoE model' },
      { id: 'gemma2-9b', name: 'Gemma 2 9B', description: "Google's model" },
    ] 
  },
  { 
    id: 'groq', 
    name: 'Groq', 
    icon: '⚡', 
    description: 'Groq AI inference', 
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Fastest inference' },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', description: 'Ultra fast' },
      { id: 'mixtral-8x7b-32k', name: 'Mixtral 8x7B', description: 'Fast MoE' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B', description: 'Fast Gemma' },
      { id: 'llama3-70b-8192', name: 'Llama 3 70B', description: 'Previous gen' },
      { id: 'llama3-8b-8192', name: 'Llama 3 8B', description: 'Previous gen fast' },
    ] 
  },
  { 
    id: 'grok', 
    name: 'Grok', 
    icon: '🟣', 
    description: 'xAI Grok models', 
    models: [
      { id: 'grok-2', name: 'Grok 2', description: 'Latest version' },
      { id: 'grok-2-mini', name: 'Grok 2 Mini', description: 'Fast version' },
      { id: 'grok-beta', name: 'Grok Beta', description: 'Beta version' },
      { id: 'grok-1', name: 'Grok 1', description: 'Original model' },
      { id: 'grok-1.5', name: 'Grok 1.5', description: 'Previous version' },
    ] 
  },
  {
    id: 'together',
    name: 'Together AI',
    icon: '🔗',
    description: 'Together AI inference',
    models: [
      { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B Turbo', description: 'Fast inference' },
      { id: 'meta-llama/Llama-3.1-405B-Instruct-Turbo', name: 'Llama 3.1 405B Turbo', description: 'Largest model' },
      { id: 'meta-llama/Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo', description: 'Efficient' },
      { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen 2.5 72B Turbo', description: 'Chinese model' },
      { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'deepseek-ai/DeepSeek-V3', name: 'DeepSeek V3', description: 'Latest DeepSeek' },
      { id: 'deepseek-ai/DeepSeek-Coder-V2', name: 'DeepSeek Coder V2', description: 'Code specialist' },
    ]
  },
  {
    id: 'anyscale',
    name: 'Anyscale',
    icon: '🔮',
    description: 'Anyscale Endpoints',
    models: [
      { id: 'mistralai/Mistral-Large-Instruct-2411', name: 'Mistral Large', description: 'Most capable' },
      { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'meta-llama/Llama-3.1-70B-Instruct', name: 'Llama 3.1 70B', description: 'Large model' },
      { id: 'codellama/CodeLlama-70B-Instruct-hf', name: 'CodeLlama 70B', description: 'Code specialist' },
    ]
  },
  {
    id: 'cohere',
    name: 'Cohere',
    icon: '🌊',
    description: 'Cohere AI models',
    models: [
      { id: 'command-r-plus-08-2024', name: 'Command R+', description: 'Latest version' },
      { id: 'command-r7b-12-2024', name: 'Command R7B', description: 'Efficient version' },
      { id: 'command-plus', name: 'Command Plus', description: 'Previous Plus' },
      { id: 'command', name: 'Command', description: 'Standard model' },
      { id: 'command-light', name: 'Command Light', description: 'Efficient model' },
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    icon: '🌬️',
    description: 'Mistral AI direct',
    models: [
      { id: 'mistral-large-2411', name: 'Mistral Large 2411', description: 'Latest large' },
      { id: 'mistral-small-2409', name: 'Mistral Small 2409', description: 'Efficient model' },
      { id: 'open-mixtral-8x22b', name: 'Mixtral 8x22B', description: 'Open MoE' },
      { id: 'mistral-nemo-2407', name: 'Mistral Nemo', description: 'Standard model' },
    ]
  },
  {
    id: 'aws',
    name: 'AWS Bedrock',
    icon: '☁️',
    description: 'Amazon AWS Bedrock',
    models: [
      { id: 'anthropic.claude-3-5-sonnet-20241022-v1:0', name: 'Claude 3.5 Sonnet', description: 'AWS version' },
      { id: 'anthropic.claude-3-opus-v1:0', name: 'Claude 3 Opus', description: 'Most powerful' },
      { id: 'anthropic.claude-3-sonnet-v1:0', name: 'Claude 3 Sonnet', description: 'Balanced' },
      { id: 'anthropic.claude-3-haiku-v1:0', name: 'Claude 3 Haiku', description: 'Fastest' },
      { id: 'meta.llama3-1-70b-instruct-v1:0', name: 'Llama 3.1 70B', description: 'Large model' },
      { id: 'meta.llama3-1-8b-instruct-v1:0', name: 'Llama 3.1 8B', description: 'Efficient' },
      { id: 'ai21.jamba-1-5-large-v1:0', name: 'Jamba 1.5 Large', description: 'Jamba model' },
      { id: 'ai21.jamba-1-5-mini-v1:0', name: 'Jamba 1.5 Mini', description: 'Mini version' },
    ]
  },
  {
    id: 'azure',
    name: 'Azure OpenAI',
    icon: '🔷',
    description: 'Microsoft Azure OpenAI',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Latest flagship' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast and affordable' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Previous top' },
      { id: 'gpt-35-turbo', name: 'GPT-3.5 Turbo', description: 'Standard model' },
      { id: 'o1-preview', name: 'o1 Preview', description: 'Reasoning model' },
      { id: 'o1-mini', name: 'o1 Mini', description: 'Fast reasoning' },
    ]
  },
  {
    id: 'vertex',
    name: 'Google Vertex AI',
    icon: '🔶',
    description: 'Google Cloud Vertex AI',
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', description: 'Latest fast' },
      { id: 'gemini-1.5-pro-002', name: 'Gemini 1.5 Pro v2', description: 'Most capable' },
      { id: 'gemini-1.5-flash-002', name: 'Gemini 1.5 Flash v2', description: 'Fast model' },
      { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash 8B', description: 'Lightweight' },
      { id: 'claude-3-5-sonnet-v2@20241022', name: 'Claude 3.5 Sonnet', description: 'Via Vertex' },
      { id: 'claude-3-opus@20240229', name: 'Claude 3 Opus', description: 'Via Vertex' },
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
