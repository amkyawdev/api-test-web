import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ChooseServer from './pages/ChooseServer';
import ApiKeyInput from './components/server/ApiKeyInput';
import Chat from './pages/Chat';
import About from './pages/About';
import './styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<ChooseServer />} />
              <Route path="/api-key/:serverId" element={<ApiKeyInput />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
