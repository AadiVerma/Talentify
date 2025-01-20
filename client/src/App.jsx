import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TalentPage from "./TalentPage/TalentPage.jsx"; // Import your homepage2 page
import RegisterTalent from "./TalentPage/RegisterTalent.jsx";
import Admin from './AdminPanel/Admin';
import PendingRequest from './AdminPanel/pages/PendingRequest';
import DashBoard from "./AdminPanel/pages/DashBoard";
import AcceptedRequest from "./AdminPanel/pages/AcceptedRequest";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<Admin />}>
          {/* Child routes with relative paths */}
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="accepted-req" element={<AcceptedRequest />} />
          <Route path="pending-req" element={<PendingRequest />} />
        </Route>
        <Route path="/" element={<TalentPage />} /> {/* Default Route */}
        <Route path="/talents" element={<TalentPage />} /> {/* Specific Route */}
        <Route path="/register-talent" element={<RegisterTalent />} />
      </Routes>
    </Router>
  );
}

export default App;
