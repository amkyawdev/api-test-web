import { SERVERS } from '../types/api.types';

const About: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mb-3">
              <i className="bi bi-info-circle me-2"></i>
              About API Test Hub
            </h1>
            <p className="text-secondary lead">
              A unified interface for testing and interacting with various AI service providers
            </p>
          </div>

          <div className="card-custom p-4 mb-4">
            <h3 className="mb-3">
              <i className="bi bi-shield-check me-2 text-success"></i>
              Privacy First
            </h3>
            <p className="text-secondary mb-0">
              Your API keys are stored locally in your browser and never transmitted to any external servers. 
              All API calls are made directly between your browser and the AI service providers.
            </p>
          </div>

          <div className="card-custom p-4 mb-4">
            <h3 className="mb-3">
              <i className="bi bi-robot me-2 text-primary"></i>
              Supported AI Providers
            </h3>
            <div className="row g-3">
              {SERVERS.map((server) => (
                <div key={server.id} className="col-6 col-md-4 col-lg-3">
                  <div className="d-flex align-items-center gap-2 p-2 rounded bg-hover">
                    <span style={{ fontSize: '1.5rem' }}>{server.icon}</span>
                    <div>
                      <div className="fw-semibold">{server.name}</div>
                      <small className="text-secondary">
                        {server.models.length} models
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-custom p-4 mb-4">
            <h3 className="mb-3">
              <i className="bi bi-code-slash me-2 text-info"></i>
              Features
            </h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                <span>Test API keys with real-time connection validation</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                <span>Chat with multiple AI models from different providers</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                <span>Automatic chat history saved locally</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                <span>Responsive design works on all devices</span>
              </li>
              <li className="d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                <span>No backend required - runs entirely in your browser</span>
              </li>
            </ul>
          </div>

          <div className="card-custom p-4">
            <h3 className="mb-3">
              <i className="bi bi-people me-2 text-warning"></i>
              Credits
            </h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>
                    <i className="bi bi-person-badge me-2"></i>
                    Admin
                  </strong>
                  <div className="text-secondary">Aung Myo Kyaw</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>
                    <i className="bi bi-code-slash me-2"></i>
                    Developer
                  </strong>
                  <div className="text-secondary">AmkyawDev</div>
                </div>
              </div>
              <div className="col-12">
                <div>
                  <strong>
                    <i className="bi bi-geo-alt me-2"></i>
                    Location
                  </strong>
                  <div className="text-secondary">Nay Pyi Taw, Myanmar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
