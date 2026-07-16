import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { getServerById, getModelsByServer } from '../types/api.types';
import { storageService } from '../services/storageService';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import HistorySidebar from '../components/history/HistorySidebar';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    selectedServer, 
    selectedModel,
    setSelectedModel,
    startNewChat,
    loadSession,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const server = selectedServer ? getServerById(selectedServer) : null;
  const models = selectedServer ? getModelsByServer(selectedServer) : [];
  const selectedModelData = models.find(m => m.id === selectedModel);

  useEffect(() => {
    // Check if user has selected a server and API key
    const savedServer = storageService.getSelectedServer();
    const savedApiKey = savedServer ? storageService.getApiKey(savedServer) : null;

    if (!savedServer || !savedApiKey) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Close sidebar on larger screens
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    startNewChat();
    setSidebarOpen(false);
  };

  const handleSelectSession = (session: any) => {
    loadSession(session);
    setSidebarOpen(false);
  };

  return (
    <div className="chat-container">
      <HistorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
      />

      <div className="chat-main flex-grow-1">
        <ChatHeader
          server={server}
          selectedModel={selectedModelData}
          models={models}
          onModelChange={setSelectedModel}
          showModelDropdown={showModelDropdown}
          setShowModelDropdown={setShowModelDropdown}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <ChatMessages messages={messages} isLoading={isLoading} />

        <ChatInput 
          onSendMessage={sendMessage} 
          isLoading={isLoading}
        />
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Chat;
