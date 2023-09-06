import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ChatBot from './pages/ChatBot';

function App() {
  return (
    <div style={{height:"100vh"}}>
      <Navbar />
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
