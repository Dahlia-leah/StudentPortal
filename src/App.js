import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentPage from "./components/StudentPage";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import ArchivePage from "./components/ArchivePage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";


import './App.css'
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main student page */}
          <Route path="/" element={<StudentPage />} />

          {/* Admin login page */}
          <Route path="/admin" element={<LoginPage />} />

          {/* Protected Admin dashboard (requires authentication) */}
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

          {/* Protected Archive page (requires authentication) */}
          <Route path="/admin/archive" element={<PrivateRoute><ArchivePage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
