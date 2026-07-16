import type { Message } from '../../types/common.types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="chat-messages d-flex align-items-center justify-content-center flex-column gap-3">
        <div className="text-center">
          <i className="bi bi-chat-dots" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
          <h4 className="mt-3 text-secondary">Start a conversation</h4>
          <p className="text-secondary">
            Type a message below to begin chatting with the AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatMessages;
