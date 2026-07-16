import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServerById } from '../../types/api.types';
import { apiService } from '../../services/apiService';
import { storageService } from '../../services/storageService';
import { useChat } from '../../contexts/ChatContext';
import TestDialog from './TestDialog';

const ApiKeyInput: React.FC = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();
  const { setSelectedServer, setApiKey } = useChat();
  
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  
  const server = serverId ? getServerById(serverId) : null;

  useEffect(() => {
    if (serverId) {
      const savedKey = storageService.getApiKey(serverId);
      if (savedKey) setApiKeyInput(savedKey);
    }
  }, [serverId]);

  const handleTestConnection = async () => {
    if (!apiKeyInput.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key' });
      return;
    }

    setShowTestDialog(true);
    setTestResult(null);

    try {
      const result = await apiService.testApiKey(serverId!, apiKeyInput);
      setTestResult({ success: result.success, message: result.message });

      if (result.success && serverId) {
        storageService.saveApiKey(serverId, apiKeyInput);
        setSelectedServer(serverId);
        setApiKey(apiKeyInput);
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Connection test failed. Please try again.' });
    }
  };

  const handleContinue = () => {
    if (testResult?.success) navigate('/chat');
    setShowTestDialog(false);
  };

  if (!server) {
    return (
      <div className="container py-5 text-center">
        <h2>Server not found</h2>
        <button className="btn btn-gradient mt-3" onClick={() => navigate('/')}>
          Back to Servers
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="glass-card p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="server-icon">{server.icon}</span>
              <h2 className="fw-bold mt-3">{server.name}</h2>
              <p className="text-secondary">{server.description}</p>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-key me-2"></i>API Key
              </label>
              <input
                type="password"
                className="input-glass"
                placeholder="Enter your API key..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                autoComplete="off"
              />
              <small className="text-muted mt-2 d-block">
                Your API key is stored locally in your browser.
              </small>
            </div>

            <div className="d-flex gap-3 flex-column flex-sm-row">
              <button className="btn btn-ghost flex-grow-1" onClick={() => navigate('/')}>
                <i className="bi bi-arrow-left me-2"></i>Back
              </button>
              <button
                className="btn btn-gradient flex-grow-1"
                onClick={handleTestConnection}
                disabled={!apiKeyInput.trim()}
              >
                <i className="bi bi-plug me-2"></i>Test & Connect
              </button>
            </div>

            {server.models.length > 0 && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <h5 className="mb-3"><i className="bi bi-cpu me-2"></i>Available Models</h5>
                <div className="d-flex flex-wrap gap-2">
                  {server.models.slice(0, 5).map((model) => (
                    <span key={model.id} className="badge" style={{ background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                      {model.name}
                    </span>
                  ))}
                  {server.models.length > 5 && (
                    <span className="badge" style={{ background: 'var(--bg-glass)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                      +{server.models.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showTestDialog && (
        <TestDialog
          serverName={server.name}
          serverIcon={server.icon}
          result={testResult}
          onContinue={handleContinue}
          onClose={() => setShowTestDialog(false)}
        />
      )}
    </div>
  );
};

export default ApiKeyInput;
