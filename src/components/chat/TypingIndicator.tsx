const TypingIndicator: React.FC = () => (
  <div className="message assistant">
    <div className="message-avatar"><i className="bi bi-robot"></i></div>
    <div className="message-content">
      <div className="typing">
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
        <span className="text-secondary ms-2">AI is thinking...</span>
      </div>
    </div>
  </div>
);
export default TypingIndicator;
