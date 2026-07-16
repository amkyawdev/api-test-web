import { useState } from 'react';
import type { FormEvent } from 'react';

const ChatInput: React.FC<{ onSendMessage: (msg: string) => Promise<void>; isLoading: boolean }> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="chat-input-area">
      <form onSubmit={handleSubmit} className="d-flex gap-3">
        <textarea
          className="input-glass flex-grow-1"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit(e))}
          disabled={isLoading}
          rows={1}
          style={{ resize: 'none', maxHeight: '150px' }}
        />
        <button type="submit" className="btn btn-gradient" disabled={!message.trim() || isLoading} style={{ minWidth: '50px' }}>
          {isLoading ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-send"></i>}
        </button>
      </form>
      <small className="text-muted mt-2 d-block text-center">Press Enter to send, Shift + Enter for new line</small>
    </div>
  );
};

export default ChatInput;
