import { useState, useEffect } from 'react';

interface TestDialogProps {
  serverName: string;
  serverIcon: string;
  result: { success: boolean; message: string } | null;
  onContinue: () => void;
  onClose: () => void;
}

const TestDialog: React.FC<TestDialogProps> = ({ serverName, serverIcon, result, onContinue, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Testing connection...');

  useEffect(() => {
    if (!result) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 15, 90));
      }, 200);

      const statuses = ['Testing connection...', 'Validating API key...', 'Checking server...', 'Almost there...'];
      let index = 0;
      const statusInterval = setInterval(() => {
        if (index < statuses.length - 1) setStatusText(statuses[++index]);
      }, 500);

      return () => { clearInterval(interval); clearInterval(statusInterval); };
    }
  }, [result]);

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        {!result ? (
          <>
            <div className="dialog-icon">{serverIcon}</div>
            <h4 className="dialog-title">{serverName}</h4>
            <div className="spinner mx-auto mb-4"></div>
            <p className="dialog-text">{statusText}</p>
            <div className="progress" style={{ height: '6px' }}>
              <div className="progress-bar progress-bar-animated" role="progressbar" style={{ width: `${progress}%` }}></div>
            </div>
          </>
        ) : (
          <>
            <div className="dialog-icon">
              {result.success ? (
                <i className="bi bi-check-circle-fill text-success"></i>
              ) : (
                <i className="bi bi-x-circle-fill text-danger"></i>
              )}
            </div>
            <h4 className={`dialog-title ${result.success ? 'text-success' : 'text-danger'}`}>
              {result.success ? 'Connection Successful!' : 'Connection Failed'}
            </h4>
            <p className="dialog-text">{result.message}</p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button className="btn btn-ghost" onClick={onClose}>Try Again</button>
              {result.success && (
                <button className="btn btn-gradient" onClick={onContinue}>
                  <i className="bi bi-chat-dots me-2"></i>Continue to Chat
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
