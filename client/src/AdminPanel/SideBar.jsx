import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { PiChatsBold } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const menus = [
    { name: "DashBoard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "Accepted Team", link: "/admin/accepted-req", icon: GrGroup },
    { name: "Pending Request", link: "/admin/pending-req", icon: PiChatsBold, count: 12 },
    { name: "Pending Hire Request", link: "/admin/pending-hire-req", icon: PiChatsBold, count: 8 },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`bg-white h-screen fixed top-0 left-0 text-gray-800 px-3 shadow-md ${
        sidebarOpen ? "w-64" : "w-16"
      } duration-500 flex flex-col z-50 border-r border-gray-300`}
    >
      <div className="flex items-start justify-between py-3 mb-6">
        {sidebarOpen && (
          <div className="flex flex-col mt-3 pl-2 text-left">
            <span className="font-bold text-purple-700">Username</span>
            <span className="text-sm text-gray-500">email@example.com</span>
          </div>
        )}
        <HiMenuAlt3
          size={26}
          className="cursor-pointer text-purple-700 ml-2 mt-4"
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
      </div>

      <div className="flex flex-col gap-5 mt-16 flex-grow relative text-lg">
        {menus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className={`relative flex items-center gap-2 p-2 rounded-md hover:bg-purple-100 group ${
              location.pathname === menu.link
                ? "bg-purple-200 text-purple-800"
                : "text-gray-600 hover:text-purple-700"
            }`}
          >
            <div className="text-purple-900 relative">
              {React.createElement(menu.icon, { size: "30" })}
              {menu.count !== undefined && (
                <div
                  className={`absolute -top-2 -right-2 flex 2px items-center justify-center rounded-full bg-purple-900 text-white text-xs font-bold w-5 h-5`}
                >
                  {menu.count}
                </div>
              )}
            </div>
            {sidebarOpen && (
              <div className="text-sm font-bold whitespace-pre duration-500">
                {menu.name}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-auto py-3 px-0 pb-6">
        <button className="flex items-center gap-2 pr-36 pl-2 pt-2 pb-2 rounded-md group hover:bg-purple-100">
          <IoLogOut size={26} className="text-purple-800" />
          {sidebarOpen && contentVisible && (
            <div
              style={{ transitionDelay: `${(menus.length + 3) * 100}ms` }}
              className="text-sm whitespace-pre duration-500 translate-x-4 text-gray-600 font-extrabold"
            >
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
