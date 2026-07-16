import { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

interface TestDialogProps {
  serverName: string;
  serverIcon: string;
  result: { success: boolean; message: string } | null;
  onContinue: () => void;
  onClose: () => void;
}

const TestDialog: React.FC<TestDialogProps> = ({
  serverName,
  serverIcon,
  result,
  onContinue,
  onClose,
}) => {
  const [stage, setStage] = useState<'testing' | 'success' | 'error'>('testing');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Testing connection...');

  useEffect(() => {
    if (result) {
      setStage(result.success ? 'success' : 'error');
      setStatusText(result.message);
    } else {
      // Progress animation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Status text cycling
      const statuses = [
        'Testing connection...',
        'Validating API key...',
        'Checking server response...',
        'Almost there...',
      ];
      let index = 0;
      const statusInterval = setInterval(() => {
        if (index < statuses.length - 1) {
          index++;
          setStatusText(statuses[index]);
        }
      }, 500);

      return () => {
        clearInterval(interval);
        clearInterval(statusInterval);
      };
    }
  }, [result]);

  return (
    <div className="test-dialog-overlay" onClick={result ? undefined : undefined}>
      <div className="test-dialog">
        {!result ? (
          <>
            <div className="mb-4">
              <div className="server-icon">{serverIcon}</div>
              <h4 className="mt-2 fw-bold">{serverName}</h4>
            </div>

            <div className="loading-animation mb-4">
              <div className="position-relative d-inline-block">
                <LoadingSpinner size="lg" />
                <div 
                  className="position-absolute top-0 start-0 h-100 w-100 d-flex align-items-center justify-content-center"
                  style={{ fontSize: '1.5rem' }}
                >
                  {serverIcon}
                </div>
              </div>
            </div>

            <p className="text-secondary mb-3">{statusText}</p>

            <div className="progress mt-3" style={{ height: '6px' }}>
              <div 
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              {stage === 'success' ? (
                <div className="success-animation">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                </div>
              ) : (
                <div className="error-animation">
                  <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '4rem' }}></i>
                </div>
              )}
            </div>

            <h4 className={`mb-3 ${stage === 'success' ? 'text-success' : 'text-danger'}`}>
              {stage === 'success' ? 'Connection Successful!' : 'Connection Failed'}
            </h4>

            <p className="text-secondary mb-4">{statusText}</p>

            <div className="d-flex gap-3 justify-content-center">
              <button
                className="btn btn-outline-custom btn-sm-custom"
                onClick={onClose}
              >
                Try Again
              </button>
              {stage === 'success' && (
                <button
                  className="btn btn-primary-custom btn-sm-custom"
                  onClick={onContinue}
                >
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
