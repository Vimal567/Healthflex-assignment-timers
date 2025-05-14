import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './components/Landingpage/Landingpage';
import History from './components/History/History';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
