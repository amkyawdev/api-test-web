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
      { id: 'gemini-2.0-flash-thinking', name: 'Gemini 2.0 Flash Thinking', description: 'With thinking capability' },
      { id: 'gemini-2.0-pro-exp', name: 'Gemini 2.0 Pro', description: 'Most capable' },
      { id: 'gemini-2.0-exp', name: 'Gemini 2.0 Experimental', description: 'Experimental release' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast and efficient' },
      { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash 8B', description: 'Lightweight version' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Most capable' },
      { id: 'gemini-1.5-pro-002', name: 'Gemini 1.5 Pro v2', description: 'Updated version' },
      { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro Latest', description: 'Latest pro version' },
      { id: 'gemini-exp-1121', name: 'Gemini Experimental', description: 'Experimental model' },
      { id: 'gemini-exp-1206', name: 'Gemini Experimental v2', description: 'Newer experimental' },
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
      { id: 'claude-2.0', name: 'Claude 2.0', description: 'Older version' },
      { id: 'claude-instant-1.2', name: 'Claude Instant', description: 'Fast responses' },
      { id: 'claude-3-opus-latest', name: 'Claude 3 Opus Latest', description: 'Latest opus' },
      { id: 'claude-3-sonnet-latest', name: 'Claude 3 Sonnet Latest', description: 'Latest sonnet' },
    ] 
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    icon: '🔍', 
    description: 'Deep search and reasoning AI', 
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat V3', description: 'Latest general conversation' },
      { id: 'deepseek-chat-v2.5', name: 'DeepSeek Chat V2.5', description: 'Previous version' },
      { id: 'deepseek-chat-v2', name: 'DeepSeek Chat V2', description: 'Older version' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder', description: 'Code specialist' },
      { id: 'deepseek-coder-33b', name: 'DeepSeek Coder 33B', description: 'Large code model' },
      { id: 'deepseek-coder-v2', name: 'DeepSeek Coder V2', description: 'Latest code model' },
      { id: 'deepseek-math', name: 'DeepSeek Math', description: 'Math reasoning' },
      { id: 'deepseek-math-7b', name: 'DeepSeek Math 7B', description: 'Lightweight math' },
      { id: 'deepseek-prover', name: 'DeepSeek Prover', description: 'Formal math proof' },
      { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', description: 'Advanced reasoning' },
      { id: 'deepseek-vl', name: 'DeepSeek VL', description: 'Vision language model' },
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
      { id: 'gpt-4o-2024-11-20', name: 'GPT-4o Latest', description: 'Newest version' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Previous top model' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
      { id: 'gpt-4-32k', name: 'GPT-4 32K', description: 'Extended context' },
      { id: 'gpt-4o-2024-08-06', name: 'GPT-4o v2', description: 'Updated version' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
      { id: 'gpt-3.5-turbo-16k', name: 'GPT-3.5 Turbo 16K', description: 'Extended context' },
      { id: 'o1-preview', name: 'o1 Preview', description: 'Reasoning model' },
      { id: 'o1-mini', name: 'o1 Mini', description: 'Fast reasoning' },
      { id: 'o1', name: 'o1', description: 'Full o1 model' },
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
      { id: 'eleven_flash_v2', name: 'Flash V2', description: 'Ultra fast' },
      { id: 'eleven_flash_v2_5', name: 'Flash V2.5', description: 'Faster version' },
      { id: 'eleven_multilingual_v1', name: 'Multilingual V1', description: 'Original multi' },
      { id: 'eleven_english_v1', name: 'English V1', description: 'Original English' },
      { id: 'eleven_turbo_v1', name: 'Turbo V1', description: 'Original fast' },
      { id: 'eleven_flash_v1', name: 'Flash V1', description: 'Original flash' },
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
      { id: 'llama-3-sonar-large-128k-online', name: 'Sonar Legacy', description: 'Previous generation' },
      { id: 'llama-3-sonar-small-128k-online', name: 'Sonar Small Legacy', description: 'Fast legacy' },
      { id: 'mixtral-8x7b-instruct', name: 'Mixtral 8x7B', description: 'MoE model' },
      { id: 'sonar-pro', name: 'Sonar Pro', description: 'Pro tier model' },
      { id: 'sonar-reasoning', name: 'Sonar Reasoning', description: 'With reasoning' },
      { id: 'sonar-reasoning-pro', name: 'Sonar Reasoning Pro', description: 'Advanced reasoning' },
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
      { id: 'llama3.1-70b', name: 'Llama 3.1 70B', description: '70B version' },
      { id: 'llama3.1-8b', name: 'Llama 3.1 8B', description: 'Small version' },
      { id: 'mistral-nemo', name: 'Mistral Nemo', description: 'Balanced' },
      { id: 'mistral-large', name: 'Mistral Large', description: 'Most capable' },
      { id: 'mistral', name: 'Mistral 7B', description: 'Standard Mistral' },
      { id: 'mixtral', name: 'Mixtral 8x22B', description: 'Mixture of experts' },
      { id: 'codellama', name: 'CodeLlama', description: 'Code specialist' },
      { id: 'codellama:70b', name: 'CodeLlama 70B', description: 'Large code' },
      { id: 'qwen2.5', name: 'Qwen 2.5', description: 'Chinese model' },
      { id: 'qwen2.5-coder', name: 'Qwen 2.5 Coder', description: 'Code focused' },
      { id: 'qwen2.5:72b', name: 'Qwen 2.5 72B', description: 'Large Chinese' },
      { id: 'phi4', name: 'Phi-4', description: 'Small but capable' },
      { id: 'phi3', name: 'Phi-3', description: 'Previous version' },
      { id: 'phi3-mini', name: 'Phi-3 Mini', description: 'Compact version' },
      { id: 'gemma2', name: 'Gemma 2', description: "Google's open" },
      { id: 'gemma2:27b', name: 'Gemma 2 27B', description: 'Large Gemma' },
      { id: 'nemotron', name: 'Nemotron', description: 'NVIDIA model' },
      { id: ' WizardLM2', name: 'WizardLM 2', description: 'Wizard version' },
      { id: 'wizardlm2-moe', name: 'WizardLM 2 MoE', description: 'Mixture of experts' },
      { id: 'starling-lm', name: 'Starling LM', description: 'High quality chat' },
      { id: 'dolphin-mixtral', name: 'Dolphin Mixtral', description: 'Uncensored MoE' },
      { id: 'llava', name: 'LLaVA', description: 'Vision model' },
    ] 
  },
  { 
    id: 'openrouter', 
    name: 'OpenRouter', 
    icon: '🌐', 
    description: 'Multi-model router', 
    models: [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Via OpenRouter' },
      { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: 'Via OpenRouter' },
      { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'Via OpenRouter' },
      { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Via OpenRouter' },
      { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5', description: 'Via OpenRouter' },
      { id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Latest via Router' },
      { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', description: 'Free tier available' },
      { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: '70B version' },
      { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Small version' },
      { id: 'mistralai/mixtral-8x22b-instruct', name: 'Mixtral 8x22B', description: 'Via OpenRouter' },
      { id: 'deepseek/deepseek-chat-v3', name: 'DeepSeek Chat V3', description: 'Via OpenRouter' },
      { id: 'deepseek/deepseek-coder-v2', name: 'DeepSeek Coder V2', description: 'Code via Router' },
      { id: 'perplexity/llama-3.1-sonar-large-128k-online', name: 'Perplexity Sonar', description: 'Web search enabled' },
      { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B', description: 'Free tier available' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B', description: 'Large Gemma' },
      { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', description: 'Chinese via Router' },
      { id: 'microsoft_phi-4', name: 'Phi-4', description: 'Microsoft Phi-4' },
      { id: 'nvidia/llama-3.1-nemotron-70b', name: 'Nemotron 70B', description: 'NVIDIA optimized' },
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
      { id: 'abab5', name: 'Abab 5', description: 'Older version' },
      { id: 'abab6', name: 'Abab 6', description: 'Intermediate version' },
      { id: 'minimax-text-01', name: 'MiniMax Text 01', description: 'Latest text model' },
      { id: 'speech-02-hd', name: 'Speech 02 HD', description: 'High definition voice' },
      { id: 'speech-02', name: 'Speech 02', description: 'Standard voice' },
      { id: 'video-01', name: 'Video 01', description: 'Video generation' },
    ] 
  },
  { 
    id: 'cerebras', 
    name: 'Cerebras', 
    icon: '💎', 
    description: 'Cerebras AI hardware models', 
    models: [
      { id: 'llama3.3-70b', name: 'Llama 3.3 70B', description: 'Fast inference' },
      { id: 'llama3.1-70b', name: 'Llama 3.1 70B', description: 'High performance' },
      { id: 'llama3.1-8b', name: 'Llama 3.1 8B', description: 'Efficient' },
      { id: 'llama3-70b', name: 'Llama 3 70B', description: 'Previous generation' },
      { id: 'llama3-8b', name: 'Llama 3 8B', description: 'Fast 8B' },
      { id: 'mistral-7b', name: 'Mistral 7B', description: 'Popular model' },
      { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', description: 'MoE model' },
      { id: 'gemma2-9b', name: 'Gemma 2 9B', description: "Google's model" },
      { id: 'gemma2-27b', name: 'Gemma 2 27B', description: 'Large Gemma' },
      { id: 'qwen2.5-72b', name: 'Qwen 2.5 72B', description: 'Chinese model' },
      { id: 'qwen2.5-7b', name: 'Qwen 2.5 7B', description: 'Small Chinese' },
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
      { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B', description: 'Standard 70B' },
      { id: 'llama-3.1-405b-reasoning', name: 'Llama 3.1 405B Reasoning', description: 'With reasoning' },
      { id: 'mixtral-8x22b-32768', name: 'Mixtral 8x22B 32K', description: 'Extended context' },
      { id: 'qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', description: 'Chinese model' },
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
      { id: 'grok-2-vision', name: 'Grok 2 Vision', description: 'With vision' },
      { id: 'grok-beta', name: 'Grok Beta', description: 'Beta version' },
      { id: 'grok-1', name: 'Grok 1', description: 'Original model' },
      { id: 'grok-1.5', name: 'Grok 1.5', description: 'Previous version' },
      { id: 'grok-1.5-vision', name: 'Grok 1.5 Vision', description: 'Vision version' },
      { id: 'grok-2-pro', name: 'Grok 2 Pro', description: 'Professional tier' },
      { id: 'grok-2-researcher', name: 'Grok 2 Researcher', description: 'Research focused' },
      { id: 'grok-2-math', name: 'Grok 2 Math', description: 'Math specialized' },
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
      { id: 'meta-llama/Llama-3.1-70B-Instruct-Turbo', name: 'Llama 3.1 70B Turbo', description: 'Standard 70B' },
      { id: 'meta-llama/Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo', description: 'Efficient' },
      { id: 'meta-llama/Llama-3-70B-Instruct', name: 'Llama 3 70B', description: 'Previous gen' },
      { id: 'meta-llama/Llama-3-8B-Instruct', name: 'Llama 3 8B', description: 'Fast 8B' },
      { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen 2.5 72B Turbo', description: 'Chinese model' },
      { id: 'Qwen/Qwen2.5-32B-Instruct-Turbo', name: 'Qwen 2.5 32B Turbo', description: 'Medium Chinese' },
      { id: 'mistralai/Mixtral-8x22B-Instruct-v0.1', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B', description: 'Smaller MoE' },
      { id: 'deepseek-ai/DeepSeek-V3', name: 'DeepSeek V3', description: 'Latest DeepSeek' },
      { id: 'deepseek-ai/DeepSeek-Coder-V2', name: 'DeepSeek Coder V2', description: 'Code specialist' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B', description: 'Large Gemma' },
      { id: 'google/gemma-2-9b-it', name: 'Gemma 2 9B', description: 'Small Gemma' },
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
      { id: 'meta-llama/Llama-3.1-405B-Instruct', name: 'Llama 3.1 405B', description: 'Large model' },
      { id: 'meta-llama/Llama-3.1-70B-Instruct', name: 'Llama 3.1 70B', description: '70B version' },
      { id: 'meta-llama/Llama-3.1-8B-Instruct', name: 'Llama 3.1 8B', description: 'Small version' },
      { id: 'codellama/CodeLlama-70B-Instruct-hf', name: 'CodeLlama 70B', description: 'Code specialist' },
      { id: 'codellama/CodeLlama-34B-Instruct-hf', name: 'CodeLlama 34B', description: 'Medium code' },
      { id: 'codellama/CodeLlama-13B-Instruct-hf', name: 'CodeLlama 13B', description: 'Small code' },
      { id: 'mistralai/Mistral-Nemo-Instruct-2407', name: 'Mistral Nemo', description: 'Balanced' },
      { id: 'deepseek-ai/DeepSeek-LLM-70B-Base', name: 'DeepSeek LLM 70B', description: 'Base model' },
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
      { id: 'command-r-plus', name: 'Command R+ (Previous)', description: 'Older Plus' },
      { id: 'command-plus', name: 'Command Plus', description: 'Previous Plus' },
      { id: 'command', name: 'Command', description: 'Standard model' },
      { id: 'command-light', name: 'Command Light', description: 'Efficient model' },
      { id: 'command-light-nightly', name: 'Command Light Nightly', description: 'Latest light' },
      { id: 'command-nightly', name: 'Command Nightly', description: 'Latest standard' },
      { id: 'cema4-v1', name: 'Cohere Embed v4', description: 'Embedding model' },
      { id: 'rerank-3', name: 'Cohere Rerank 3', description: 'Reranking model' },
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
      { id: 'mistral-large-latest', name: 'Mistral Large Latest', description: 'Newest release' },
      { id: 'open-mixtral-8x22b', name: 'Mixtral 8x22B', description: 'Open MoE' },
      { id: 'open-mixtral-8x7b', name: 'Mixtral 8x7B', description: 'Smaller MoE' },
      { id: 'mistral-nemo-2407', name: 'Mistral Nemo', description: 'Standard model' },
      { id: 'mistral-7b-instruct-v0.3', name: 'Mistral 7B v0.3', description: 'Latest 7B' },
      { id: 'mistral-7b-instruct-v0.2', name: 'Mistral 7B v0.2', description: 'Previous version' },
      { id: 'codestral', name: 'Codestral', description: 'Code specialist' },
      { id: 'codestral-22b', name: 'Codestral 22B', description: 'Latest code' },
      { id: 'mathstral-7b', name: 'Mathstral 7B', description: 'Math specialized' },
    ]
  },
  {
    id: 'aws',
    name: 'AWS Bedrock',
    icon: '☁️',
    description: 'Amazon AWS Bedrock',
    models: [
      { id: 'anthropic.claude-3-5-sonnet-20241022-v1:0', name: 'Claude 3.5 Sonnet', description: 'AWS version' },
      { id: 'anthropic.claude-3-opus-20240229-v1:0', name: 'Claude 3 Opus', description: 'Most powerful' },
      { id: 'anthropic.claude-3-sonnet-20240229-v1:0', name: 'Claude 3 Sonnet', description: 'Balanced' },
      { id: 'anthropic.claude-3-haiku-20240307-v1:0', name: 'Claude 3 Haiku', description: 'Fastest' },
      { id: 'anthropic.claude-3-5-haiku-20241022-v1:0', name: 'Claude 3.5 Haiku', description: 'Latest haiku' },
      { id: 'meta.llama3-1-70b-instruct-v1:0', name: 'Llama 3.1 70B', description: 'Large model' },
      { id: 'meta.llama3-1-8b-instruct-v1:0', name: 'Llama 3.1 8B', description: 'Efficient' },
      { id: 'meta.llama3-70b-instruct-v1:0', name: 'Llama 3 70B', description: 'Previous gen' },
      { id: 'ai21.jamba-1-5-large-v1:0', name: 'Jamba 1.5 Large', description: 'Jamba model' },
      { id: 'ai21.jamba-1-5-mini-v1:0', name: 'Jamba 1.5 Mini', description: 'Mini version' },
      { id: 'cohere.command-r-plus-v1:0', name: 'Command R+', description: 'Via AWS' },
      { id: 'cohere.command-r-v1:0', name: 'Command R', description: 'Standard via AWS' },
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
      { id: 'gpt-4o-2024-08-06', name: 'GPT-4o Latest', description: 'Newest version' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Previous top' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Standard GPT-4' },
      { id: 'gpt-4-32k', name: 'GPT-4 32K', description: 'Extended context' },
      { id: 'gpt-35-turbo-16k', name: 'GPT-3.5 Turbo 16K', description: 'Extended context' },
      { id: 'gpt-35-turbo', name: 'GPT-3.5 Turbo', description: 'Standard model' },
      { id: 'o1-preview', name: 'o1 Preview', description: 'Reasoning model' },
      { id: 'o1-mini', name: 'o1 Mini', description: 'Fast reasoning' },
      { id: 'o1', name: 'o1', description: 'Full o1 model' },
    ]
  },
  {
    id: 'vertex',
    name: 'Google Vertex AI',
    icon: '🔶',
    description: 'Google Cloud Vertex AI',
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', description: 'Latest fast' },
      { id: 'gemini-2.0-flash-thinking-exp', name: 'Gemini 2.0 Flash Thinking', description: 'With reasoning' },
      { id: 'gemini-2.0-pro-exp', name: 'Gemini 2.0 Pro', description: 'Most capable' },
      { id: 'gemini-1.5-pro-002', name: 'Gemini 1.5 Pro v2', description: 'Updated Pro' },
      { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro Latest', description: 'Latest Pro' },
      { id: 'gemini-1.5-flash-002', name: 'Gemini 1.5 Flash v2', description: 'Fast model' },
      { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash 8B', description: 'Lightweight' },
      { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash Latest', description: 'Latest Flash' },
      { id: 'claude-3-5-sonnet-v2@20241022', name: 'Claude 3.5 Sonnet', description: 'Via Vertex' },
      { id: 'claude-3-opus@20240229', name: 'Claude 3 Opus', description: 'Via Vertex' },
      { id: 'claude-3-haiku@20240307', name: 'Claude 3 Haiku', description: 'Fast via Vertex' },
    ]
  },
];

export const getServerById = (id: string): Server | undefined => {
  return ALL_SERVERS.find(s => s.id === id);
};

export const getModelsByServer = (serverId: string): Model[] => {
  const server = getServerById(serverId);
  return server?.models || [];
};

export const getAllModels = (): Model[] => {
  return ALL_SERVERS.flatMap(s => s.models);
};

export const getModelById = (modelId: string): Model | undefined => {
  return getAllModels().find(m => m.id === modelId);
};

export const getServerByModelId = (modelId: string): Server | undefined => {
  return ALL_SERVERS.find(s => s.models.some(m => m.id === modelId));
};

// New AI Providers
const NEW_SERVERS: Server[] = [
  {
    id: 'fireworks',
    name: 'Fireworks AI',
    icon: '🔥',
    description: 'Fast AI inference platform',
    models: [
      { id: 'accounts/fireworks/models/llama-v3p1-70b-instruct', name: 'Llama 3.1 70B', description: 'Fast inference' },
      { id: 'accounts/fireworks/models/llama-v3p1-405b-instruct', name: 'Llama 3.1 405B', description: 'Largest model' },
      { id: 'accounts/fireworks/models/llama-v3p2-90b-instruct', name: 'Llama 3.2 90B Vision', description: 'Vision capable' },
      { id: 'accounts/fireworks/models/llama-v3p2-11b-instruct', name: 'Llama 3.2 11B', description: 'Small vision' },
      { id: 'accounts/fireworks/models/qwen2p5-72b-instruct', name: 'Qwen 2.5 72B', description: 'Chinese model' },
      { id: 'accounts/fireworks/models/qwen2p5-32b-instruct', name: 'Qwen 2.5 32B', description: 'Medium Chinese' },
      { id: 'accounts/fireworks/models/qwen2p5-7b-instruct', name: 'Qwen 2.5 7B', description: 'Small Chinese' },
      { id: 'accounts/fireworks/models/mixtral-8x22b-instruct', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'accounts/fireworks/models/deepseek-v3', name: 'DeepSeek V3', description: 'Latest DeepSeek' },
      { id: 'accounts/fireworks/models/deepseek-v2.5', name: 'DeepSeek V2.5', description: 'Previous DeepSeek' },
      { id: 'accounts/fireworks/models/phi-4', name: 'Phi-4', description: 'Microsoft Phi-4' },
      { id: 'accounts/fireworks/models/yi-1.5-34b-chat', name: 'Yi 1.5 34B', description: '01.AI model' },
    ]
  },
  {
    id: 'replicate',
    name: 'Replicate',
    icon: '🔄',
    description: 'AI model hosting platform',
    models: [
      { id: 'meta/meta-llama-3-70b-instruct', name: 'Llama 3 70B', description: 'Meta flagship' },
      { id: 'meta/meta-llama-3-8b-instruct', name: 'Llama 3 8B', description: 'Efficient model' },
      { id: 'meta/meta-llama-3.1-405b-instruct', name: 'Llama 3.1 405B', description: 'Largest Llama' },
      { id: 'meta/meta-llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: '70B version' },
      { id: 'mistralai/mixtral-8x22b-instruct', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'mistralai/mixtral-8x7b-instruct', name: 'Mixtral 8x7B', description: 'Smaller MoE' },
      { id: 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO', name: 'Nous Hermes 2', description: 'Fine-tuned Mixtral' },
      { id: 'NousResearch/Nous-Hermes-Llama3-8B', name: 'Nous Hermes Llama3', description: 'Fine-tuned Llama' },
      { id: 'garage-bAInd/Platypus2-70B-instruct', name: 'Platypus2 70B', description: 'Science focused' },
      { id: 'beaverhaven/beaver-7b-instruct', name: 'Beaver 7B', description: 'High quality' },
    ]
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers AI',
    icon: '☁️',
    description: 'Edge AI inference',
    models: [
      { id: '@cf/meta/llama-3-8b-instruct', name: 'Llama 3 8B', description: 'Edge optimized' },
      { id: '@cf/meta/llama-3-70b-instruct', name: 'Llama 3 70B', description: 'Large edge model' },
      { id: '@cf/meta/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Latest 8B' },
      { id: '@cf/meta/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: 'Latest 70B' },
      { id: '@cf/mistral/mistral-7b-instruct', name: 'Mistral 7B', description: 'Fast inference' },
      { id: '@cf/thebloke/mistral-7b-instruct-gptq', name: 'Mistral 7B GPTQ', description: 'Quantized version' },
      { id: '@cf/qwen/qwen2.5-7b-instruct', name: 'Qwen 2.5 7B', description: 'Chinese edge' },
      { id: '@cf/qwen/qwen2.5-72b-instruct', name: 'Qwen 2.5 72B', description: 'Large Chinese' },
      { id: '@cf/google/gemma-2-9b-it', name: 'Gemma 2 9B', description: 'Google model' },
      { id: '@cf/google/gemma-2-27b-it', name: 'Gemma 2 27B', description: 'Large Gemma' },
      { id: '@cf/deepseek-ai/deepseek-coder-33b', name: 'DeepSeek Coder 33B', description: 'Code specialist' },
    ]
  },
  {
    id: 'lepton',
    name: 'Lepton AI',
    icon: '⚡',
    description: 'Fast AI inference',
    models: [
      { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', description: 'Fast inference' },
      { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', description: 'Largest model' },
      { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', description: 'Small version' },
      { id: 'qwen2.5-72b', name: 'Qwen 2.5 72B', description: 'Chinese model' },
      { id: 'qwen2.5-32b', name: 'Qwen 2.5 32B', description: 'Medium Chinese' },
      { id: 'qwen2.5-7b', name: 'Qwen 2.5 7B', description: 'Small Chinese' },
      { id: 'mixtral-8x22b', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', description: 'Smaller MoE' },
      { id: 'mistral-7b', name: 'Mistral 7B', description: 'Standard Mistral' },
      { id: 'codellama-70b', name: 'CodeLlama 70B', description: 'Code specialist' },
    ]
  },
  {
    id: 'novita',
    name: 'Novita AI',
    icon: '🚀',
    description: 'AI model hosting',
    models: [
      { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B', description: 'Meta flagship' },
      { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', description: 'Largest model' },
      { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: '70B version' },
      { id: 'deepseek-ai/deepseek-v3', name: 'DeepSeek V3', description: 'Latest DeepSeek' },
      { id: 'deepseek-ai/deepseek-coder-v2', name: 'DeepSeek Coder V2', description: 'Code specialist' },
      { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', description: 'Chinese model' },
      { id: 'qwen/qwen-2.5-32b-instruct', name: 'Qwen 2.5 32B', description: 'Medium Chinese' },
      { id: 'mistralai/mixtral-8x22b-instruct', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'mistralai/mistral-large-instruct', name: 'Mistral Large', description: 'Most capable' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B', description: 'Large Gemma' },
      { id: 'nvidia/llama-3.1-nemotron-70b', name: 'Nemotron 70B', description: 'NVIDIA optimized' },
    ]
  },
  {
    id: 'hyperbolic',
    name: 'Hyperbolic',
    icon: '🌊',
    description: 'Affordable AI inference',
    models: [
      { id: 'meta-llama/Llama-3.1-70B-Instruct', name: 'Llama 3.1 70B', description: 'Affordable large model' },
      { id: 'meta-llama/Llama-3.1-405B-Instruct', name: 'Llama 3.1 405B', description: 'Most capable' },
      { id: 'meta-llama/Llama-3.1-8B-Instruct', name: 'Llama 3.1 8B', description: 'Small version' },
      { id: 'Qwen/Qwen2.5-72B-Instruct', name: 'Qwen 2.5 72B', description: 'Chinese model' },
      { id: 'Qwen/Qwen2.5-32B-Instruct', name: 'Qwen 2.5 32B', description: 'Medium Chinese' },
      { id: 'Qwen/Qwen2.5-7B-Instruct', name: 'Qwen 2.5 7B', description: 'Small Chinese' },
      { id: 'mistralai/Mixtral-8x22B-Instruct', name: 'Mixtral 8x22B', description: 'MoE model' },
      { id: 'mistralai/Mixtral-8x7B-Instruct', name: 'Mixtral 8x7B', description: 'Smaller MoE' },
      { id: 'deepseek-ai/DeepSeek-V3', name: 'DeepSeek V3', description: 'Latest DeepSeek' },
      { id: 'deepseek-ai/DeepSeek-Coder-V2', name: 'DeepSeek Coder V2', description: 'Code specialist' },
      { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B', description: 'Large Gemma' },
    ]
  },
];

// Combine all servers
export const ALL_SERVERS: Server[] = [...SERVERS, ...NEW_SERVERS];
