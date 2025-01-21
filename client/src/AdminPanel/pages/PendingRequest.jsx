
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const fetchClientRequests = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      description: "Looking for an experienced React developer with 5+ years of experience in building scalable applications.",
      avatar: "/api/placeholder/80/80",
      location: "San Francisco, CA",
      budget: "$120k - $150k",
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      requirements: [
        "Strong proficiency in React.js and TypeScript",
        "Experience with state management (Redux/Context)",
        "Knowledge of modern frontend tools and practices"
      ],
      deadline: "2025-02-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      description: "Seeking a product manager with experience in B2B SaaS products and agile methodologies.",
      avatar: "/api/placeholder/80/80",
      location: "New York, NY",
      budget: "$130k - $160k",
      experience: "4+ years",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
      requirements: [
        "Experience in B2B SaaS product management",
        "Strong analytical and communication skills",
        "Track record of successful product launches"
      ],
      deadline: "2025-02-20"
    },
    {
      id: 3,
      name: "Emily Brown",
      role: "UX Designer",
      description: "Looking for a creative UX designer with expertise in user research and prototyping tools.",
      avatar: "/api/placeholder/80/80",
      location: "Austin, TX",
      budget: "$90k - $120k",
      experience: "3+ years",
      skills: ["Figma", "User Research", "Prototyping", "UI Design"],
      requirements: [
        "Proficiency in Figma and other design tools",
        "Experience in user research and testing",
        "Strong portfolio of web/mobile designs",
       
      ],
      deadline: "2025-02-25"
    }
  ];
};
const ClientRequestCard = ({ request, onClick, isActive }) => (
  <div
    onClick={onClick}
    className={`
      bg-white p-6 rounded-lg border border-purple-100
      hover:shadow-lg hover:shadow-purple-200 transition-all duration-300
      cursor-pointer transform
      ${isActive ? "border-purple-500 shadow-lg scale-105" : ""}
    `}
  >
    <div className="flex items-start gap-4 mb-4">
      {/* Avatar */}
      <img
        src={request.avatar}
        alt={request.name}
        className="w-16 h-16 rounded-full border-4 border-purple-300 shadow-md"
      />
      {/* Name and Role */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-purple-800">{request.name}</h2>
        <p className="text-purple-500 font-medium text-sm">{request.role}</p>
      </div>
    </div>
    {/* Description */}
    <p className="text-gray-600 text-sm leading-relaxed">
      {request.description}
    </p>
  </div>
);

const DetailPanel = ({ request, onClose }) => (
  <div className="h-full overflow-y-auto p-6 bg-white border-l border-purple-100">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center">
        <img
          src={request.avatar}
          alt={request.name}
          className="w-16 h-16 rounded-full border-2 border-purple-200 mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-purple-700">{request.name}</h2>
          <p className="text-purple-500 font-medium">{request.role}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-purple-50 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-purple-700" />
      </button>
    </div>

    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Location</h3>
        <p className="text-gray-600">{request.location}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Budget Range</h3>
        <p className="text-gray-600">{request.budget}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Required Experience</h3>
        <p className="text-gray-600">{request.experience}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {request.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Requirements</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {request.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Application Deadline</h3>
        <p className="text-gray-600">{request.deadline}</p>
      </section>
    </div>
  </div>
);

const ClientRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchClientRequests();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching client requests:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
      <div className="flex  transition-all duration-300">
        {/* Main content */}
        <div className={`flex-1 p-6 ${selectedRequest ? 'lg:w-2/3' : 'w-full'}`}>
          <h1 className="text-3xl font-bold text-purple-700 mb-8">Client Requests</h1>
          
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="h-48 bg-purple-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => (
                <ClientRequestCard
                  key={request.id}
                  request={request}
                  onClick={() => setSelectedRequest(request)}
                  isActive={selectedRequest?.id === request.id}
                />
              ))}
            </div>
          )}
        </div>

       
        <div
          className={`fixed lg:static top-0 right-0 h-screen bg-white w-full lg:w-1/3
            transform transition-transform duration-300 ease-in-out
            ${selectedRequest ? 'translate-x-0' : 'translate-x-full lg:hidden'}
          `}
        >
          {selectedRequest && (
            <DetailPanel
              request={selectedRequest}
              onClose={() => setSelectedRequest(null)}
            />
          )}
        </div>
      </div>
  );
};

export default ClientRequestsPage;