const TypingIndicator: React.FC = () => (
  <div className="message assistant">
    <div className="message-avatar typing-avatar">
      <i className="bi bi-robot"></i>
    </div>
    <div className="message-content typing-content">
      <div className="typing-animation">
        <div className="typing-bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="typing-text">Thinking</span>
        <span className="typing-dots-animated">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  </div>
);
export default TypingIndicator;
