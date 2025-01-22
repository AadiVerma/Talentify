import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Bell, Users, Briefcase, Building2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const roleData = [
  { role: "Software Engineer", count: 45 },
  { role: "Product Manager", count: 30 },
  { role: "Data Scientist", count: 25 },
  { role: "UX Designer", count: 20 },
  { role: "Sales Rep", count: 15 },
];

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
const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [pendingdata,SetPendingData]=useState('');
  const [approveddata,SetApprovedData]=useState('');
  const[skilldata,SetSkillData]=useState([]);
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAdmin()){
      navigate('/');
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/status-counts`);
        const data=response.data;
        SetPendingData(data.totalPending);
        SetApprovedData(data.totalHired);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
  
    const skillData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/skill-data`);
        const data=response.data.data;
        SetSkillData(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
    skillData();
  }, []);
  
const requestStatus = [
  { name: "Pending", value: pendingdata, color: "#800080" },
  { name: "In Progress", value: 5, color: "#D8BFD8" },
  { name: "Completed", value: approveddata, color: "#4B0082" },
];


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800">
          Talentify Admin Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Briefcase className="w-8 h-8 text-blue-500" />}
          title="Total Job Requests"
          value={pendingdata}
          trend="+12.5%"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-green-500" />}
          title="Total Approved"
          value={approveddata}
          trend="+8.2%"
        />
      
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
       

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
          <BarChart width={500} height={300} data={skilldata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#a855f7" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Request Status</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={requestStatus}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {requestStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

      
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      {icon}
      <span
        className={`text-sm font-semibold ${
          trend.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;
