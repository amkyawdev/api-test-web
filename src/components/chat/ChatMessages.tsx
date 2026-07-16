import type { Message } from '../../types/common.types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatMessages: React.FC<{ messages: Message[]; isLoading: boolean }> = ({ messages, isLoading }) => {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="chat-messages">
        <div className="empty-state-container">
          <div className="empty-icon-wrapper">
            <i className="bi bi-chat-dots-fill"></i>
          </div>
          <h3 className="empty-title">Start a conversation</h3>
          <p className="empty-text">Type a message below to begin chatting with the AI</p>
          <div className="empty-suggestions">
            <span className="suggestion-tag">💡 Try asking questions</span>
            <span className="suggestion-tag">🤖 Multiple AI providers</span>
            <span className="suggestion-tag">⚡ Fast responses</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      <div className="messages-container">
        {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
};

export default ChatMessages;
