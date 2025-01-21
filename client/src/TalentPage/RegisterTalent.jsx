import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Sparkles, Code, Briefcase } from "lucide-react";

function RegisterTalent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    description: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only JPG, JPEG or PNG files");
        return;
      }

      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadStatus("Uploading...");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("description", formData.description);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/talent",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Upload successful:", response.data);
      setUploadStatus("Upload successful!");
      setTimeout(() => {
        navigate("/talent-page");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Sticky Header Container */}
      <div className="sticky top-0 bg-gradient-to-b from-purple-50 to-purple-50/95 backdrop-blur-sm z-50 pb-2">
        {/* Back Navigation */}
        <Link
          to="/talent-page"
          className="absolute top-8 left-8 inline-flex items-center text-purple-900 hover:text-purple-800 transition-colors duration-300"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Talent Page
        </Link>

        {/* Header Section */}
        <div className="text-center pt-8 pb-6 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Join Our Talent Pool
          </h1>
        </div>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto text-center px-4">
        Connect with amazing opportunities and showcase your skills to top
        companies worldwide.
      </p>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
            <Sparkles className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Showcase Talent
            </h3>
            <p className="text-gray-600 text-sm">
              Highlight your unique skills and experience to stand out
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
            <Code className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Share Expertise
            </h3>
            <p className="text-gray-600 text-sm">
              List your technical skills and professional achievements
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
            <Briefcase className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Find Opportunities
            </h3>
            <p className="text-gray-600 text-sm">
              Get matched with projects that fit your expertise
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4 group">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center overflow-hidden bg-purple-50 group-hover:border-purple-500 transition-colors">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-purple-400 group-hover:text-purple-500 transition-colors" />
                        <span className="mt-2 block text-xs text-purple-400 group-hover:text-purple-500 transition-colors">
                          Upload photo
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {uploadStatus && (
                  <p
                    className={`text-sm ${
                      uploadStatus.includes("failed")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Skills Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                  placeholder="e.g., React, UI/UX, Python"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Brief Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                placeholder="Tell us about your experience and what you're looking for..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full bg-purple-900 text-white py-4 px-6 rounded-lg transition-all duration-300 font-medium
                ${
                  isUploading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-800 hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
            >
              {isUploading ? "Uploading..." : "Submit Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterTalent;
