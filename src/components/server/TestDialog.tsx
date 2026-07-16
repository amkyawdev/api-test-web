import { useState, useEffect, useCallback } from 'react';

interface TestDialogProps {
  serverName: string;
  serverIcon: string;
  result: { success: boolean; message: string } | null;
  onContinue: () => void;
  onClose: () => void;
}

interface Stage {
  status: string;
  progress: number;
}

const TestDialog: React.FC<TestDialogProps> = ({ serverName, serverIcon, result, onContinue, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');
  const [currentStage, setCurrentStage] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const [glowPulse, setGlowPulse] = useState(0);

  const stages: Stage[] = [
    { status: 'Connecting to server...', progress: 15 },
    { status: 'Authenticating...', progress: 35 },
    { status: 'Validating API key...', progress: 55 },
    { status: 'Checking model availability...', progress: 75 },
    { status: 'Finalizing connection...', progress: 90 },
  ];

  const generateParticles = useCallback(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    generateParticles();
  }, [generateParticles]);

  useEffect(() => {
    // Glow pulse animation
    const glowInterval = setInterval(() => {
      setGlowPulse((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(glowInterval);
  }, []);

  useEffect(() => {
    if (!result) {
      let stageIndex = 0;
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const stage = stages[stageIndex];
          if (prev >= stage.progress - 1 && stageIndex < stages.length - 1) {
            stageIndex++;
            setStatusText(stages[stageIndex].status);
            setCurrentStage(stageIndex);
          }
          const target = stage.progress;
          const increment = (target - prev) * 0.15 + Math.random() * 2;
          return Math.min(prev + increment, target);
        });
      }, 100);

      // Initial status
      setStatusText(stages[0].status);

      return () => clearInterval(progressInterval);
    }
  }, [result]);

  const getGlowClass = () => {
    const classes = ['glow-1', 'glow-2', 'glow-3', 'glow-4'];
    return classes[glowPulse];
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-advanced">
        {!result ? (
          <>
            {/* Particle Background */}
            <div className="dialog-particles">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="particle"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Icon with Glow */}
            <div className={`dialog-icon-wrapper ${getGlowClass()}`}>
              <div className="dialog-icon-inner">{serverIcon}</div>
            </div>

            <h4 className="dialog-title">{serverName}</h4>

            {/* Advanced Progress */}
            <div className="advanced-progress mb-4">
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
                <div 
                  className="progress-glow"
                  style={{ left: `${progress}%` }}
                />
              </div>
              
              {/* Stage indicators */}
              <div className="progress-stages">
                {stages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`stage-dot ${i <= currentStage ? 'active' : ''} ${i < currentStage ? 'completed' : ''}`}
                  >
                    {i < currentStage && <i className="bi bi-check"></i>}
                  </div>
                ))}
              </div>
            </div>

            <p className="dialog-text">{statusText}</p>
            
            {/* Animated Loading */}
            <div className="loading-rings mx-auto mb-3">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </>
        ) : (
          <>
            {/* Result Animation */}
            <div className={`result-icon ${result.success ? 'success' : 'error'}`}>
              {result.success ? (
                <i className="bi bi-check-lg"></i>
              ) : (
                <i className="bi bi-x-lg"></i>
              )}
            </div>

            <h4 className={`dialog-title-animated ${result.success ? 'text-success' : 'text-danger'}`}>
              {result.success ? 'Connection Successful!' : 'Connection Failed'}
            </h4>

            <p className="dialog-text-animated">{result.message}</p>

            <div className="result-actions">
              <button className="btn btn-ghost-animated" onClick={onClose}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Try Again
              </button>
              {result.success && (
                <button className="btn btn-gradient-animated" onClick={onContinue}>
                  <i className="bi bi-chat-dots me-2"></i>
                  Continue to Chat
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestDialog;
