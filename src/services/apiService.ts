import type { ApiTestResult } from '../types/api.types';

export const apiService = {
  testApiKey: async (serverId: string, apiKey: string): Promise<ApiTestResult> => {
    const startTime = Date.now();
    
    // Simulate API test with animation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    const latency = Date.now() - startTime;
    
    // For demo purposes, simulate validation
    // In real app, this would make actual API calls
    const isValid = apiKey.length >= 10 && !apiKey.includes('invalid');
    
    return {
      success: isValid,
      message: isValid 
        ? `Successfully connected to ${serverId}!` 
        : 'Invalid API key. Please check and try again.',
      server: serverId,
      timestamp: new Date(),
      latency,
    };
  },

  sendMessage: async (
    serverId: string, 
    _apiKey: string, 
    model: string, 
    _message: string
  ): Promise<string> => {
    // Simulate API call with typing delay
    const delay = 1500 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Demo response based on message content
    const responses = [
      "I understand. Let me help you with that.",
      "That's an interesting question! Here's what I think...",
      "Thanks for sharing. Let me provide some insights.",
      "I've processed your request. Here's my response:",
      "Great question! Let me elaborate on that topic.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
      `\n\n[This is a demo response from ${model} via ${serverId}]`;
  },
};
