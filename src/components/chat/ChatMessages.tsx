import type { Message } from '../../types/common.types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatMessages: React.FC<{ messages: Message[]; isLoading: boolean }> = ({ messages, isLoading }) => {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="chat-messages empty-state">
        <i className="bi bi-chat-dots empty-icon"></i>
        <h3 className="empty-title">Start a conversation</h3>
        <p className="empty-text">Type a message below to begin chatting with the AI</p>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatMessages;
