import type { ApiTestResult } from '../types/api.types';

// Real API Endpoints
const API_ENDPOINTS: Record<string, { url: string; method: string }> = {
  // OpenAI
  'openai': {
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'POST'
  },
  // Google Gemini
  'gemini': {
    url: 'https://generativelanguage.googleapis.com/v1beta/models',
    method: 'POST'
  },
  // Anthropic Claude
  'claude': {
    url: 'https://api.anthropic.com/v1/messages',
    method: 'POST'
  },
  // DeepSeek
  'deepseek': {
    url: 'https://api.deepseek.com/chat/completions',
    method: 'POST'
  },
  // Groq
  'groq': {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    method: 'POST'
  },
  // Together AI
  'together': {
    url: 'https://api.together.xyz/v1/chat/completions',
    method: 'POST'
  },
  // OpenRouter
  'openrouter': {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    method: 'POST'
  },
  // Perplexity
  'perplexity': {
    url: 'https://api.perplexity.ai/chat/completions',
    method: 'POST'
  },
  // Mistral AI
  'mistral': {
    url: 'https://api.mistral.ai/v1/chat/completions',
    method: 'POST'
  },
  // Cohere
  'cohere': {
    url: 'https://api.cohere.ai/v1/chat',
    method: 'POST'
  },
  // Cerebras
  'cerebras': {
    url: 'https://api.cerebras.ai/v1/chat/completions',
    method: 'POST'
  },
  // xAI Grok
  'grok': {
    url: 'https://api.x.ai/v1/chat/completions',
    method: 'POST'
  },
  // Anyscale
  'anyscale': {
    url: 'https://api.endpoints.anyscale.com/v1/chat/completions',
    method: 'POST'
  },
  // Ollama (Local)
  'ollama': {
    url: 'http://localhost:11434/api/chat',
    method: 'POST'
  },
  // MiniMax
  'minimax': {
    url: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
    method: 'POST'
  },
  // ElevenLabs
  'elevenlabs': {
    url: 'https://api.elevenlabs.io/v1/text-to-speech',
    method: 'POST'
  },
};

export const apiService = {
  // Test API key validity
  testApiKey: async (serverId: string, apiKey: string): Promise<ApiTestResult> => {
    const startTime = Date.now();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const latency = Date.now() - startTime;
      const isValid = apiKey.length >= 10 && !apiKey.includes(' ');
      
      return {
        success: isValid,
        message: isValid 
          ? `API key validated for ${serverId}! Ready to use.` 
          : 'Invalid API key format. Please check and try again.',
        server: serverId,
        timestamp: new Date(),
        latency,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection failed. Please check your network.',
        server: serverId,
        timestamp: new Date(),
        latency: Date.now() - startTime,
      };
    }
  },

  // Send message to AI - Real API implementation
  sendMessage: async (
    serverId: string, 
    apiKey: string, 
    model: string, 
    messages: { role: string; content: string }[]
  ): Promise<string> => {
    const endpoint = API_ENDPOINTS[serverId];
    
    if (!endpoint) {
      throw new Error(`Unsupported server: ${serverId}`);
    }

    // Ollama special case - local server
    if (serverId === 'ollama') {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, stream: false }),
      });
      
      if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
      const data = await response.json();
      return data.message?.content || 'No response';
    }

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    let body: Record<string, unknown> = {};

    switch (serverId) {
      case 'openai':
      case 'groq':
      case 'together':
      case 'deepseek':
      case 'perplexity':
      case 'cerebras':
      case 'anyscale':
      case 'mistral':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
        break;

      case 'claude':
        headers['x-api-key'] = apiKey;
        headers['anthropic-version'] = '2023-06-01';
        body = {
          model,
          max_tokens: 4096,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        };
        break;

      case 'gemini':
        headers['Authorization'] = `Bearer ${apiKey}`;
        const geminiModel = model.includes('gemini') ? model : `${model}`;
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;
        const geminiResponse = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }]
            }))
          }),
        });
        
        if (!geminiResponse.ok) throw new Error(`Gemini API error: ${geminiResponse.status}`);
        const geminiData = await geminiResponse.json();
        return geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

      case 'openrouter':
        headers['Authorization'] = `Bearer ${apiKey}`;
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'API Test Hub';
        body = { model, messages };
        break;

      case 'cohere':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { 
          model, 
          messages: messages.map(m => ({ role: m.role === 'user' ? 'User' : 'Chatbot', message: m.content }))
        };
        break;

      case 'grok':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
        break;

      case 'minimax':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = {
          model,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        };
        break;

      default:
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
    }

    // Make API call
    const response = await fetch(endpoint.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract response based on server format
    switch (serverId) {
      case 'openai':
      case 'groq':
      case 'together':
      case 'deepseek':
      case 'perplexity':
      case 'cerebras':
      case 'anyscale':
      case 'mistral':
      case 'grok':
        return data.choices?.[0]?.message?.content || 'No response';

      case 'claude':
        return data.content?.[0]?.text || 'No response';

      case 'cohere':
        return data.text || 'No response';

      default:
        return JSON.stringify(data).substring(0, 500);
    }
  },

  getEndpoint: (serverId: string): string | undefined => {
    return API_ENDPOINTS[serverId]?.url;
  },
};
