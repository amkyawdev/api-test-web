import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';

const ChatInput: React.FC<{ onSendMessage: (msg: string) => Promise<void>; isLoading: boolean }> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="chat-input-area">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            className="input-glass flex-grow-1"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit(e))}
            disabled={isLoading}
            rows={1}
          />
          <button 
            type="submit" 
            className={`send-btn ${message.trim() && !isLoading ? 'active' : ''}`}
            disabled={!message.trim() || isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <i className="bi bi-send-fill"></i>
            )}
          </button>
        </div>
        <small className="input-hint">Press Enter to send • Shift + Enter for new line</small>
      </form>
    </div>
  );
};

export default ChatInput;
