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
        <h1 className="display-title mb-3">
          <i className="bi bi-server me-2"></i>
          Choose Your Server
        </h1>
        <p className="text-secondary lead">
          Select an AI service provider to get started
        </p>
      </div>

      <div className="server-grid">
        {SERVERS.map((server) => (
          <div 
            key={server.id} 
            className="server-card"
            onClick={() => handleServerSelect(server.id)}
          >
            <span className="server-icon">{server.icon}</span>
            <h3 className="server-name">{server.name}</h3>
            <p className="server-desc">{server.description}</p>
            <span className="server-models">{server.models.length} models</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseServer;
