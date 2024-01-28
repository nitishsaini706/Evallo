import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Login from './components/Login';
import MarketPlace from './components/MarketPlace';
import AdminPanel from './components/AdminPanel';
import Register from './components/Register';
import {isAdmin,isAuthenticated} from "./auth/auth"
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isAuthenticated() ? <MarketPlace /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated() && isAdmin() ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
