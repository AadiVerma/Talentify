import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TalentPage from "./TalentPage/TalentPage.jsx";
import RegisterTalent from "./TalentPage/RegisterTalent.jsx";
import Admin from './AdminPanel/Admin';
import PendingRequest from './AdminPanel/pages/PendingRequest';
import DashBoard from "./AdminPanel/pages/DashBoard";
import Home from "./HomePage/Home.jsx";
import Register from "./Register/Register.jsx"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="pending-req" element={<PendingRequest />} />

        </Route>
        <Route path="/talent-page" element={<TalentPage />} /> {/* Default Route */}
        <Route path="/talents" element={<TalentPage />} /> {/* Specific Route */}
        <Route path="/" element={<Home />} /> 
        <Route path="/register-talent" element={<RegisterTalent />} />
        <Route path="/signup" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
