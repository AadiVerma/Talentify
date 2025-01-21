import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

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
    photo: null,
    photoPreview: null,
    skills: [],
    experience: "",
    description: "",
    approve: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
      setError(""); // Clear any previous errors
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.skills.length) return "Please select at least one skill";
    if (!formData.experience) return "Experience is required";
    if (!formData.description.trim()) return "Description is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstname", formData.firstName.trim());
      formDataToSend.append("lastname", formData.lastName.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      formDataToSend.append("experience", Number(formData.experience));
      formDataToSend.append("description", formData.description.trim());

      if (formData.photo) {
        formDataToSend.append("profilephoto", formData.photo);
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/register-talent",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500; // Handle HTTP errors properly
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        // Success case
        setTimeout(() => navigate("/talent-page"), 500);
      } else {
        // Handle other status codes
        setTimeout(() => navigate("/talent-page"), 500);
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Error submitting form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleSkillRemove = (skill) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((s) => s !== skill),
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-b ss4 from-purple-50 to-white">
      <div className="h-full flex flex-col">
        <header className="bg-gradient-to-b from-purple-50 to-purple-50/95 backdrop-blur-sm z-50 py-3 px-6">
          <Link
            to="/talent-page"
            className="inline-flex items-center text-purple-900 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Go to Talent Page
          </Link>
        </header>

        <div className="flex-1 px-4">
          <div className="max-w-3xl mx-auto h-full">
            <div className="text-center mb-2">
              <h1 className="text-xl font-bold text-purple-900">
                Join Our Global Talent Network
              </h1>
              <p className="text-gray-600 text-xs">
                Connect with opportunities that match your expertise
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <h2 className="text-base font-bold text-purple-900 mb-2">
                Personal Information
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
                {/* First Name and Last Name */}
                <div className="col-span-1 space-y-0.5">
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
                    className="w-full p-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div className="col-span-1 space-y-0.5">
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
                    className="w-full p-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter last name"
                  />
                </div>

                {/* Email and Photo Upload */}
                <div className="col-span-1 space-y-0.5">
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
                    className="w-full p-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="col-span-1 space-y-0.5">
                  <label className="text-xs font-medium text-gray-700">
                    Profile Photo
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      {formData.photoPreview ? (
                        <img
                          src={formData.photoPreview}
                          alt="Profile preview"
                          className="h-8 w-8 rounded-full object-cover border border-purple-200"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center border border-purple-200">
                          <Upload className="h-4 w-4 text-purple-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer inline-flex items-center px-2 py-1 text-xs text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        {formData.photo ? "Change" : "Upload"}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Skills Selection */}
                <div className="col-span-2 space-y-0.5">
                  <label className="text-xs font-medium text-gray-700">
                    Skills
                  </label>
                  <div className="relative">
                    <div
                      className="min-h-7 w-full p-1 border border-gray-300 rounded-lg cursor-text"
                      onClick={() => setShowSkillsDropdown(true)}
                    >
                      <input
                        type="text"
                        value={searchSkill}
                        onChange={(e) => {
                          setSearchSkill(e.target.value);
                          setShowSkillsDropdown(true);
                        }}
                        className="w-full focus:outline-none text-xs"
                        placeholder="Search and select skills..."
                      />
                    </div>
                    {showSkillsDropdown && (
                      <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full max-h-32 overflow-y-auto text-xs">
                        {availableSkills
                          .filter((skill) =>
                            skill
                              .toLowerCase()
                              .includes(searchSkill.toLowerCase())
                          )
                          .map((skill, index) => (
                            <li
                              key={index}
                              className="px-2 py-1 hover:bg-purple-100 cursor-pointer"
                              onClick={() => handleSkillSelect(skill)}
                            >
                              {skill}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-900 text-xs px-2 py-0.5 rounded-full flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-1 text-xs text-gray-600 hover:text-gray-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Experience and Description */}
                <div className="col-span-1 space-y-0.5">
                  <label className="text-xs font-medium text-gray-700">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: e.target.value,
                      })
                    }
                    className="w-full p-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500"
                    placeholder="Years of experience"
                  />
                </div>

                <div className="col-span-2 space-y-0.5">
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
                    className="w-full p-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 min-h-[60px] text-sm"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 text-white bg-purple-600 rounded-full w-full hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
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
