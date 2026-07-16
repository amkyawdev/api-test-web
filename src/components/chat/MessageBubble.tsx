import type { Message } from '../../types/common.types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
      <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}>
        <div className="d-flex align-items-start gap-2">
          {!isUser && (
            <i className="bi bi-robot mt-1"></i>
          )}
          <div className="flex-grow-1">
            <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>
              {message.content}
            </div>
            <div className="mt-2 d-flex align-items-center gap-2">
              <small className={`${isUser ? 'opacity-75' : 'text-secondary'}`}>
                {formatTime(message.timestamp)}
              </small>
              {message.model && !isUser && (
                <small className="badge bg-secondary">
                  {message.model}
                </small>
              )}
            </div>
          </div>
          {isUser && (
            <i className="bi bi-person mt-1"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
