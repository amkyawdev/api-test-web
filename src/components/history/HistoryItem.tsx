import type { ChatSession } from '../../types/common.types';

const HistoryItem: React.FC<{ session: ChatSession; onClick: () => void; onDelete: () => void }> = ({ session, onClick, onDelete }) => {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="history-item">
      <div className="d-flex justify-content-between align-items-start" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="flex-grow-1 me-2" style={{ overflow: 'hidden' }}>
          <div className="history-title">{session.title}</div>
          <div className="history-meta">{session.messages.length} messages • {formatDate(session.updatedAt)}</div>
        </div>
        <button className="btn btn-link text-secondary p-0" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;
