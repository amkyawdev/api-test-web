import { SERVERS } from '../types/api.types';

const About: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-title mb-3">
          <i className="bi bi-info-circle me-2"></i>
          About API Test Hub
        </h1>
        <p className="text-secondary lead">A unified interface for testing AI service providers</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="glass-card p-4 h-100">
            <h3 className="mb-3"><i className="bi bi-shield-check me-2 text-success"></i>Privacy First</h3>
            <p className="text-secondary mb-0">Your API keys are stored locally in your browser and never transmitted to any external servers. All API calls are made directly between your browser and the AI service providers.</p>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="glass-card p-4 h-100">
            <h3 className="mb-3"><i className="bi bi-people me-2 text-warning"></i>Credits</h3>
            <div className="row">
              <div className="col-6 mb-3">
                <strong><i className="bi bi-person-badge me-2"></i>Admin</strong>
                <div className="text-secondary">Aung Myo Kyaw</div>
              </div>
              <div className="col-6 mb-3">
                <strong><i className="bi bi-code-slash me-2"></i>Developer</strong>
                <div className="text-secondary">AmkyawDev</div>
              </div>
              <div className="col-12">
                <strong><i className="bi bi-geo-alt me-2"></i>Location</strong>
                <div className="text-secondary">Nay Pyi Taw, Myanmar</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="glass-card p-4">
            <h3 className="mb-4"><i className="bi bi-robot me-2 text-primary"></i>Supported AI Providers ({SERVERS.length})</h3>
            <div className="about-grid">
              {SERVERS.map((server) => (
                <div key={server.id} className="about-provider">
                  <span className="about-provider-icon">{server.icon}</span>
                  <div>
                    <div className="about-provider-name">{server.name}</div>
                    <div className="about-provider-models">{server.models.length} models</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="glass-card p-4">
            <h3 className="mb-4"><i className="bi bi-star me-2 text-info"></i>Features</h3>
            <ul className="feature-list">
              <li><i className="bi bi-check-circle-fill feature-icon"></i><span>Test API keys with real-time connection validation</span></li>
              <li><i className="bi bi-check-circle-fill feature-icon"></i><span>Chat with multiple AI models from different providers</span></li>
              <li><i className="bi bi-check-circle-fill feature-icon"></i><span>Automatic chat history saved locally</span></li>
              <li><i className="bi bi-check-circle-fill feature-icon"></i><span>Responsive design works on all devices</span></li>
              <li><i className="bi bi-check-circle-fill feature-icon"></i><span>No backend required - runs entirely in your browser</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
