import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
      <Footer />
    </div>
    
  );
}

export default App;
