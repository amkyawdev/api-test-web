import { useState } from 'react';
import type { FormEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="d-flex gap-3">
        <textarea
          className="form-control form-control-custom flex-grow-1"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          style={{ resize: 'none', maxHeight: '150px' }}
        />
        <button
          type="submit"
          className="btn btn-primary-custom"
          disabled={!message.trim() || isLoading}
          style={{ minWidth: '50px' }}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <i className="bi bi-send"></i>
          )}
        </button>
      </form>
      <small className="text-secondary mt-2 d-block text-center">
        Press Enter to send, Shift + Enter for new line
      </small>
    </div>
  );
};

export default ChatInput;
