import { useState, useEffect } from 'react';

interface ThinkingBoxProps {
  thinking: string;
  isExpanded?: boolean;
}

const ThinkingBox: React.FC<ThinkingBoxProps> = ({ thinking, isExpanded = false }) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  if (!thinking) return null;

  return (
    <div className="thinking-box">
      <button 
        className="thinking-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="thinking-title">
          <div className="thinking-icon">
            <i className="bi bi-lightbulb"></i>
          </div>
          <span>Thinking{dots}</span>
          <div className={`thinking-chevron ${expanded ? 'expanded' : ''}`}>
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </button>
      
      {expanded && (
        <div className="thinking-content">
          <div className="thinking-text">
            {thinking.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThinkingBox;
