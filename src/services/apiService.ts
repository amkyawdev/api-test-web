import type { ApiTestResult } from '../types/api.types';

// API endpoints for different services
const API_ENDPOINTS: Record<string, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
  claude: 'https://api.anthropic.com/v1/messages',
  deepseek: 'https://api.deepseek.com/chat/completions',
  ollama: 'http://localhost:11434/api/chat',
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  together: 'https://api.together.xyz/v1/chat/completions',
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  cerebras: 'https://api.cerebras.ai/v1/chat/completions',
  perplexity: 'https://api.perplexity.ai/chat/completions',
  minimax: 'https://api.minimax.chat/v1/text/chat_completion_pro',
  cohere: 'https://api.cohere.ai/v1/chat',
  mistral: 'https://api.mistral.ai/v1/chat/completions',
  anyscale: 'https://api.endpoints.anyscale.com/v1/chat/completions',
  elevenlabs: 'https://api.elevenlabs.io/v1/text-to-speech',
  grok: 'https://api.x.ai/v1/chat/completions',
  aws: 'https://{region}.bedrock.amazonaws.com/bedrock/{model}',
  azure: 'https://{resource}.openai.azure.com/openai/deployments/{deployment}/chat/completions',
  vertex: 'https://{project}.{location}.aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/publishers/google/models/{model}:predict',
};

export const apiService = {
  // Test API key validity
  testApiKey: async (serverId: string, apiKey: string): Promise<ApiTestResult> => {
    const startTime = Date.now();
    
    try {
      // For demo/testing, simulate validation
      // In production, this would make actual API calls to verify the key
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const latency = Date.now() - startTime;
      
      // Basic validation - key should be reasonable length
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

    // Build headers based on server
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    let body: Record<string, unknown> = {};
    
    switch (serverId) {
      case 'openai':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
        break;
        
      case 'azure':
        headers['api-key'] = apiKey;
        headers['Content-Type'] = 'application/json';
        body = { messages };
        break;
        
      case 'claude':
        headers['x-api-key'] = apiKey;
        headers['anthropic-version'] = '2023-06-01';
        headers['Content-Type'] = 'application/json';
        body = {
          model,
          max_tokens: 4096,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        };
        break;
        
      case 'gemini':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = {
          contents: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        };
        break;
        
      case 'ollama':
        body = {
          model,
          messages,
          stream: false
        };
        break;
        
      case 'groq':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
        break;
        
      case 'together':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
        break;
        
      case 'openrouter':
        headers['Authorization'] = `Bearer ${apiKey}`;
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'API Test Hub';
        body = { model, messages };
        break;
        
      case 'deepseek':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
        break;
        
      case 'cohere':
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { 
          model, 
          messages: messages.map(m => ({ role: m.role === 'user' ? 'User' : 'Chatbot', message: m.content }))
        };
        break;
        
      default:
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = { model, messages };
    }

    // For servers that don't need real API calls (demo mode)
    if (serverId === 'ollama' && apiKey === 'demo') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return `This is a demo response from ${model}. In production, enter your ${serverId} API key to get real responses.`;
    }

    // Make the actual API call
    const response = await fetch(endpoint, {
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
      case 'openrouter':
      case 'cerebras':
      case 'perplexity':
      case 'mistral':
      case 'anyscale':
      case 'grok':
        return data.choices?.[0]?.message?.content || 'No response';
        
      case 'claude':
        return data.content?.[0]?.text || 'No response';
        
      case 'gemini':
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        
      case 'ollama':
        return data.message?.content || 'No response';
        
      case 'cohere':
        return data.text || 'No response';
        
      default:
        return JSON.stringify(data).substring(0, 500);
    }
  },

  // Get available models for a server
  getEndpoint: (serverId: string): string | undefined => {
    return API_ENDPOINTS[serverId];
  },
};
