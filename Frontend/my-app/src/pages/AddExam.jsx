import React, { useState, useEffect } from 'react';
import { Plus, GraduationCap, Calendar, AlertCircle, X, Bookmark, BookOpen, Check, Sidebar } from 'lucide-react';
import { ExamTable } from '../components/ExamTable';
import { ExamForm } from '../components/ExamForm';
import axios from "axios";


function AddExam() {
  const [exams, setExams] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(undefined);
  const [notification, setNotification] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    published: 0,
    completed: 0
  });
  
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Retrieve token
  
        if (!token) {
          console.error("No token found in localStorage");
          return; // Stop execution if token is missing
        }
    
        const response = await axios.get("http://localhost:8000/api/exams", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Pass token in headers
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
    
        if (Array.isArray(response.data)) {
          // ✅ Add `duration` (in minutes) & `status: "DRAFT"` to each exam
          const examsWithExtraFields = response.data.map(exam => ({
            ...exam,
            id: exam.examId,
            duration: calculateDuration(exam.startTime,exam.endTime), // Convert ms to minutes
            status: "draft", // Default status
            department:exam.departmentName,
            date:exam.examDate,
            start_time: removeSeconds(exam.startTime),
          }));

          setExams(examsWithExtraFields);
          } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch exams:", error.response ? error.response.data : error);
      }
    };

    fetchExams();
  }, []);

  const removeExam = async (examId) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Retrieve token
  
      if (!token) {
        console.error("No token found in localStorage");
        return; // Stop execution if token is missing
      }
  
      const response = await axios.delete(`http://localhost:8000/api/exams/${examId}`, { // ✅ Fixed URL
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Pass token in headers
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error deleting exam:", error.response ? error.response.data : error);
    }
    setExams(prev => prev.filter(exam => exam.id !== examId));
    showNotification('Exam deleted successfully!', 'warning');
  };
  


  const removeSeconds = (time) => time ? time.slice(0, 5) : ""; 
  // Update stats when exams change
  useEffect(() => {
    const newStats = {
      total: exams.length,
      draft: exams.filter(exam => exam.status === 'draft').length,
      published: exams.filter(exam => exam.status === 'published').length,
      completed: exams.filter(exam => exam.status === 'completed').length
    };
    setStats(newStats);
  }, [exams]);

  // Show notification and auto-dismiss after 3 seconds
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
  const handleAddExam = (examData) => {
    const newExam = {
      ...examData,
      id: crypto.randomUUID()
    };
    setExams(prev => [...prev, newExam]);
    setIsFormOpen(false);
    showNotification('Exam added successfully!');
  };

// Function to calculate duration
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 0; // Return 0 if either time is missing

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  const diffMinutes = Math.floor((end - start) / (1000 * 60)); // Convert ms to minutes

  return diffMinutes >= 0 ? diffMinutes : 0; // Ensure non-negative duration
};

  const handleEditExam = (examData) => {
    if (!editingExam) return;
    setExams(prev =>
      prev.map(exam =>
        exam.id === editingExam.id ? { ...examData, id: exam.id } : exam
      )
    );
    setEditingExam(undefined);
    setIsFormOpen(false);
    showNotification('Exam updated successfully!');
  };

  const handleDuplicateExam = (exam) => {
    const duplicatedExam = {
      ...exam,
      id: crypto.randomUUID(),
      subject: `${exam.subject} (Copy)`,
      status: 'draft'
    };
    setExams(prev => [...prev, duplicatedExam]);
    showNotification('Exam duplicated successfully!');
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      removeExam(examId);
    }
  };

  // Add drag and drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Process dropped file (e.g., CSV or Excel import)
    const file = e.dataTransfer.files[0];
    if (file) {
      // Simulate file processing (in a real app, you'd parse the file)
      setTimeout(() => {
        showNotification(`File "${file.name}" received. Processing...`);
        // In a real implementation, you would parse the file and add exams
      }, 500);
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 pb-12">
      {/* Notification toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 
          notification.type === 'warning' ? 'bg-amber-100 text-amber-800 border-l-4 border-amber-500' : 
          'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
        }`}>
          {notification.type === 'success' ? <Check className="h-5 w-5 mr-2" /> : 
           notification.type === 'warning' ? <AlertCircle className="h-5 w-5 mr-2" /> : 
           <BookOpen className="h-5 w-5 mr-2" />}
          <p>{notification.message}</p>
          <button 
            onClick={() => setNotification(null)}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
                <p className="text-gray-500 mt-1">Create and manage your examination schedule</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Stats cards */}
        {exams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-indigo-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 mr-4">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Exams</p>
                  <p className="text-xl font-semibold">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-amber-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 mr-4">
                  <Bookmark className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Draft</p>
                  <p className="text-xl font-semibold">{stats.draft}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="text-xl font-semibold">{stats.published}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-semibold">{stats.completed}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form section */}
        {isFormOpen && (
          <div className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-in fade-in duration-300">
            <div className="px-6 py-4 bg-indigo-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingExam ? 'Edit Exam' : 'Create New Exam'}
              </h2>
            </div>
            <div className="p-6">
              <ExamForm
                exam={editingExam}
                onSubmit={editingExam ? handleEditExam : handleAddExam}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingExam(undefined);
                }}
              />
            </div>
          </div>
        )}

        {/* Drop area and table section */}
        {exams.length > 0 ? (
          <div 
            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
              isDragging ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-indigo-500 bg-opacity-10 flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Plus className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">Drop file to import exams</p>
                  <p className="text-sm text-gray-500">Supports CSV and Excel formats</p>
                </div>
              </div>
            )}
            
            <ExamTable
              exams={exams}
              onEdit={(exam) => {
                setEditingExam(exam);
                setIsFormOpen(true);
              }}
              onDuplicate={handleDuplicateExam}
              onDelete={handleDeleteExam}
              onCreateNew={() => {
                setEditingExam(undefined);
                setIsFormOpen(true);
              }}
            />
          </div>
        ) : (
          <div 
            className={`relative text-center py-16 bg-white shadow-lg rounded-xl transition-all duration-300 ${
              isDragging ? 'ring-2 ring-indigo-500 border-2 border-dashed border-indigo-300' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isDragging ? (
              <div className="absolute inset-0 bg-indigo-50 flex items-center justify-center rounded-xl">
                <div className="text-center">
                  <Plus className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-indigo-600 mb-2">Drop to Import</h3>
                  <p className="text-gray-500">Release to upload your exam data file</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-indigo-100 h-20 w-20 flex items-center justify-center rounded-full mx-auto mb-6">
                  <GraduationCap className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">No Exams Available</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Get started by creating your first exam or drag and drop a file to import multiple exams at once.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setEditingExam(undefined);
                      setIsFormOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    <span>Create Exam</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddExam;