import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function RegisterTalent() {
  const navigate = useNavigate();
  const availableSkills = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "Scala",
    "Perl",
    "HTML",
    "CSS",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Express.js",
    "Next.js",
    "Svelte",
    "Bootstrap",
    "Tailwind CSS",
    "jQuery",
    "Django",
    "Flask",
    "Spring Boot",
    "ASP.NET",
    "Ruby on Rails",
    "Laravel",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "MariaDB",
    "SQLite",
    "Oracle",
    "Redis",
    "Cassandra",
    "DynamoDB",
    "CouchDB",
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "IBM Cloud",
    "Heroku",
    "Firebase",
    "DigitalOcean",
    "Linode",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Terraform",
    "Ansible",
    "Chef",
    "MERN",
    "Puppet",
    "CircleCI",
    "REST API",
    "GraphQL",
    "gRPC",
    "SOAP",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Computer Vision",
    "NLP",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Hadoop",
    "Spark",
    "Kafka",
    "Android Development",
    "iOS Development",
    "React Native",
    "Flutter",
    "Xamarin",
    "SwiftUI",
    "JUnit",
    "Selenium",
    "Cypress",
    "Mocha",
    "Chai",
    "Jest",
    "Enzyme",
    "Postman",
    "UI/UX Design",
    "Adobe XD",
    "Figma",
    "Sketch",
    "InVision",
    "Zeplin",
    "Agile",
    "Scrum",
    "Kanban",
    "JIRA",
    "Trello",
    "Asana",
    "Monday.com",
    "Ethical Hacking",
    "Penetration Testing",
    "OWASP",
    "Burp Suite",
    "Wireshark",
    "Metasploit",
    "Security+",
    "Blockchain",
    "Web3",
    "Solidity",
    "Smart Contracts",
    "Unity",
    "Game Development",
    "AR/VR Development",
    "IoT Development",
    "RPA",
  ].sort();

  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [searchSkill, setSearchSkill] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: [], // Skills will be stored as an array
    experience: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register-talent",
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          skills: formData.skills,
          experience: formData.experience,
          description: formData.description,
          User: "userId", 
        }
      );
      setTimeout(() => navigate("/talent-page"), 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle skill selection
  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, skill],
      }));
    }
    setSearchSkill("");
    setShowSkillsDropdown(false);
  };

  // Function to handle skill removal
  const handleSkillRemove = (skill) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((s) => s !== skill),
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-b ss4 from-purple-50 to-white">
      <div className="h-full flex flex-col">
        <header className="bg-gradient-to-b from-purple-50 to-purple-50/95 backdrop-blur-sm z-50 py-6 px-6">
          <Link
            to="/talent-page"
            className="inline-flex items-center text-purple-900 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Go to Talent Page
          </Link>
        </header>

        <div className="flex-1 px-4 py-0">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-3 pb-10">
              <h1 className="text-2xl font-bold text-purple-900">
                Join Our Global Talent Network
              </h1>
              <p className="text-gray-600 text-sm">
                Connect with opportunities that match your expertise
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <h2 className="text-lg font-bold text-purple-900 mb-3">
                Personal Information
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="col-span-2 md:col-span-1 space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter last name"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Skills Selection */}
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Skills
                  </label>
                  <div className="relative">
                    <div
                      className="min-h-8 w-full p-1.5 border border-gray-300 rounded-lg cursor-text"
                      onClick={() => setShowSkillsDropdown(true)}
                    >
                      <input
                        type="text"
                        value={searchSkill}
                        onChange={(e) => {
                          setSearchSkill(e.target.value);
                          setShowSkillsDropdown(true);
                        }}
                        className="w-full focus:outline-none text-sm"
                        placeholder="Search and select skills..."
                      />
                    </div>
                    {showSkillsDropdown && (
                      <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto">
                        {availableSkills
                          .filter((skill) =>
                            skill
                              .toLowerCase()
                              .includes(searchSkill.toLowerCase())
                          )
                          .map((skill, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-sm"
                              onClick={() => handleSkillSelect(skill)}
                            >
                              {skill}
                            </li>
                          ))}
                        {availableSkills.filter((skill) =>
                          skill
                            .toLowerCase()
                            .includes(searchSkill.toLowerCase())
                        ).length === 0 && (
                          <li className="px-4 py-2 text-gray-500 text-sm">
                            No skills found
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-900 text-xs px-2 py-1 rounded-full flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-1 text-xs text-gray-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Experience Level
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: e.target.value,
                      })
                    }
                    className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter experience level"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="col-span-2 mt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-white bg-purple-600 rounded-full w-full hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterTalent;
