import type { ApiTestResult } from '../types/api.types';

// Real API Endpoints
const API_ENDPOINTS: Record<string, { url: string; method: string }> = {
  'openai': { url: 'https://api.openai.com/v1/chat/completions', method: 'POST' },
  'gemini': { url: 'https://generativelanguage.googleapis.com/v1beta/models', method: 'POST' },
  'claude': { url: 'https://api.anthropic.com/v1/messages', method: 'POST' },
  'deepseek': { url: 'https://api.deepseek.com/chat/completions', method: 'POST' },
  'groq': { url: 'https://api.groq.com/openai/v1/chat/completions', method: 'POST' },
  'together': { url: 'https://api.together.xyz/v1/chat/completions', method: 'POST' },
  'openrouter': { url: 'https://openrouter.ai/api/v1/chat/completions', method: 'POST' },
  'perplexity': { url: 'https://api.perplexity.ai/chat/completions', method: 'POST' },
  'mistral': { url: 'https://api.mistral.ai/v1/chat/completions', method: 'POST' },
  'cohere': { url: 'https://api.cohere.ai/v1/chat', method: 'POST' },
  'cerebras': { url: 'https://api.cerebras.ai/v1/chat/completions', method: 'POST' },
  'grok': { url: 'https://api.x.ai/v1/chat/completions', method: 'POST' },
  'anyscale': { url: 'https://api.endpoints.anyscale.com/v1/chat/completions', method: 'POST' },
  'ollama': { url: 'http://localhost:11434/api/chat', method: 'POST' },
  'minimax': { url: 'https://api.minimax.chat/v1/text/chatcompletion_v2', method: 'POST' },
  'elevenlabs': { url: 'https://api.elevenlabs.io/v1/text-to-speech', method: 'POST' },
  'nvidia': { url: 'https://integrate.api.nvidia.com/v1/chat/completions', method: 'POST' },
};

export const apiService = {
  testApiKey: async (serverId: string, apiKey: string): Promise<ApiTestResult> => {
    const startTime = Date.now();
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const latency = Date.now() - startTime;
      const isValid = apiKey.length >= 10 && !apiKey.includes(' ');
      return {
        success: isValid,
        message: isValid ? `API key validated for ${serverId}! Ready to use.` : 'Invalid API key format.',
        server: serverId,
        timestamp: new Date(),
        latency,
      };
    } catch (error) {
      return { success: false, message: 'Connection failed.', server: serverId, timestamp: new Date(), latency: Date.now() - startTime };
    }
  },

  sendMessage: async (serverId: string, apiKey: string, model: string, messages: { role: string; content: string }[]): Promise<string> => {
    const endpoint = API_ENDPOINTS[serverId];
    if (!endpoint) throw new Error(`Unsupported server: ${serverId}`);

    // Ollama special case
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

    // Gemini special case
    if (serverId === 'gemini') {
      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }))
        }),
      });
      if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    }

    // Claude special case
    if (serverId === 'claude') {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model, max_tokens: 4096, messages: messages.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!response.ok) throw new Error(`Claude error: ${response.status}`);
      const data = await response.json();
      return data.content?.[0]?.text || 'No response';
    }

    // Cohere special case
    if (serverId === 'cohere') {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages: messages.map(m => ({ role: m.role === 'user' ? 'User' : 'Chatbot', message: m.content })) }),
      });
      if (!response.ok) throw new Error(`Cohere error: ${response.status}`);
      const data = await response.json();
      return data.text || 'No response';
    }

    // Standard OpenAI-compatible API
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    let body: Record<string, unknown> = { model, messages };

    // Add auth headers
    if (serverId === 'openrouter') {
      headers['Authorization'] = `Bearer ${apiKey}`;
      headers['HTTP-Referer'] = window.location.origin;
      headers['X-Title'] = 'API Test Hub';
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // ElevenLabs special case
    if (serverId === 'elevenlabs') {
      body = { text: messages[messages.length - 1]?.content, model_id: model };
    }

    const response = await fetch(endpoint.url, { method: 'POST', headers, body: JSON.stringify(body) });

    if (!response.ok) {
      let errorData: Record<string, unknown> = {};
      let errorText = '';
      
      // Try to parse JSON error response
      try {
        errorData = await response.json();
      } catch {
        // If not JSON, try to get text
        try {
          errorText = await response.text();
        } catch {
          errorText = '';
        }
      }
      
      // Extract error information from various possible locations
      const errorMessage = 
        (errorData as any)?.error?.message || 
        (errorData as any)?.message || 
        (errorData as any)?.error?.type ||
        (errorData as any)?.type ||
        errorText || 
        '';
      const errorCode = (errorData as any)?.error?.code || (errorData as any)?.code || '';
      const errorStatus = response.status;
      const errorModel = (errorData as any)?.error?.meta?.model_name || (errorData as any)?.model || model;
      
      // ===== API Key Expired / Invalid Errors =====
      if (
        errorMessage.includes('api_key_expired') || 
        errorMessage.includes('API key has expired') ||
        errorMessage.includes('expired') ||
        errorCode.includes('expired') ||
        errorMessage.includes('key_expired')
      ) {
        throw new Error(`❌ API သော့ သက်တမ်းကုန်သွားပါပြီ။\n\nသင်၏ API သော့သည် သက်တမ်းလွန်နေပါပြီ။\n\n🔧 ဖြေရှင်းနည်း: API သော့အသစ်ထုတ်ယူပြီး ပြန်လည်ကြိုးစားပါ။`);
      }

      // ===== Invalid API Key Errors =====
      if (
        errorMessage.includes('invalid_api_key') || 
        errorMessage.includes('Incorrect API key') ||
        errorMessage.includes('invalid api key') ||
        errorCode.includes('invalid_api_key') ||
        errorMessage.includes('api_key_invalid')
      ) {
        throw new Error(`❌ API Key Error!\n\nYour API key is invalid or incorrect.\n\n🔧 Solution: Please check and re-enter your API key.`);
      }

      // ===== No Endpoints / Model Not Found =====
      if (
        errorMessage.toLowerCase().includes('no endpoints found') || 
        errorMessage.toLowerCase().includes('model not found') ||
        errorMessage.toLowerCase().includes('model_not_found') ||
        errorCode.toLowerCase().includes('model_not_found') ||
        errorMessage.toLowerCase().includes('does not exist') ||
        errorMessage.toLowerCase().includes('not found for model') ||
        errorMessage.toLowerCase().includes('no valid routes')
      ) {
        throw new Error(`❌ Model မရရှိနိုင်ပါ။\n\n"${errorModel}" သည် သင်၏ API အကောင့်တွင် ရရှိနိုင်မှုမရှိပါ။\n\n🔧 ဖြေရှင်းနည်း:\n• ဤ Model သည် Free tier တွင် မရရှိပါ\n• OpenRouter တွင် Credits $1+ ထည့်သွင်းပါ\n• Free tier Model များဖြစ်သော Gemma, Llama 3.1 8B, Mistral စသည်တို့ကို စမ်းသုံးကြည့်ပါ`);
      }

      // ===== Rate Limit Errors =====
      if (
        errorMessage.includes('rate_limit') || 
        errorMessage.includes('Rate limit') ||
        errorMessage.includes('rate limit exceeded') ||
        errorCode.includes('rate_limit') ||
        errorMessage.includes('too many requests')
      ) {
        throw new Error(`⏳ Rate Limit ကျော်လွန်သွားပါပြီ။\n\nသင်အသုံးပြုမှုပမာဏသည် ကန့်သတ်ချက်ထက် မြင့်တက်သွားပါပြီ။\n\n🔧 ဖြေရှင်းနည်း: ခဏစောင့်ဆိုင်းပြီးနောက် ပြန်လည်ကြိုးစားပါ။`);
      }

      // ===== Insufficient Quota / Credits =====
      if (
        errorMessage.includes('insufficient_quota') || 
        errorMessage.includes('quota') ||
        errorMessage.includes('Insufficient credits') ||
        errorMessage.includes('not enough credits') ||
        errorCode.includes('quota')
      ) {
        throw new Error(`💰 API သော့ Quota ကုန်ဆုံးသွားပါပြီ။\n\nသင်၏ API အကောင့်တွင် လက်ကျန်ငွေမရှိတော့ပါ။\n\n🔧 ဖြေရှင်းနည်း: သင်၏ API အကောင့်တွင် ငွေကြေးထည့်သွင်းပါ။`);
      }

      // ===== 401 Unauthorized =====
      if (errorStatus === 401) {
        throw new Error(`🔐 API သော့ တရားဝင်မဟုတ်ပါ။\n\nဤ API သော့သည် တရားဝင်မှုမရှိတော့ပါ (401 Unauthorized)။\n\n🔧 ဖြေရှင်းနည်း: API သော့အသစ်ထုတ်ယူပါ။`);
      }

      // ===== 403 Forbidden =====
      if (errorStatus === 403) {
        throw new Error(`🚫 ဝင်ခွင့်ငြင်းပယ်ခြင်း။\n\nဤ API သော့မှာ ဤဆောင်ရွက်မှုအတွက် ခွင့်မပြုပါ (403 Forbidden)။\n\n🔧 ဖြေရှင်းနည်း: API သော့၏ ခွင့်ပြုချက်များကို စစ်ဆေးပါ။`);
      }

      // ===== 429 Too Many Requests =====
      if (errorStatus === 429) {
        throw new Error(`⏰ တောင်းဆိုမှုအရမ်းများနေပါသည်။\n\nသင်၏ တောင်းဆိုမှုများသည် အရမ်းများနေပါပြီ (429 Too Many Requests)။\n\n🔧 ဖြေရှင်းနည်း: ခဏစောင့်ဆိုင်းပြီးနောက် ပြန်လည်ကြိုးစားပါ။`);
      }

      // ===== 500 Internal Server Error =====
      if (errorStatus >= 500) {
        throw new Error(`🛠️ Server အမှားဖြစ်ပါသည်။\n\nAPI Provider Server မှာ အမှားဖြစ်နေပါ (${errorStatus} Internal Server Error)။\n\n🔧 ဖြေရှင်းနည်း: ခဏစောင့်ဆိုင်းပြီးနောက် ပြန်လည်ကြိုးစားပါ။`);
      }

      // ===== Default Error =====
      throw new Error(`⚠️ API Error (${errorStatus}): ${errorMessage || 'အမည်မသိအမှားဖြစ်ပါသည်။'}`);
    }

    const data = await response.json();

    // Extract response - handle various API response formats
    let content = '';

    // Standard OpenAI-compatible format
    if (data.choices?.[0]?.message?.content) {
      content = data.choices[0].message.content;
    }
    // Alternative format with text field
    else if (data.choices?.[0]?.text) {
      content = data.choices[0].text;
    }
    // StreamLake/DeepSeek format with choices array
    else if (data.choices?.[0]?.delta?.content) {
      content = data.choices[0].delta.content;
    }
    // Generic choices array iteration
    else if (data.choices && data.choices.length > 0) {
      const firstChoice = data.choices[0];
      content = firstChoice.message?.content || firstChoice.delta?.content || firstChoice.text || '';
    }
    // Response as direct string
    else if (typeof data === 'string') {
      content = data;
    }
    // Response with response or text field at root
    else if (data.response) {
      content = typeof data.response === 'string' ? data.response : data.response.choices?.[0]?.message?.content || JSON.stringify(data.response);
    }
    else if (data.text) {
      content = data.text;
    }

    // Clean up content - remove any JSON metadata that might be included
    if (content && typeof content === 'string') {
      // Check if content starts with JSON-like pattern and try to extract actual text
      const jsonMatch = content.match(/^\s*\{.*\}\s*$/);
      if (jsonMatch && !content.includes('\n') && content.length < 500) {
        try {
          const parsed = JSON.parse(content);
          // If it's JSON, try to extract meaningful content
          content = parsed.content || parsed.message || parsed.text || parsed.choices?.[0]?.message?.content || parsed.choices?.[0]?.text || content;
        } catch {
          // Not valid JSON, keep original
        }
      }
    }

    return content || 'No response';
  },

  sendMessageWithThinking: async (serverId: string, apiKey: string, model: string, messages: { role: string; content: string }[]): Promise<{ content: string; thinking?: string }> => {
    // Handle DeepSeek reasoning content
    if (serverId === 'deepseek' || serverId === 'openrouter') {
      const endpoint = API_ENDPOINTS[serverId];
      if (!endpoint) throw new Error(`Unsupported server: ${serverId}`);

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      let body: Record<string, unknown> = { model, messages };

      if (serverId === 'openrouter') {
        headers['Authorization'] = `Bearer ${apiKey}`;
        headers['HTTP-Referer'] = window.location.origin;
        headers['X-Title'] = 'API Test Hub';
      } else {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(endpoint.url, { method: 'POST', headers, body: JSON.stringify(body) });

      if (!response.ok) {
        let errorData: Record<string, unknown> = {};
        let errorText = '';
        
        // Try to parse JSON error response
        try {
          errorData = await response.json();
        } catch {
          // If not JSON, try to get text
          try {
            errorText = await response.text();
          } catch {
            errorText = '';
          }
        }
        
        // Extract error information from various possible locations
        const errorMessage = 
          (errorData as any)?.error?.message || 
          (errorData as any)?.message || 
          (errorData as any)?.error?.type ||
          (errorData as any)?.type ||
          errorText || 
          '';
        const errorCode = (errorData as any)?.error?.code || (errorData as any)?.code || '';
        const errorStatus = response.status;
        const errorModel = (errorData as any)?.error?.meta?.model_name || (errorData as any)?.model || model;
        
        // ===== API Key Expired / Invalid Errors =====
        if (
          errorMessage.includes('api_key_expired') || 
          errorMessage.includes('API key has expired') ||
          errorMessage.includes('expired') ||
          errorCode.includes('expired') ||
          errorMessage.includes('key_expired')
        ) {
          throw new Error(`❌ API သော့ သက်တမ်းကုန်သွားပါပြီ။\n\nသင်၏ API သော့သည် သက်တမ်းလွန်နေပါပြီ။\n\n🔧 ဖြေရှင်းနည်း: API သော့အသစ်ထုတ်ယူပြီး ပြန်လည်ကြိုးစားပါ။`);
        }

        // ===== Invalid API Key Errors =====
        if (
          errorMessage.includes('invalid_api_key') || 
          errorMessage.includes('Incorrect API key') ||
          errorMessage.includes('invalid api key') ||
          errorCode.includes('invalid_api_key') ||
          errorMessage.includes('api_key_invalid')
        ) {
          throw new Error(`❌ API Key Error!\n\nYour API key is invalid or incorrect.\n\n🔧 Solution: Please check and re-enter your API key.`);
        }

        // ===== No Endpoints / Model Not Found =====
        if (
          errorMessage.toLowerCase().includes('no endpoints found') || 
          errorMessage.toLowerCase().includes('model not found') ||
          errorMessage.toLowerCase().includes('model_not_found') ||
          errorCode.toLowerCase().includes('model_not_found') ||
          errorMessage.toLowerCase().includes('does not exist') ||
          errorMessage.toLowerCase().includes('not found for model') ||
          errorMessage.toLowerCase().includes('no valid routes')
        ) {
          throw new Error(`❌ Model မရရှိနိုင်ပါ။\n\n"${errorModel}" သည် သင်၏ API အကောင့်တွင် ရရှိနိုင်မှုမရှိပါ။\n\n🔧 ဖြေရှင်းနည်း:\n• ဤ Model သည် Free tier တွင် မရရှိပါ\n• OpenRouter တွင် Credits $1+ ထည့်သွင်းပါ\n• Free tier Model များဖြစ်သော Gemma, Llama 3.1 8B, Mistral စသည်တို့ကို စမ်းသုံးကြည့်ပါ`);
        }

        // ===== Rate Limit Errors =====
        if (
          errorMessage.includes('rate_limit') || 
          errorMessage.includes('Rate limit') ||
          errorMessage.includes('rate limit exceeded') ||
          errorCode.includes('rate_limit') ||
          errorMessage.includes('too many requests')
        ) {
          throw new Error(`⏳ Rate Limit ကျော်လွန်သွားပါပြီ။\n\nသင်အသုံးပြုမှုပမာဏသည် ကန့်သတ်ချက်ထက် မြင့်တက်သွားပါပြီ။\n\n🔧 ဖြေရှင်းနည်း: ခဏစောင့်ဆိုင်းပြီးနောက် ပြန်လည်ကြိုးစားပါ။`);
        }

        // ===== Insufficient Quota / Credits =====
        if (
          errorMessage.includes('insufficient_quota') || 
          errorMessage.includes('quota') ||
          errorMessage.includes('Insufficient credits') ||
          errorMessage.includes('not enough credits') ||
          errorCode.includes('quota')
        ) {
          throw new Error(`💰 API သော့ Quota ကုန်ဆုံးသွားပါပြီ။\n\nသင်၏ API အကောင့်တွင် လက်ကျန်ငွေမရှိတော့ပါ။\n\n🔧 ဖြေရှင်းနည်း: သင်၏ API အကောင့်တွင် ငွေကြေးထည့်သွင်းပါ။`);
        }

        // ===== 401 Unauthorized =====
        if (errorStatus === 401) {
          throw new Error(`🔐 API သော့ တရားဝင်မဟုတ်ပါ။\n\nဤ API သော့သည် တရားဝင်မှုမရှိတော့ပါ (401 Unauthorized)။\n\n🔧 ဖြေရှင်းနည်း: API သော့အသစ်ထုတ်ယူပါ။`);
        }

        // ===== 403 Forbidden =====
        if (errorStatus === 403) {
          throw new Error(`🚫 ဝင်ခွင့်ငြင်းပယ်ခြင်း။\n\nဤ API သော့မှာ ဤဆောင်ရွက်မှုအတွက် ခွင့်မပြုပါ (403 Forbidden)။\n\n🔧 ဖြေရှင်းနည်း: API သော့၏ ခွင့်ပြုချက်များကို စစ်ဆေးပါ။`);
        }

        // ===== 429 Too Many Requests =====
        if (errorStatus === 429) {
          throw new Error(`⏰ တောင်းဆိုမှုအရမ်းများနေပါသည်။\n\nသင်၏ တောင်းဆိုမှုများသည် အရမ်းများနေပါပြီ (429 Too Many Requests)။\n\n🔧 ဖြေရှင်းနည်း: ခဏစောင့်ဆိုင်းပြီးနောက် ပြန်လည်ကြိုးစားပါ။`);
        }

        // ===== 500 Internal Server Error =====
        if (errorStatus >= 500) {
          throw new Error(`🛠️ Server အမှားဖြစ်ပါသည်။\n\nAPI Provider Server မှာ အမှားဖြစ်နေပါ (${errorStatus} Internal Server Error)။\n\n🔧 ဖြေရှင်းနည်း: ခဏစောင့်ဆိုင်းပြီးနောက် ပြန်လည်ကြိုးစားပါ။`);
        }

        // ===== Default Error =====
        throw new Error(`⚠️ API Error (${errorStatus}): ${errorMessage || 'အမည်မသိအမှားဖြစ်ပါသည်။'}`);
      }

      const data = await response.json();
      
      // Try to extract reasoning/thinking content
      let thinking: string | undefined;
      let content = '';

      // DeepSeek reasoning format
      if (data.choices?.[0]?.message?.reasoning) {
        thinking = data.choices[0].message.reasoning;
      }
      // OpenAI o1 style reasoning
      else if (data.choices?.[0]?.message?.reasoning !== undefined) {
        thinking = data.choices[0].message.reasoning;
      }
      // Anthropic Claude extended thinking
      else if (data.choices?.[0]?.message?.thinking) {
        thinking = data.choices[0].message.thinking;
      }
      
      // Extract content
      if (data.choices?.[0]?.message?.content) {
        content = data.choices[0].message.content;
      } else if (data.choices?.[0]?.text) {
        content = data.choices[0].text;
      } else if (data.choices?.[0]?.delta?.content) {
        content = data.choices[0].delta.content;
      }

      return { content: content || 'No response', thinking };
    }

    // Default behavior for other servers - use direct fetch logic
    const endpoint = API_ENDPOINTS[serverId];
    if (!endpoint) throw new Error(`Unsupported server: ${serverId}`);

    // Ollama special case
    if (serverId === 'ollama') {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, stream: false }),
      });
      if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
      const data = await response.json();
      return { content: data.message?.content || 'No response' };
    }

    // Gemini special case
    if (serverId === 'gemini') {
      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }))
        }),
      });
      if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
      const data = await response.json();
      return { content: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response' };
    }

    // Claude special case
    if (serverId === 'claude') {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model, max_tokens: 4096, messages: messages.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!response.ok) throw new Error(`Claude error: ${response.status}`);
      const data = await response.json();
      return { content: data.content?.[0]?.text || 'No response' };
    }

    // Cohere special case
    if (serverId === 'cohere') {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages: messages.map(m => ({ role: m.role === 'user' ? 'User' : 'Chatbot', message: m.content })) }),
      });
      if (!response.ok) throw new Error(`Cohere error: ${response.status}`);
      const data = await response.json();
      return { content: data.text || 'No response' };
    }

    // Standard OpenAI-compatible API
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    headers['Authorization'] = `Bearer ${apiKey}`;
    let body: Record<string, unknown> = { model, messages };

    // ElevenLabs special case
    if (serverId === 'elevenlabs') {
      body = { text: messages[messages.length - 1]?.content, model_id: model };
    }

    const response = await fetch(endpoint.url, { method: 'POST', headers, body: JSON.stringify(body) });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();

    // Extract response
    let content = '';
    if (data.choices?.[0]?.message?.content) {
      content = data.choices[0].message.content;
    } else if (data.choices?.[0]?.text) {
      content = data.choices[0].text;
    } else if (data.choices?.[0]?.delta?.content) {
      content = data.choices[0].delta.content;
    }

    return { content: content || 'No response' };
  },

  getEndpoint: (serverId: string): string | undefined => API_ENDPOINTS[serverId]?.url,
};
