import React, { useState } from 'react';
import { Calendar, Users, BookOpen, MapPin, Bell, Mail, Menu, X, Home, CheckCircle2, Send, MessageSquare, Building2, BarChart3, FileCheck, AlertTriangle } from 'lucide-react';

function DirecteurDashboard() {
  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'cs', name: 'Computer Science', status: 'validated' },
    { id: 'eng', name: 'Engineering', status: 'pending' },
    { id: 'bus', name: 'Business', status: 'validated' },
    { id: 'sci', name: 'Sciences', status: 'pending' },
  ];

  const overviewStats = [
    { title: 'Departments Validated', count: '3/5', color: 'bg-green-500' },
    { title: 'Pending Reviews', count: '2', color: 'bg-yellow-500' },
    { title: 'Schedule Conflicts', count: '0', color: 'bg-blue-500' },
    { title: 'Requires Action', count: '1', color: 'bg-red-500' },
  ];

  const departmentValidations = [
    {
      id: 1,
      department: 'Computer Science',
      status: 'Validated',
      examCount: 12,
      lastUpdate: '2024-03-20',
      conflicts: 0,
    },
    {
      id: 2,
      department: 'Engineering',
      status: 'Pending',
      examCount: 15,
      lastUpdate: '2024-03-21',
      conflicts: 1,
    },
  ];

  const sidebarItems = [
    { icon: Home, label: 'Overview', active: true },
    { icon: Building2, label: 'Departments' },
    { icon: FileCheck, label: 'Validations' },
    { icon: Calendar, label: 'Global Schedule' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: MessageSquare, label: 'Communications' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Engineering Schedule Ready',
      message: 'Engineering department schedule awaiting final validation',
      time: '5 minutes ago',
      type: 'validation',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Schedule Conflict Resolved',
      message: 'Room conflict in Science department resolved',
      time: '1 hour ago',
      type: 'update',
    },
    {
      id: 3,
      title: 'Final Schedule Published',
      message: 'Computer Science department schedule published',
      time: '2 hours ago',
      type: 'success',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Director of Studies</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="px-4 py-3 border-b border-gray-200 bg-purple-50">
          <p className="text-sm text-gray-600">Institution</p>
          <p className="font-semibold text-purple-700">University of Technology</p>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                    item.active ? 'bg-purple-50 text-purple-700' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md lg:hidden hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900 ml-4">Global Overview</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowNotification(!showNotification)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    2
                  </span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Mail className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {overviewStats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.color} rounded-lg shadow-lg p-6 text-white transform transition-transform hover:scale-105`}
                >
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-2">{stat.count}</p>
                </div>
              ))}
            </div>

            {/* Department Overview */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Department Validations</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Publish All Validated
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {departmentValidations.map((dept) => (
                    <div key={dept.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              dept.status === 'Validated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {dept.status}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">Last updated: {dept.lastUpdate}</span>
                          </div>
                          <h3 className="mt-2 text-lg font-semibold text-gray-900">{dept.department}</h3>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                            <span>{dept.examCount} Exams</span>
                            <span>{dept.conflicts} Conflicts</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                            Review
                          </button>
                          {dept.status === 'Pending' && (
                            <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                              Validate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Communication Center */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Communication Center</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            {notification.priority === 'high' && (
                              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                High Priority
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                        <div className="mt-2 flex space-x-2">
                          <button className="text-sm text-purple-600 hover:text-purple-800">
                            Respond
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-800">
                            Mark as Read
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Notification Panel */}
      {showNotification && (
        <div className="fixed right-0 top-20 w-80 bg-white shadow-lg rounded-l-lg p-4 transform transition-transform">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    {notification.priority === 'high' && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DirecteurDashboard;