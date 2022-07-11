import './App.css';
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import ListPage from './pages/ListPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" exact={true} element={<ListPage/>} />
      </Routes>
    </div>
    
  );
}

export default App;
