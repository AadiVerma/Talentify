import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Bell, Users, Briefcase, Building2, TrendingUp } from "lucide-react";

const hiringTrends = [
  { month: "Jan", requests: 65, hires: 45 },
  { month: "Feb", requests: 85, hires: 55 },
  { month: "Mar", requests: 95, hires: 70 },
  { month: "Apr", requests: 75, hires: 50 },
  { month: "May", requests: 90, hires: 65 },
  { month: "Jun", requests: 100, hires: 80 },
];

const roleData = [
  { role: "Software Engineer", count: 45 },
  { role: "Product Manager", count: 30 },
  { role: "Data Scientist", count: 25 },
  { role: "UX Designer", count: 20 },
  { role: "Sales Rep", count: 15 },
];

const requestStatus = [
  { name: "Pending", value: 30, color: "#ffd700" },
  { name: "In Progress", value: 45, color: "#0088FE" },
  { name: "Completed", value: 25, color: "#00C49F" },
];

const hiringRequests = [
  {
    id: 1,
    role: "Software Engineer",
    organization: "TechCorp",
    status: "Pending",
    date: "2025-01-15",
  },
  {
    id: 2,
    role: "Product Manager",
    organization: "StartupX",
    status: "In Progress",
    date: "2025-01-18",
  },
  {
    id: 3,
    role: "Data Scientist",
    organization: "DataCo",
    status: "Completed",
    date: "2025-01-10",
  },
];

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRequests =
    selectedStatus === "all"
      ? hiringRequests
      : hiringRequests.filter((req) => req.status === selectedStatus);

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
          value="140"
          trend="+12.5%"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-green-500" />}
          title="Total Approved"
          value="95"
          trend="+8.2%"
        />
      
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
       

        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
          <BarChart width={500} height={300} data={roleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#a855f7" />
          </BarChart>
        </div>

        {/* Request Status */}
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
