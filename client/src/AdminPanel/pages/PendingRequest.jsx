
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ClientRequestCard = ({ request, onAccept, onReject, onClick, isActive }) => (
  <div
    onClick={onClick}
    className={`bg-white p-6 rounded-lg border border-purple-100 relative
      hover:shadow-lg hover:shadow-purple-200 transition-all duration-300
      cursor-pointer transform
      ${isActive ? 'border-purple-500 shadow-lg scale-105' : ''}`}
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-xl font-bold overflow-hidden">
        {request.profilepic ? (
          <img
            src={request.profilepic}
            alt={`${request.firstname}'s profile`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          request.firstname[0]
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-purple-800">
              {request.firstname} {request.lastname}
            </h2>
            <p className="text-purple-500 font-medium text-sm">{request.email}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            request.approve ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {request.approve ? 'Approved' : 'Pending'}
          </span>
        </div>
      </div>
    </div>

    <p className="text-gray-600 text-sm leading-relaxed mb-4">
      {request.description}
    </p>

    <div className="flex gap-4 mt-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAccept(request._id);
        }}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
      >
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Accept</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReject(request._id);
        }}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
      >
        <XCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Reject</span>
      </button>
    </div>
  </div>
);



const DetailPanel = ({ request, onClose }) => (
  <div className="h-full overflow-y-auto p-6 bg-white border-l border-purple-100">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-xl font-bold mr-4">
          {request.firstname[0]}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-purple-700">
            {request.firstname} {request.lastname}
          </h2>
          <p className="text-purple-500 font-medium">{request.email}</p>
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
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Experience</h3>
        <p className="text-gray-600">{request.experience} years</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Description</h3>
        <p className="text-gray-600">{request.description}</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-purple-700 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {request.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  </div>
);
function isAdmin() {
  const token = localStorage.getItem("jwt");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "admin";
  } catch (error) {
    console.error("Invalid JWT:", error.message);
    return false;
  }
}
const ClientRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAdmin()){
      navigate('/');
    }
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/get-non-talents");
        const data = await response.json();
        console.log(data.talents)
        
        if (data.talents && Array.isArray(data.talents)) {
          setRequests(data.talents);
        } else if (Array.isArray(data)) {
          setRequests(data);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      console.log("id",id)
      await axios.post('http://localhost:5000/api/v1/update-talent', {
        approve: true,
        id: id
      });
      
  
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, approve: true } : req))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/v1/update-reject-talent/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approve: false }),
      });
      
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, approve: false } : req))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Client Requests</h1>
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          Error loading requests: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex transition-all duration-300">
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
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No pending requests found
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <ClientRequestCard
                key={request._id}
                request={request}
                onAccept={handleAccept}
                onReject={handleReject}
                onClick={() => setSelectedRequest(request)}
                isActive={selectedRequest?._id === request._id}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className={`fixed lg:static top-0 right-0 h-screen bg-white w-full lg:w-1/3
          transform transition-transform duration-300 ease-in-out
          ${selectedRequest ? 'translate-x-0' : 'translate-x-full lg:hidden'}`}
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