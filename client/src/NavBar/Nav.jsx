import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import image from '/Avatar.jpg'
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios";
export default function Nav({ homelink, explorelink, aboutlink, contactlink, registerlink }) {
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  let token;
  useEffect(() => {
    token = localStorage.getItem("jwt");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser({
          name: userData.username || "User",
          profilePic: userData.profilePic || image,
        });
      } catch (error) {
        console.error("Invalid JWT:", error.message);
      }
    }
  }, []);
  token = localStorage.getItem("jwt");
  function getUserId() {
    const token = localStorage.getItem("jwt");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId;
    } catch (error) {
      console.error("Invalid JWT:", error.message);
      return null;
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    toast('Log Out SuccessFully!', {
      icon: '☠️',
    });
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-100/30">
        {/* <Toaster/> */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent"
              to="/"
            >
              Talentify
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-4">
              <Link
                to={`/${homelink}`}
                className="text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to={`/${explorelink}`}
                className="text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                Explore
              </Link>
              <a
                href={`/${aboutlink}`}
                className="text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                About
              </a>
              <button
                onClick={async() => {
                  try {
                    const id = getUserId();
                    const response = await axios.get(`https://talentify.onrender.com/api/v1/user/${id}`);
                    console.log(response);
                    if (token && !response.data.user.jobseeker) {
                      navigate(`/${registerlink}`)
                    }
                    else if (response.data.user.jobseeker && token) {
                      toast.success("Already register!!");
                    }
                    else {
                      toast.error('Please login First!');
                    }
                  } catch (error) {
                    toast.error("Please login First!")
                  }
                }}
                className="text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                Apply
              </button>
              <a
                href={`/${contactlink}`}
                className="text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                Contact
              </a>
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="group relative">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50">
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="hidden group-hover:block absolute right-0 top-10 w-32 h-8 mt-1 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="px-4 py-2 rounded-full border-2 border-black text-black hover:border-purple-700 hover:text-purple-700"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isDrawerOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            <Link
              to={`/${homelink}`}
              className="block text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              onClick={() => setIsDrawerOpen(false)}
            >
              Home
            </Link>
            <Link
              to={`/${explorelink}`}
              className="block text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              onClick={() => setIsDrawerOpen(false)}
            >
              Explore
            </Link>
            <Link
              to={`/${aboutlink}`}
              className="block text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              onClick={() => setIsDrawerOpen(false)}
            >
              About
            </Link>
            <button
              onClick={() => {
                if (token) {
                  navigate(`/${registerlink}`)
                }
                else {
                  toast.error("Please Login First!")
                }
                setIsDrawerOpen(false)
              }}

              className="block text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
            >
              Apply
            </button>
            <Link
              to={`/${contactlink}`}
              className="block text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/register");
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
