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

const ChatHeader: React.FC<ChatHeaderProps> = ({ server, selectedModel, models, onModelChange, showModelDropdown, setShowModelDropdown, onToggleSidebar }) => {
  return (
    <div className="chat-header d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-icon btn-ghost d-md-none" onClick={onToggleSidebar}>
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

      <div className="model-dropdown">
        <button className="model-btn" onClick={() => setShowModelDropdown(!showModelDropdown)}>
          <i className="bi bi-cpu"></i>
          <span className="model-btn-name">{selectedModel?.name || 'Select Model'}</span>
          <i className="bi bi-chevron-down ms-2"></i>
        </button>

        {showModelDropdown && (
          <>
            <div className="position-fixed top-0 start-0 w-100 h-100" onClick={() => setShowModelDropdown(false)} style={{ zIndex: 1 }} />
            <div className="model-menu" style={{ zIndex: 2 }}>
              <div className="model-menu-header">
                <h6>
                  <span><i className="bi bi-robot me-2"></i>Select Model</span>
                  <span className="model-count">{models.length} models</span>
                </h6>
              </div>
              <div className="model-list">
                {models.map((model) => (
                  <div key={model.id} className={`model-item ${selectedModel?.id === model.id ? 'active' : ''}`} onClick={() => { onModelChange(model.id); setShowModelDropdown(false); }}>
                    <div className="fw-semibold">{model.name}</div>
                    <small className="text-secondary">{model.description}</small>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
