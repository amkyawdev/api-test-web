import { useNavigate } from 'react-router-dom';
import { SERVERS } from '../types/api.types';

const ChooseServer: React.FC = () => {
  const navigate = useNavigate();

  const handleServerSelect = (serverId: string) => {
    navigate(`/api-key/${serverId}`);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">
          <i className="bi bi-server me-2"></i>
          Choose Your Server
        </h1>
        <p className="text-secondary lead">
          Select an AI service provider to get started
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {SERVERS.map((server) => (
          <div key={server.id} className="col-6 col-md-4 col-lg-3">
            <div 
              className="server-card h-100"
              onClick={() => handleServerSelect(server.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleServerSelect(server.id)}
            >
              <div className="server-icon">{server.icon}</div>
              <h3 className="server-name">{server.name}</h3>
              <p className="server-description">{server.description}</p>
              <div className="mt-3">
                <small className="text-secondary">
                  {server.models.length} models available
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseServer;
