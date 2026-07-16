import type { ChatSession } from '../../types/common.types';

interface HistoryItemProps {
  session: ChatSession;
  onClick: () => void;
  onDelete: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ session, onClick, onDelete }) => {
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
    <div className="history-item position-relative">
      <div 
        className="d-flex justify-content-between align-items-start"
        onClick={onClick}
        role="button"
      >
        <div className="flex-grow-1 me-2" style={{ overflow: 'hidden' }}>
          <div className="fw-semibold text-truncate">{session.title}</div>
          <small className="text-secondary">
            {session.messages.length} messages • {formatDate(session.updatedAt)}
          </small>
        </div>
        <button
          className="btn btn-link text-secondary p-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete chat"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;
