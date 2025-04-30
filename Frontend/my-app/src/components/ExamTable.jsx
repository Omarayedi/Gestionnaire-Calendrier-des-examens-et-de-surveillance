import React, { useState, useMemo, useEffect } from 'react';
import { 
  Copy, Edit, Trash2, Search, Filter, XCircle, FilePlus, 
  TrendingUp, Calendar, Clock, BookOpen, ChevronDown, ChevronUp,
  Bookmark, Award, MoreHorizontal, RefreshCcw, ArrowUpDown, Info
} from 'lucide-react';
import axios from 'axios';
import "../styles/popup.css";


export function ExamTable({ exams, onEdit, onDuplicate, onDelete, onCreateNew }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    subject: true,
    department: true,
    date: true,
    time: true,
    coefficient: true,
    status: true,
    actions: true
  });
  // Status configuration with colors and icons
  const statusConfig = {
    draft: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-800', 
      border: 'border-amber-200', 
      icon: <RefreshCcw className="h-3 w-3 mr-1" />,
      description: "Exam is in draft state and not yet published to students"
    },
    published: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-800', 
      border: 'border-emerald-200',
      icon: <Bookmark className="h-3 w-3 mr-1" />,
      description: "Exam is published and visible to students"
    },
    completed: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      border: 'border-blue-200',
      icon: <Award className="h-3 w-3 mr-1" />,
      description: "Exam has been completed and graded"
    }
  };
  // Filtered and sorted exams with memoization for performance
  const filteredExams = useMemo(() => {
    return exams
      .filter(exam => {
        const matchesSearch = 
          exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exam.department && exam.department.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        // Special handling for date values
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return (dateA - dateB) * (sortConfig.direction === 'asc' ? 1 : -1);
        }
        
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';
        return (aValue < bValue ? -1 : 1) * (sortConfig.direction === 'asc' ? 1 : -1);
      });
  }, [exams, searchQuery, statusFilter, sortConfig]);

  // Auto-collapse filter section when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterElement = document.getElementById('filter-section');
      if (isFilterExpanded && filterElement && !filterElement.contains(event.target) && 
          !event.target.closest('button')?.getAttribute('data-filter-toggle')) {
        setIsFilterExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterExpanded]);

  // Check if a date is upcoming (within the next 7 days)
  const isUpcoming = (dateString) => {
    const examDate = new Date(dateString);
    const now = new Date();
    const differenceInDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
    return differenceInDays >= 0 && differenceInDays <= 7;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const formatTime = (timeString) => timeString || 'N/A';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const handleDeleteExam = (examId) => {
    setExamToDelete(examId);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (examToDelete !== null) {
      removeExam(examToDelete);
      setShowPopup(false);
      setExamToDelete(null);
    }
  };
  // Get counts for status badges
  const getStatusCounts = useMemo(() => {
    return exams.reduce((acc, exam) => {
      acc[exam.status] = (acc[exam.status] || 0) + 1;
      return acc;
    }, {});
  }, [exams]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all">
      {/* Header and Controls */}
      <div className="p-4 border-b  bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-wrap  justify-between items-center gap-3 mb-3">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" /> 
            Exam Schedule
          </h2>

          <div className="flex  items-center gap-2">
            <div className="hidden  sm:flex items-center space-x-2">
              {Object.entries(statusConfig).map(([status, config]) => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(prev => prev === status ? 'all' : status)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center ${
                    statusFilter === status 
                      ? `${config.bg} ${config.text} ring-2 ring-offset-2 ${config.text.replace('text', 'ring')}`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {config.icon}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <span className="ml-1.5 px-1.5 py-0.5 bg-white bg-opacity-50 rounded-full text-xs">
                    {getStatusCounts[status] || 0}
                  </span>
                </button>
              ))}
            </div>
            
            <button
              onClick={onCreateNew}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-blue-950 bg-opacity-30 transition-all duration-300 group-hover:w-full"></span>
              <FilePlus className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">New Exam</span>
            </button>
          </div>
        </div>

        {/* Search and filter container */}
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          {/* Search bar - always visible */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by subject or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Filter toggle button */}
          <button
            data-filter-toggle="true"
            onClick={toggleFilters}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
            {isFilterExpanded ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>

        {/* Expanded filters */}
        {isFilterExpanded && (
          <div id="filter-section" className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in duration-150 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 hover:text-indigo-600 flex items-center"
              >
                <XCircle className="h-3.5 w-3.5 mr-1" />
                Reset all filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Column Visibility</label>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(visibleColumns).map(([column, isVisible]) => (
                    column !== 'subject' && (
                      <button
                        key={column}
                        onClick={() => toggleColumnVisibility(column)}
                        className={`px-2 py-1 text-xs rounded-md transition-colors ${
                          isVisible 
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                            : 'bg-gray-200 text-gray-500 border border-gray-300'
                        }`}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </button>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exam Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {[
                { label: 'Subject', key: 'subject', visible: visibleColumns.subject },
                { label: 'Department', key: 'department', visible: visibleColumns.department },
                { label: 'Date', key: 'date', visible: visibleColumns.date },
                { label: 'Time/Duration', key: 'start_time', visible: visibleColumns.time },
                { label: 'Coefficient', key: 'coefficient', visible: visibleColumns.coefficient },
                { label: 'Status', key: 'status', visible: visibleColumns.status },
                { label: 'Actions', key: null, visible: visibleColumns.actions }
              ].filter(column => column.visible).map((column) => (
                <th
                  key={column.label}
                  onClick={() => column.key && handleSort(column.key)}
                  className={`px-6 py-3.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider ${
                    column.key ? 'cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 transition-colors' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.key && (
                      <button className="ml-1 focus:outline-none" aria-label={`Sort by ${column.label}`}>
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp className="h-4 w-4 text-indigo-600" /> : 
                            <ChevronDown className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <tr 
                  key={exam.id} 
                  className={`hover:bg-indigo-50/30 transition-all ${activeRow === exam.id ? 'bg-indigo-50' : ''}`}
                  onMouseEnter={() => setActiveRow(exam.id)}
                  onMouseLeave={() => setActiveRow(null)}
                >
                  {visibleColumns.subject && (
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 flex items-center">
                        {exam.subject}
                      </div>
                      {exam.difficulty && (
                        <div className="text-xs mt-1 text-gray-500 flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-amber-500" /> 
                          <span>Difficulty: {exam.difficulty}</span>
                        </div>
                      )}
                    </td>
                  )}
                  {visibleColumns.department && (
                    <td className="px-6 py-4 text-gray-700">{exam.department || 'N/A'}</td>
                  )}
                  {visibleColumns.date && (
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-indigo-500 mr-1.5" />
                        {formatDate(exam.date)}
                      </div>
                    </td>
                  )}
                  {visibleColumns.time && (
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-indigo-500 mr-1.5" />
                        {formatTime(exam.start_time)} - {exam.duration} mins
                      </div>
                    </td>
                  )}
                  {visibleColumns.coefficient && (
                    <td className="px-6 py-4 font-medium">{exam.coefficient}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-6 py-4">
                      <div className="relative group">
                        <span className={`px-2.5 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${
                          statusConfig[exam.status]?.bg || 'bg-gray-100'} ${
                          statusConfig[exam.status]?.text || 'text-gray-800'} ${
                          statusConfig[exam.status]?.border || 'border-gray-200'}`}>
                          {statusConfig[exam.status]?.icon}
                          {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                        </span>
                        <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 z-20 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                          {statusConfig[exam.status]?.description}
                          <div className="absolute left-4 bottom-0 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-6 py-4">
                      <div className={`flex ${activeRow === exam.id ? 'opacity-100' : 'opacity-30'} transition-opacity`}>
                        <button 
                          onClick={() => onEdit(exam)} 
                          className="p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-md transition-colors" 
                          title="Edit"
                        >
                          <Edit className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          onClick={() => onDuplicate(exam)} 
                          className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors" 
                          title="Duplicate"
                        >
                          <Copy className="h-4.5 w-4.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteExam(exam.id)} 
                          className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-md transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Search className="h-12 w-12 text-gray-300" />
                    <p className="text-lg font-medium text-gray-600">No exams found</p>
                    <p className="text-sm text-gray-500 max-w-md">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filter settings.'
                        : 'Get started by creating your first exam.'}
                    </p>
                    {!searchQuery && statusFilter === 'all' && (
                      <button
                        onClick={onCreateNew}
                        className="mt-3 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <FilePlus className="h-4 w-4 mr-2" />
                        Create New Exam
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

      {/* Footer */}
      {filteredExams.length > 0 && (
        <div className="bg-gray-50 px-6 py-3 border-t text-sm text-gray-600 flex flex-wrap items-center justify-between">
          <span>
            Showing <span className="font-medium">{filteredExams.length}</span> of <span className="font-medium">{exams.length}</span> exams
          </span>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {statusFilter !== 'all' && (
              <span className="flex items-center">
                <Filter className="h-3.5 w-3.5 mr-1 text-gray-400" />
                Filtered by: <span className="font-medium capitalize ml-1">{statusFilter}</span>
              </span>
            )}
            <button
              onClick={clearFilters}
              className={`flex items-center transition-opacity ${
                searchQuery || statusFilter !== 'all' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <XCircle className="h-3.5 w-3.5 mr-1" />
              Clear filters
            </button>
          </div>
        </div>
      )}
            {showPopup && (
      <div className="backdrop fixed inset-0 flex items-center justify-center">
        <div className="group select-none w-[300px] flex flex-col p-6 bg-gray-800 border border-gray-800 shadow-lg rounded-2xl text-center relative z-50">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="group-hover:animate-bounce w-12 h-12 text-red-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            ></path>
          </svg>
          <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
          <p className="text-sm text-gray-400 px-2">
            Do you really want to delete this exam? This action cannot be undone.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => setShowPopup(false)}
              className="px-5 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-full hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(examToDelete);
                setShowPopup(false);
                setExamToDelete(null);
              }}
              className="px-5 py-2 bg-red-500 text-white border border-red-500 rounded-full hover:bg-transparent hover:text-red-500 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
) }   
    </div>
    
  );
}