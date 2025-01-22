import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import axios from "axios";

const NavProfileIcon = () => {
  const [profileData, setProfileData] = useState({
    profilePic: null,
    username: "",
  });
  const [usern, setusern] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setLoading(false);
          return;
        }

        // Get username directly from JWT token
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId;
        const username = payload.username;
        setusern(username);

        // Only fetch profile picture from API
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profilePicture =
          response.data.user.jobseeker?.profilepic ||
          response.data.user.profilePic;

        console.log("Profile picture:", profilePicture); // Debug log

        setProfileData({
          profilePic: profilePicture,
          username: username, // Use username from JWT
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error.message);

        // Even if profile pic fetch fails, still set username from JWT
        const token = localStorage.getItem("jwt");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setProfileData((prev) => ({
            ...prev,
            username: payload.username,
          }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-100 group-hover:border-purple-300">
        <div className="w-5 h-5 rounded-full border-2 border-purple-300 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 group">
      {/* Profile Picture */}
      <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-100 group-hover:border-purple-300 overflow-hidden">
        {profileData.profilePic ? (
          <img
            src={profileData.profilePic}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image load error:", e);
              setProfileData((prev) => ({ ...prev, profilePic: null }));
            }}
          />
        ) : (
          <User className="w-6 h-6 text-purple-600" />
        )}
      </div>

      {/* Username */}
      <div>
        <span className="text-sm text-gray-700">{usern}</span>
      </div>
    </div>
  );
};

export default NavProfileIcon;
