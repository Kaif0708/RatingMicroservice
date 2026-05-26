import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserList from './pages/UserList';
import UserProfile from './pages/UserProfile';
import HotelList from './pages/HotelList';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: '2rem 0' }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/hotels" element={<HotelList />} />
          </Routes>
        </AnimatePresence>
      </main>
    </Router>
  );
}

export default App;
