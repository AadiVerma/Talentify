import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Briefcase,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  Eye,
  User,
} from "lucide-react";

// Profile Icon Component for fallback
const ProfileIcon = ({ className }) => (
  <div
    className={`w-full h-full flex items-center justify-center bg-purple-50 ${className}`}
  >
    <User className="w-1/2 h-1/2 text-purple-300" />
  </div>
);

const PaginationButton = ({ children, onClick, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      active
        ? "bg-purple-600 text-white"
        : disabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600"
    } border border-gray-200`}
  >
    {children}
  </button>
);

const TalentPage = () => {
  const [talents, setTalents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("experience");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const sidePanelRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 15;

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/get-talents"
        );
        const data = await response.json();
        setTalents(data);
      } catch (error) {
        console.error("Error fetching talents:", error);
      }
    };

    fetchTalents();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedTalent &&
        sidePanelRef.current &&
        !sidePanelRef.current.contains(event.target) &&
        !event.target.closest(".talent-card")
      ) {
        setSelectedTalent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTalent]);

  const handleLike = async (talentId, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/like-talent/${talentId}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setTalents(
          talents.map((talent) =>
            talent._id === talentId
              ? { ...talent, likes: (talent.likes || 0) + 1 }
              : talent
          )
        );
      }
    } catch (error) {
      console.error("Error liking talent:", error);
    }
  };

  const handleView = async (talent) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/increment-view/${talent._id}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setTalents(
          talents.map((t) =>
            t._id === talent._id ? { ...t, views: (t.views || 0) + 1 } : t
          )
        );
      }
    } catch (error) {
      console.error("Error incrementing view:", error);
    }
  };

  const handleHire = async (talentId) => {
    // Implement hire functionality
    console.log("Hiring talent:", talentId);
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "block";
  };

  const sortTalents = (talents) => {
    return [...talents].sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return b.experience - a.experience;
        case "likes":
          return (b.likes || 0) - (a.likes || 0);
        case "views":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
  };

  const filteredTalents = Array.isArray(talents)
    ? sortTalents(
        talents.filter((talent) => {
          if (!talent.approve) return false;

          const fullName =
            `${talent.firstname} ${talent.lastname}`.toLowerCase();
          const nameMatch = fullName.includes(searchQuery.toLowerCase());
          const skillMatch = Array.isArray(talent.skills)
            ? talent.skills.some((skill) =>
                skill.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : false;
          const filterMatch =
            !filter ||
            (Array.isArray(talent.skills) && talent.skills.includes(filter));

          return (nameMatch || skillMatch) && filterMatch;
        })
      )
    : [];

  // Pagination calculations
  const totalPages = Math.ceil(filteredTalents.length / profilesPerPage);
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredTalents.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };
  const renderPaginationButtons = () => {
    const pageNumbers = getPageNumbers();

    return pageNumbers.map((number, index) => {
      if (number === "...") {
        return (
          <span
            key={index}
            className="px-4 py-2 text-sm font-medium text-gray-700"
          >
            ...
          </span>
        );
      }
      return (
        <PaginationButton
          key={index}
          onClick={() => handlePageChange(number)}
          active={currentPage === number}
          disabled={currentPage === number}
        >
          {number}
        </PaginationButton>
      );
    });
  };

  return (
    <div className="min-h-screen ss4 bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <Link
                className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent"
                to="/"
              >
                Talentify
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/register-talent"
                className="bg-purple-700 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Get Hired
              </Link>
              <Link to="/profile" className="group">
                <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-100 group-hover:border-purple-300 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-gray-500 hover:bg-purple-50 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="space-y-2 py-3">
              <Link
                to="/"
                className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                Profile
              </Link>
              <div className="px-4 pt-2">
                <Link
                  to="/register-talent"
                  className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Join as Talent
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`transition-all duration-300 ${
            selectedTalent ? "lg:pr-[33.333333%]" : ""
          }`}
        >
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Top Talent
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Connect with skilled professionals ready to bring value to your
              projects
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Search by name, skill, or expertise..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                />
                <Search
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="md:w-48 py-4 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
              >
                <option value="experience">Sort by Experience</option>
                <option value="likes">Sort by Likes</option>
                <option value="views">Sort by Views</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative flex">
          <div className={`w-full ${selectedTalent ? "lg:w-2/3" : "w-full"}`}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                selectedTalent ? "lg:grid-cols-2" : "lg:grid-cols-3"
              } gap-4`}
            >
              {filteredTalents.length > 0 ? (
                filteredTalents.map((talent) => (
                  <div
                    key={talent._id}
                    className="talent-card group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedTalent(talent);
                      handleView(talent);
                    }}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex gap-6 mb-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-50 group-hover:border-purple-100 transition-colors">
                            {talent.profilepic ? (
                              <>
                                <img
                                  src={talent.profilepic}
                                  className="w-full h-full object-cover"
                                  onError={handleImageError}
                                  alt={`${talent.firstname} ${talent.lastname}`}
                                />
                                <ProfileIcon className="hidden" />
                              </>
                            ) : (
                              <ProfileIcon />
                            )}
                          </div>

                          <div className="absolute -right-1 bottom-1">
                            <div className="bg-white rounded-full p-1 shadow-sm">
                              <svg
                                className="w-5 h-5 text-green-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  fill="currentColor"
                                  fillOpacity="0.2"
                                />
                                <path
                                  d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow min-w-0 pt-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                            {`${talent.firstname} ${talent.lastname}`}
                          </h3>
                          <p className="text-purple-600 font-medium text-sm mb-3">
                            {`${talent.experience} Years Experience`}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(talent.skills) &&
                              talent.skills.slice(0, 2).map((skill, index) => (
                                <span
                                  key={`${skill}-${index}`}
                                  className="px-3 py-1.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg"
                                >
                                  {skill}
                                </span>
                              ))}
                            {Array.isArray(talent.skills) &&
                              talent.skills.length > 2 && (
                                <span className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg">
                                  +{talent.skills.length - 2}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                        {talent.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex gap-3 mb-3">
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHire(talent._id);
                            }}
                          >
                            <Briefcase size={16} />
                            <span className="font-medium text-sm">Hire</span>
                          </button>
                          <button
                            className="flex items-center justify-center gap-1 bg-pink-50 text-pink-600 py-3 px-5 rounded-lg hover:bg-pink-100 transition-colors"
                            onClick={(e) => handleLike(talent._id, e)}
                          >
                            <Heart size={16} />
                          </button>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Heart size={12} />
                            {talent.likes || 0} likes
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye size={12} />
                            {talent.views || 0} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                  <div className="bg-purple-50 rounded-full p-4 mb-4">
                    <Search size={32} className="text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-lg text-center">
                    No talents match your search criteria.
                  </p>
                </div>
              )}
            </div>
            {filteredTalents.length > profilesPerPage && (
              <div className="mt-8 flex justify-center gap-2">
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </PaginationButton>

                {getPageNumbers().map((pageNum, index) => (
                  <React.Fragment key={index}>
                    {pageNum === "..." ? (
                      <span className="px-4 py-2 text-gray-400">...</span>
                    ) : (
                      <PaginationButton
                        onClick={() => handlePageChange(pageNum)}
                        active={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationButton>
                    )}
                  </React.Fragment>
                ))}

                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PaginationButton>
                
              </div>
            )}
          </div>

          {/* Side Panel */}
          {selectedTalent && (
            <div
              ref={sidePanelRef}
              className="hidden lg:block fixed right-0 top-20 w-1/3 bg-white border-l border-gray-100 shadow-lg h-[calc(100vh-5rem)] overflow-y-auto p-8"
            >
              <button
                onClick={() => setSelectedTalent(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close panel"
              >
                <X size={20} className="text-gray-500" />
              </button>

              <div className="text-center mb-8">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-purple-50 mb-6">
                  {selectedTalent.profilepic ? (
                    <>
                      <img
                        src={selectedTalent.profilepic}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        alt={`${selectedTalent.firstname} ${selectedTalent.lastname}`}
                      />
                      <ProfileIcon className="hidden" />
                    </>
                  ) : (
                    <ProfileIcon />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {`${selectedTalent.firstname} ${selectedTalent.lastname}`}
                </h2>
                <p className="text-purple-600 font-medium">
                  {`${selectedTalent.experience} Years Experience`}
                </p>
                <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {selectedTalent.likes || 0} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {selectedTalent.views || 0} views
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedTalent.description}
                </p>
              </div>

              {/* Skills Section */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(selectedTalent.skills) &&
                    selectedTalent.skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                  onClick={() => handleHire(selectedTalent._id)}
                >
                  <Briefcase size={16} />
                  <span className="font-medium text-sm">Hire Now</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-purple-50 text-purple-600 py-3 px-4 rounded-lg hover:bg-purple-100 transition-colors"
                  onClick={(e) => handleLike(selectedTalent._id, e)}
                >
                  <Heart size={16} />
                  <span className="font-medium text-sm">Like Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TalentPage;
