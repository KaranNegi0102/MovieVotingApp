import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MovieList from './components/MovieList';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import NavBar from './components/NavBar';

const App = () => {
  const location = useLocation(); // isse current route ata h 

  return (
    <div className="App">
      {/* navbaar conditonally render hoga iss message se */}
      {location.pathname !== '/login' && location.pathname !== '/register' && <NavBar />}
      
      <div>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
