import { useState, useEffect } from 'react';
import type { ChatSession } from '../../types/common.types';
import { storageService } from '../../services/storageService';
import HistoryItem from './HistoryItem';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectSession: (session: ChatSession) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onNewChat,
  onSelectSession,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const history = storageService.getChatHistory();
    setSessions(history);
  };

  const handleDeleteSession = (sessionId: string) => {
    storageService.deleteSession(sessionId);
    loadSessions();
  };

  return (
    <div className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="p-3 border-bottom border-secondary">
        <button
          className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={onNewChat}
        >
          <i className="bi bi-plus-lg"></i>
          New Chat
        </button>
      </div>

      <div className="flex-grow-1 overflow-auto">
        {sessions.length === 0 ? (
          <div className="p-3 text-center text-secondary">
            <i className="bi bi-clock-history" style={{ fontSize: '2rem', opacity: 0.5 }}></i>
            <p className="mt-2 mb-0">No chat history yet</p>
          </div>
        ) : (
          sessions.map((session) => (
            <HistoryItem
              key={session.id}
              session={session}
              onClick={() => onSelectSession(session)}
              onDelete={() => handleDeleteSession(session.id)}
            />
          ))
        )}
      </div>

      <div className="p-3 border-top border-secondary">
        <small className="text-secondary">
          <i className="bi bi-info-circle me-1"></i>
          History is stored locally
        </small>
      </div>
    </div>
  );
};

export default HistorySidebar;
