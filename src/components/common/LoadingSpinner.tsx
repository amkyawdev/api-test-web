interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClass = size === 'sm' ? 'loading-spinner-sm' : size === 'lg' ? 'loading-spinner-lg' : '';
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3">
      <div className={`loading-spinner ${sizeClass}`}></div>
      {text && <span className="text-secondary">{text}</span>}
      <style>{`
        .loading-spinner-sm {
          width: 30px;
          height: 30px;
          border-width: 3px;
        }
        .loading-spinner-lg {
          width: 60px;
          height: 60px;
          border-width: 5px;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
