import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_SERVERS } from '../../types/api.types';
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
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Search in ALL_SERVERS
  const server = serverId ? ALL_SERVERS.find(s => s.id === serverId) : null;

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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (testResult?.success) navigate('/chat');
    setShowTestDialog(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && apiKeyInput.trim()) {
      handleTestConnection();
    }
  };

  if (!server) {
    return (
      <div className="container py-5 text-center">
        <div className="error-state">
          <div className="error-icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <h2>Server not found</h2>
          <p className="text-secondary">The server you're looking for doesn't exist.</p>
          <button className="btn btn-gradient mt-3" onClick={() => navigate('/')}>
            <i className="bi bi-arrow-left me-2"></i>Back to Servers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="glass-card p-4 p-md-5">
            {/* Header */}
            <div className="api-header text-center mb-4">
              <div className="api-icon-wrapper">
                <span className="api-icon">{server.icon}</span>
                <div className="api-icon-ring"></div>
              </div>
              <h2 className="fw-bold mt-3 mb-2">{server.name}</h2>
              <p className="text-secondary mb-0">{server.description}</p>
            </div>

            {/* API Key Input */}
            <div className="mb-4">
              <label className="form-label fw-semibold d-flex align-items-center gap-2">
                <i className="bi bi-key-fill"></i>
                API Key
              </label>
              <div className="input-wrapper">
                <input
                  type={showKey ? 'text' : 'password'}
                  className="input-glass"
                  placeholder="Enter your API key..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoComplete="off"
                />
                <button 
                  type="button"
                  className="input-toggle"
                  onClick={() => setShowKey(!showKey)}
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  <i className={`bi bi-${showKey ? 'eye-slash' : 'eye'}`}></i>
                </button>
              </div>
              <small className="text-muted mt-2 d-block">
                <i className="bi bi-shield-check me-1"></i>
                Your API key is stored locally in your browser.
              </small>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 flex-column flex-sm-row">
              <button className="btn btn-ghost flex-grow-1" onClick={() => navigate('/')}>
                <i className="bi bi-arrow-left me-2"></i>Back
              </button>
              <button
                className="btn btn-gradient flex-grow-1"
                onClick={handleTestConnection}
                disabled={!apiKeyInput.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Testing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plug me-2"></i>Test & Connect
                  </>
                )}
              </button>
            </div>

            {/* Models Section */}
            {server.models.length > 0 && (
              <div className="mt-4 pt-4 models-section">
                <h5 className="mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-grid-3x3-gap"></i>
                  Available Models
                  <span className="model-count">{server.models.length}</span>
                </h5>
                <div className="models-grid">
                  {server.models.slice(0, 6).map((model, index) => (
                    <div key={model.id} className="model-chip" style={{ animationDelay: `${index * 0.05}s` }}>
                      <span className="model-name">{model.name}</span>
                      <span className="model-desc">{model.description}</span>
                    </div>
                  ))}
                </div>
                {server.models.length > 6 && (
                  <p className="text-muted text-center mt-3 mb-0 small">
                    <i className="bi bi-info-circle me-1"></i>
                    +{server.models.length - 6} more models available
                  </p>
                )}
              </div>
            )}

            {/* Security Note */}
            <div className="security-note mt-4">
              <i className="bi bi-lock-fill"></i>
              <span>Your API key is encrypted and stored only in your browser's local storage.</span>
            </div>
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
