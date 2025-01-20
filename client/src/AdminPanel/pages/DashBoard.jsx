import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Bell, Users, Briefcase, Building2, TrendingUp } from 'lucide-react';

const hiringTrends = [
  { month: 'Jan', requests: 65, hires: 45 },
  { month: 'Feb', requests: 85, hires: 55 },
  { month: 'Mar', requests: 95, hires: 70 },
  { month: 'Apr', requests: 75, hires: 50 },
  { month: 'May', requests: 90, hires: 65 },
  { month: 'Jun', requests: 100, hires: 80 },
];

const roleData = [
  { role: 'Software Engineer', count: 45 },
  { role: 'Product Manager', count: 30 },
  { role: 'Data Scientist', count: 25 },
  { role: 'UX Designer', count: 20 },
  { role: 'Sales Rep', count: 15 },
];

const requestStatus = [
  { name: 'Pending', value: 30, color: '#ffd700' },
  { name: 'In Progress', value: 45, color: '#0088FE' },
  { name: 'Completed', value: 25, color: '#00C49F' },
];

const hiringRequests = [
  { id: 1, role: 'Software Engineer', organization: 'TechCorp', status: 'Pending', date: '2025-01-15' },
  { id: 2, role: 'Product Manager', organization: 'StartupX', status: 'In Progress', date: '2025-01-18' },
  { id: 3, role: 'Data Scientist', organization: 'DataCo', status: 'Completed', date: '2025-01-10' },
];

const Dashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredRequests = selectedStatus === 'all' 
    ? hiringRequests 
    : hiringRequests.filter(req => req.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800">Talentify Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Briefcase className="w-8 h-8 text-blue-500" />}
          title="Total Requests"
          value="140"
          trend="+12.5%"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-green-500" />}
          title="Employees Hired"
          value="95"
          trend="+8.2%"
        />
        <StatCard
          icon={<Building2 className="w-8 h-8 text-purple-500" />}
          title="Active Organizations"
          value="28"
          trend="+5.3%"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-orange-500" />}
          title="Revenue"
          value="$125,000"
          trend="+15.8%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Hiring Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hiring Trends</h2>
          <LineChart width={500} height={300} data={hiringTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="requests" stroke="#7e22ce" name="Requests" />
            <Line type="monotone" dataKey="hires" stroke="#82ca9d" name="Hires" />
          </LineChart>
        </div>

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

        {/* Recent Hiring Requests */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Hiring Requests</h2>
            <select
              className="border rounded-md p-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.organization}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      {icon}
      <span className={`text-sm font-semibold ${
        trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;