import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, Menu } from "lucide-react";

function TalentPage() {
  const [talents, setTalents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulating API call
    const mockTalents = [
      {
        id: 1,
        name: "Shivam Sharma",
        skills: ["Developer", "UI/UX"],
        description: "Full-stack developer with 5 years of experience",
        photo: "",
      },
      // Add more mock data as needed
    ];
    setTalents(mockTalents);
  }, []);

  const filteredTalents = Array.isArray(talents)
    ? talents.filter((talent) => {
        const nameMatch = talent.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const skillMatch = talent.skills
          ? talent.skills.some((skill) =>
              skill.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : false;
        const filterMatch =
          !filter || talent.skills?.some((skill) => skill === filter);

        return (nameMatch || skillMatch) && filterMatch;
      })
    : [];

  const handleHire = (talentId) => {
    // Simulate hire request
    alert("Hire request sent!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-purple-900">Talentify</h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className="text-gray-900 hover:text-purple-800 font-medium"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-gray-900 hover:text-purple-800 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register-talent"
                className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors duration-300"
              >
                Get Hired
              </Link>
              <div className="relative">
                <Link to="/profile">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300 hover:border-purple-500 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 2.25c-3 0-9 1.5-9 4.5V21h18v-2.25c0-3-6-4.5-9-4.5z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-2 text-gray-900 hover:bg-purple-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-900 hover:bg-purple-50"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-900 hover:bg-purple-50"
              >
                Login
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-900 hover:bg-purple-50"
              >
                Profile
              </Link>
              <Link
                to="/register-talent"
                className="block px-4 py-2 text-gray-900 hover:bg-purple-50"
              >
                Join as Talent
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Find Top Talent
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search by name or skill"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
            </div>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Skills</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>

        {/* Talent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.length > 0 ? (
            filteredTalents.map((talent) => (
              <div
                key={talent.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <img
                    src={talent.photo}
                    alt={`${talent.name}'s profile`}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-purple-100"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 text-center">
                    {talent.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center mt-3 mb-4">
                    {talent.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-center mb-6">
                    {talent.description}
                  </p>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-purple-900 text-white py-3 px-4 rounded-lg hover:bg-purple-800 transition-colors duration-300"
                    onClick={() => handleHire(talent.id)}
                  >
                    <Briefcase size={18} />
                    <span>Hire Me</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No talents available.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TalentPage;
