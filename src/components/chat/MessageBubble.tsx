import type { Message } from '../../types/common.types';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  const formatTime = (date: Date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-avatar">
        <i className={`bi ${isUser ? 'bi-person' : 'bi-robot'}`}></i>
      </div>
      <div className="message-content">
        <div className="message-text">{message.content}</div>
        <div className="message-time">
          {formatTime(message.timestamp)}
          {message.model && !isUser && <span className="badge bg-secondary ms-2" style={{ fontSize: '0.65rem' }}>{message.model}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
