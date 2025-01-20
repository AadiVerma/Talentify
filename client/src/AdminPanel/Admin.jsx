import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 ">
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div
        className={`flex-grow p-6 min-h-screen bg-gray-100 transition-all duration-500 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
