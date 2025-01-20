import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from './AdminPanel/Admin';
import PendingRequest from './AdminPanel/pages/PendingRequest';
import DashBoard from "./AdminPanel/pages/DashBoard";
import AcceptedRequest from "./AdminPanel/pages/AcceptedRequest";

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent route for Admin Panel */}
        <Route path="/admin" element={<Admin />}>
          {/* Child routes with relative paths */}
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="accepted-req" element={<AcceptedRequest />} />
          <Route path="pending-req" element={<PendingRequest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
