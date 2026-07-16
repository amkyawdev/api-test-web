const TypingIndicator: React.FC = () => {
  return (
    <div className="d-flex justify-content-start mb-3">
      <div className="message-bubble message-assistant">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-robot"></i>
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <span className="text-secondary ms-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
