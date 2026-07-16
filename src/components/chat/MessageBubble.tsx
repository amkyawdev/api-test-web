import type { Message } from '../../types/common.types';
import ThinkingBox from './ThinkingBox';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.content.startsWith('Error:') || message.content.startsWith('❌') || message.content.startsWith('🚫') || message.content.startsWith('⚠️') || message.content.startsWith('⏳') || message.content.startsWith('💰') || message.content.startsWith('🔐');
  const formatTime = (date: Date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'} ${isError ? 'error' : ''}`}>
      <div className="message-avatar">
        <i className={`bi ${isUser ? 'bi-person' : isError ? 'bi-exclamation-circle' : 'bi-robot'}`}></i>
      </div>
      <div className="message-wrapper">
        {message.thinking && <ThinkingBox thinking={message.thinking} />}
        <div className={`message-content ${isError ? 'error-content' : ''}`}>
          <div className={`message-text ${isError ? 'error-text' : ''}`}>{message.content}</div>
          <div className="message-time">
            {formatTime(message.timestamp)}
            {message.model && !isUser && !isError && <span className="badge-model ms-2">{message.model}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
