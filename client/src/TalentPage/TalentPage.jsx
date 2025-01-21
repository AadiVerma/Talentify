import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const TalentPage = () => {
  const [talents, setTalents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);

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

  const filteredTalents = Array.isArray(talents)
    ? talents.filter((talent) => {
        // First check if the talent is approved
        if (!talent.approve) {
          return false;
        }

        const fullName = `${talent.firstname} ${talent.lastname}`.toLowerCase();
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
    : [];

  const handleHire = (talentId) => {
    alert("Hire request sent!");
  };

  return (
    <div className="min-h-screen bg-gray-50 ss4">
      {/* Navbar */}
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

            {/* Desktop Navigation */}
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

        {/* Mobile Navigation */}
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
        {/* Search and Filter Section */}
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
                onChange={(e) => setFilter(e.target.value)}
                className="md:w-48 py-4 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
              >
                <option value="">All Skills</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Area with Side Panel */}
        <div className="relative flex">
          {/* Talent Grid */}
          <div className={`w-full ${selectedTalent ? "lg:w-2/3" : "w-full"}`}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                selectedTalent ? "lg:grid-cols-2" : "lg:grid-cols-3"
              } gap-4`}
            >
              {filteredTalents.length > 0 ? (
                filteredTalents.map((talent) => (
                  <div
                    key={talent.id || `${talent.firstname}-${talent.lastname}`}
                    className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-[16rem]"
                    onClick={() => setSelectedTalent(talent)}
                  >
                    <div className="p-4 h-full flex flex-col">
                      {/* Profile section - horizontal layout */}
                      <div className="flex gap-4 mb-3">
                        {/* Left side - Profile picture */}
                        <div className="relative flex-shrink-0 px-8">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-50 group-hover:border-purple-100 transition-colors">
                            <img
                              src={talent.photo || "/api/placeholder/96/96"}
                              className="w-full h-full object-cover "
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>

                        {/* Right side - Name, Experience, Skills */}
                        <div className="flex-grow min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                            {`${talent.firstname} ${talent.lastname}`}
                          </h3>
                          <p className="text-purple-600 font-medium text-sm mb-2">
                            {`${talent.experience} Years Experience`}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(talent.skills) &&
                              talent.skills.slice(0, 2).map((skill, index) => (
                                <span
                                  key={`${skill}-${index}`}
                                  className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg"
                                >
                                  {skill}
                                </span>
                              ))}
                            {Array.isArray(talent.skills) &&
                              talent.skills.length > 2 && (
                                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg">
                                  +{talent.skills.length - 2}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Description with 2 lines and ellipsis */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {talent.description}
                      </p>

                      {/* Hire Button */}
                      <button
                        className="mt-auto w-full flex items-center justify-center gap-1 bg-purple-600 text-white py-2.5 px-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHire(talent.id);
                        }}
                      >
                        <Briefcase size={16} />
                        <span className="font-medium text-sm">Hire</span>
                      </button>
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
          </div>

          {/* Side Panel */}
          {selectedTalent && (
            <div className="hidden lg:block fixed right-0 top-20 w-1/3 bg-white border-l border-gray-100 shadow-lg h-[calc(100vh-5rem)] overflow-y-auto p-8">
              <button
                onClick={() => setSelectedTalent(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              {/* Profile Section */}
              <div className="text-center mb-8">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-purple-50 mb-6">
                  <img
                    src={selectedTalent.photo || "/api/placeholder/144/144"}
                    alt={`${selectedTalent.firstname} ${selectedTalent.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {`${selectedTalent.firstname} ${selectedTalent.lastname}`}
                </h2>
                <p className="text-purple-600 font-medium">
                  {`${selectedTalent.experience} Years Experience`}
                </p>
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

              {/* Hire Button */}
              <button
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md font-medium"
                onClick={() => handleHire(selectedTalent.id)}
              >
                <Briefcase size={20} />
                <span>Hire {selectedTalent.firstname}</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                  Talentify
                </h3>
              </div>
              <p className="text-gray-600">
                Connecting exceptional talent with innovative opportunities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link
                  to="/about"
                  className="block text-gray-600 hover:text-purple-600 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/how-it-works"
                  className="block text-gray-600 hover:text-purple-600 transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  to="/success-stories"
                  className="block text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Success Stories
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>support@talentify.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Talentify. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default TalentPage;
