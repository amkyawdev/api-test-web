import { useState, useEffect } from 'react';
import type { ChatSession } from '../../types/common.types';
import { storageService } from '../../services/storageService';
import HistoryItem from './HistoryItem';

const HistorySidebar: React.FC<{ isOpen: boolean; onClose: () => void; onNewChat: () => void; onSelectSession: (s: ChatSession) => void }> = ({ isOpen, onNewChat, onSelectSession }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => { setSessions(storageService.getChatHistory()); }, []);

  return (
    <div className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="history-header">
        <button className="btn btn-gradient w-100" onClick={onNewChat}>
          <i className="bi bi-plus-lg me-2"></i>New Chat
        </button>
      </div>
      <div className="history-list">
        {sessions.length === 0 ? (
          <div className="p-3 text-center text-secondary">
            <i className="bi bi-clock-history" style={{ fontSize: '2rem', opacity: 0.5 }}></i>
            <p className="mt-2 mb-0">No chat history yet</p>
          </div>
        ) : sessions.map((s) => <HistoryItem key={s.id} session={s} onClick={() => onSelectSession(s)} onDelete={() => { storageService.deleteSession(s.id); setSessions(storageService.getChatHistory()); }} />)}
      </div>
      <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
        <small className="text-muted"><i className="bi bi-info-circle me-1"></i>History is stored locally</small>
      </div>
    </div>
  );
};

export default HistorySidebar;
