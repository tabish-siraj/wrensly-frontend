import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { useAuth } from './auth/AuthContext.tsx';
import Home from './components/ui/Home.tsx';
import Login from './components/ui/Login.tsx';
function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}></Route>
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;
