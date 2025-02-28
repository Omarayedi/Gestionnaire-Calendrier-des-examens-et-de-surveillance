import React, { useState, useEffect, useRef } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Award, Building, TrendingUp } from 'lucide-react';
import axios from 'axios';

export function ExamForm({ exam, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    subject: '',
    duration: 60,
    difficulty: 2,
    date: '',
    status: 'draft',
    coefficient: 1,
    start_time: '',
    department: '',
  });

  const [departments, setDepartments] = useState([]);



  const [department,setDepartment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef(null);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/department");
        if (Array.isArray(response.data)) {
          setDepartments(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setDepartments([]);
        }
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (exam) {
      setFormData({ ...exam });
    } else {
      setFormData({
        subject: '',
        duration: 60,
        difficulty: 2,
        date: '',
        status: 'draft',
        coefficient: 1,
        start_time: '',
        department: '',
      });
    }
    titleRef.current?.focus();
  }, [exam]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0.';
    if (formData.difficulty <= 0) newErrors.difficulty = 'Total marks must be greater than 0.';
    if (!formData.date) newErrors.date = 'Date is required.';
    else if (new Date(formData.date) < new Date()) newErrors.date = 'Date cannot be in the past.';
    if (!formData.department) newErrors.department = 'Department is required.';
    if (!formData.start_time) newErrors.start_time = 'Start time is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatToLocalDate = (date) => {
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  const formatToLocalTime = (timeString) => {
    return timeString + ":00"; // Append seconds if needed (HH:mm → HH:mm:ss)
  };

  const calculateEndTime = (startTime, duration) => {
    let [hours, minutes] = startTime.split(":").map(Number);
    minutes += duration;
    hours += Math.floor(minutes / 60);
    minutes %= 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        try {
            const token = localStorage.getItem("token"); // Get token from storage

            const response = await axios.post(
                "http://localhost:8000/api/exams",
                {
                    subject: formData.subject,
                    department: { departmentId: parseInt(department) }, 
                    examDate: formatToLocalDate(new Date(formData.date)),  
                    startTime: formatToLocalTime(formData.start_time),  
                    endTime: formatToLocalTime(calculateEndTime(formData.start_time, formData.duration)),  
                    duration: formData.duration,
                    difficulty: parseInt(formData.difficulty),
                    coefficient: parseInt(formData.coefficient),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Add the Authorization header
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // ✅ Ensure credentials (cookies) are included if needed
                }
            );

            setIsSubmitting(true);
            onSubmit(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }
};


  

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (field) =>
    `w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
    }`;

  const statusOptions = [
    { label: 'Draft', value: 'draft', icon: <Clock className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { label: 'Published', value: 'published', icon: <Calendar className="w-4 h-4" />, color: 'bg-green-100 text-green-800 border-green-200' },
    { label: 'Completed', value: 'completed', icon: <CheckCircle className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800 border-blue-200' },
  ];

  return (
    // Modal Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-400/10 backdrop-blur-md">

    {/* Modal Content */}
      <div className="bg-red rounded-lg shadow-xl w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <XCircle className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
            {exam ? 'Edit Exam Details' : 'Create New Exam'}
          </h2>
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div>
              <h3 className="text-md font-medium mb-4 text-gray-700">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Name*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    ref={titleRef}
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={inputClass('subject')}
                    placeholder="e.g., Advanced Mathematics"
                  />
                  {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Department Selection */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department*
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 text-gray-400" />
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                        setFormData((prevForm) => ({
                          ...prevForm,
                          department: departments.find((dept) => dept.departmentId === parseInt(e.target.value))?.name || "",
                        }));
                      }}
                      className={`${inputClass('department')} pl-10`}
                    >
                      <option value="" disabled>Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept.departmentId} value={dept.departmentId}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
                </div>

              </div>
            </div>

            {/* Exam Details Section */}
            <div>
              <h3 className="text-md font-medium mb-4 text-gray-700">Exam Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)*
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                      className={`${inputClass('duration')} pl-10`}
                      placeholder="60"
                      min="1"
                    />
                  </div>
                  {errors.duration && <p className="text-red-600 text-xs mt-1">{errors.duration}</p>}
                </div>

                {/* difficulty */}
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                    difficulty
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      id="difficulty"
                      value={formData.difficulty}
                      onChange={(e) => handleChange('difficulty', parseInt(e.target.value) || 0)}
                      className={`${inputClass('difficulty')} pl-10`}
                      placeholder="100"
                      min="1"
                    />
                  </div>
                  {errors.difficulty && <p className="text-red-600 text-xs mt-1">{errors.difficulty}</p>}
                </div>

                {/* Coefficient */}
                <div>
                  <label htmlFor="coefficient" className="block text-sm font-medium text-gray-700 mb-1">
                    Coefficient
                  </label>
                  <input
                    type="number"
                    id="coefficient"
                    value={formData.coefficient || 1}
                    onChange={(e) => handleChange('coefficient', parseFloat(e.target.value) || 0)}
                    className={inputClass('coefficient')}
                    placeholder="1"
                    step="1"
                    min="1"
                  />
                  {errors.coefficient && <p className="text-red-600 text-xs mt-1">{errors.coefficient}</p>}
                </div>
              </div>
            </div>

            {/* Scheduling Section */}
            <div>
              <h3 className="text-md font-medium mb-4 text-gray-700">Scheduling</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Date*
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className={`${inputClass('date')} pl-10`}
                    />
                  </div>
                  {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* Start Time */}
                <div>
                  <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time*
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="time"
                      id="start_time"
                      value={formData.start_time}
                      onChange={(e) => handleChange('start_time', e.target.value)}
                      className={`${inputClass('start_time')} pl-10`}
                    />
                  </div>
                  {errors.start_time && <p className="text-red-600 text-xs mt-1">{errors.start_time}</p>}
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Status
              </label>
              <div className="flex flex-wrap gap-3">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => handleChange('status', status.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      formData.status === status.value 
                        ? `${status.color} ring-2 ring-offset-2 ring-indigo-300` 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {status.icon}
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={isSubmitting}
            >
              <XCircle className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              disabled={isSubmitting}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Saving...' : exam ? 'Update Exam' : 'Create Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
