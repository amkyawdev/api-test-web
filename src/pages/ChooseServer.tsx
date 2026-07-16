import { useNavigate } from 'react-router-dom';
import { ALL_SERVERS } from '../types/api.types';

const ChooseServer: React.FC = () => {
  const navigate = useNavigate();

  const handleServerSelect = (serverId: string) => {
    navigate(`/api-key/${serverId}`);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-title mb-3">
          <i className="bi bi-rocket-takeoff me-2"></i>
          API Test Hub
        </h1>
        <p className="text-secondary lead">
          Select an AI service provider to get started
        </p>
        <span className="badge-count">{ALL_SERVERS.length} providers • {ALL_SERVERS.reduce((acc, s) => acc + s.models.length, 0)} models</span>
      </div>

      <div className="server-grid">
        {ALL_SERVERS.map((server) => (
          <div 
            key={server.id} 
            className="server-card"
            onClick={() => handleServerSelect(server.id)}
          >
            <div className="card-glow"></div>
            <span className="server-icon">{server.icon}</span>
            <h3 className="server-name">{server.name}</h3>
            <p className="server-desc">{server.description}</p>
            <div className="server-meta">
              <span className="server-models">
                <i className="bi bi-cpu me-1"></i>
                {server.models.length} models
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseServer;
