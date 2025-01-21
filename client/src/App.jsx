import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TalentPage from "./TalentPage/TalentPage.jsx";
import RegisterTalent from "./TalentPage/RegisterTalent.jsx";
import Admin from './AdminPanel/Admin';
import PendingRequest from './AdminPanel/pages/PendingRequest';
import DashBoard from "./AdminPanel/pages/DashBoard";
import AcceptedRequest from "./AdminPanel/pages/AcceptedRequest";
import Home from "./HomePage/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="accepted-req" element={<AcceptedRequest />} />
          <Route path="pending-req" element={<PendingRequest />} />
        </Route>
        <Route path="/" element={<Home />} /> 
        <Route path="/talents" element={<TalentPage />} /> 
        <Route path="/register-talent" element={<RegisterTalent />} />
      </Routes>
    </Router>
  );
}

export default App;
