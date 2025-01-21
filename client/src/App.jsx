import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TalentPage from "./TalentPage/TalentPage.jsx";
import RegisterTalent from "./TalentPage/RegisterTalent.jsx";
import Admin from './AdminPanel/Admin';
import PendingRequest from './AdminPanel/pages/PendingRequest';
import DashBoard from "./AdminPanel/pages/DashBoard";
import Home from "./HomePage/Home.jsx";
import Register from "./Register/Register.jsx"

function isAdmin() {
  const token = localStorage.getItem("jwt");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload);
    return payload.role === "admin";
  } catch (error) {
    console.error("Invalid JWT:", error.message);
    return false;
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAdmin() ? <Navigate to="/admin/dashboard" replace /> : <Home />
          }
        />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="pending-req" element={<PendingRequest />} />
        </Route>
        <Route path="/talent-page" element={<TalentPage />} />
        <Route path="/talents" element={<TalentPage />} />
        <Route path="/register-talent" element={<RegisterTalent />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
