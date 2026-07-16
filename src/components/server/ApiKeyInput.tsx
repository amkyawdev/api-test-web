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
      if (savedKey) {
        setApiKeyInput(savedKey);
      }
    }
  }, [serverId]);

  const handleTestConnection = async () => {
    if (!apiKeyInput.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key' });
      return;
    }

    setShowTestDialog(true);

    try {
      const result = await apiService.testApiKey(serverId!, apiKeyInput);
      setTestResult({ success: result.success, message: result.message });

      if (result.success && serverId) {
        storageService.saveApiKey(serverId, apiKeyInput);
        setSelectedServer(serverId);
        setApiKey(apiKeyInput);
      }
    } catch (error) {
      setTestResult({ 
        success: false, 
        message: 'Connection test failed. Please try again.' 
      });
    }
  };

  const handleContinue = () => {
    if (testResult?.success) {
      navigate('/chat');
    }
    setShowTestDialog(false);
  };

  const handleCloseDialog = () => {
    setShowTestDialog(false);
    setTestResult(null);
  };

  if (!server) {
    return (
      <div className="container py-5 text-center">
        <h2>Server not found</h2>
        <button 
          className="btn btn-primary-custom mt-3"
          onClick={() => navigate('/')}
        >
          Back to Servers
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card-custom p-4">
            <div className="text-center mb-4">
              <div className="server-icon mb-3">{server.icon}</div>
              <h2 className="fw-bold">{server.name}</h2>
              <p className="text-secondary">{server.description}</p>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-key me-2"></i>
                API Key
              </label>
              <input
                type="password"
                className="form-control form-control-custom"
                placeholder="Enter your API key..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                autoComplete="off"
              />
              <small className="text-secondary mt-2 d-block">
                Your API key is stored locally in your browser and never sent to our servers.
              </small>
            </div>

            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-custom flex-grow-1"
                onClick={() => navigate('/')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back
              </button>
              <button
                className="btn btn-primary-custom flex-grow-1"
                onClick={handleTestConnection}
                disabled={!apiKeyInput.trim()}
              >
                <i className="bi bi-plug me-2"></i>
                Test & Connect
              </button>
            </div>

            {server.models.length > 0 && (
              <div className="mt-4 pt-4 border-top border-secondary">
                <h5 className="mb-3">
                  <i className="bi bi-cpu me-2"></i>
                  Available Models
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {server.models.slice(0, 5).map((model) => (
                    <span 
                      key={model.id}
                      className="badge bg-secondary px-3 py-2"
                    >
                      {model.name}
                    </span>
                  ))}
                  {server.models.length > 5 && (
                    <span className="badge bg-secondary px-3 py-2">
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
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default ApiKeyInput;
