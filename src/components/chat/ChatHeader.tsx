import type { Server, Model } from '../../types/common.types';

interface ChatHeaderProps {
  server: Server | null | undefined;
  selectedModel: Model | undefined;
  models: Model[];
  onModelChange: (modelId: string) => void;
  showModelDropdown: boolean;
  setShowModelDropdown: (show: boolean) => void;
  onToggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  server,
  selectedModel,
  models,
  onModelChange,
  showModelDropdown,
  setShowModelDropdown,
  onToggleSidebar,
}) => {
  return (
    <div className="chat-header bg-card p-3 border-bottom border-secondary d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn btn-sm btn-outline-custom d-md-none"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>

        {server && (
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>{server.icon}</span>
            <div>
              <h5 className="mb-0 fw-bold">{server.name}</h5>
              <small className="text-secondary">{server.description}</small>
            </div>
          </div>
        )}
      </div>

      <div className="model-dropdown position-relative">
        <button
          className="btn btn-outline-custom btn-sm-custom dropdown-toggle"
          type="button"
          onClick={() => setShowModelDropdown(!showModelDropdown)}
          aria-expanded={showModelDropdown}
        >
          <i className="bi bi-cpu me-2"></i>
          {selectedModel?.name || 'Select Model'}
        </button>

        {showModelDropdown && (
          <>
            <div 
              className="position-fixed top-0 start-0 w-100 h-100"
              onClick={() => setShowModelDropdown(false)}
              style={{ zIndex: 1 }}
            />
            <ul 
              className="dropdown-menu show position-absolute end-0 mt-2"
              style={{ zIndex: 2, minWidth: '250px' }}
            >
              <li>
                <h6 className="dropdown-header text-secondary">
                  <i className="bi bi-robot me-2"></i>
                  Select Model
                </h6>
              </li>
              {models.map((model) => (
                <li key={model.id}>
                  <button
                    className={`dropdown-item d-flex justify-content-between align-items-start ${
                      selectedModel?.id === model.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      onModelChange(model.id);
                      setShowModelDropdown(false);
                    }}
                  >
                    <div>
                      <div className="fw-semibold">{model.name}</div>
                      <small className="text-secondary">{model.description}</small>
                    </div>
                    {selectedModel?.id === model.id && (
                      <i className="bi bi-check text-primary"></i>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
