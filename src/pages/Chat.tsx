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
  const { messages, isLoading, sendMessage, selectedServer, selectedModel, setSelectedModel, startNewChat, loadSession } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const server = selectedServer ? getServerById(selectedServer) : null;
  const models = selectedServer ? getModelsByServer(selectedServer) : [];
  const selectedModelData = models.find(m => m.id === selectedModel);

  useEffect(() => {
    const savedServer = storageService.getSelectedServer();
    const savedApiKey = savedServer ? storageService.getApiKey(savedServer) : null;
    if (!savedServer || !savedApiKey) navigate('/');
  }, [navigate]);

  return (
    <div className="chat-layout">
      <HistorySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNewChat={() => { startNewChat(); setSidebarOpen(false); }} onSelectSession={(s) => { loadSession(s); setSidebarOpen(false); }} />
      <div className="chat-main">
        <ChatHeader server={server} selectedModel={selectedModelData} models={models} onModelChange={setSelectedModel} showModelDropdown={showModelDropdown} setShowModelDropdown={setShowModelDropdown} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
      {sidebarOpen && <div className="position-fixed top-0 start-0 w-100 h-100 d-md-none" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 99 }} onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default Chat;
