import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../config/api';
import Pagination from '../components/Pagination';
import CreateReportModal from '../components/CreateReportModal';
import EditReportModal from '../components/EditReportModal';
import { Helmet } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

function Reports() {
  const [reports, setReports] = useState([]);
  const [applications, setApplications] = useState({});
  const [departments, setDepartments] = useState({});
  const [employees, setEmployees] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchReports();
  }, [currentPage, selectedDepartment, searchQuery]);

  useEffect(() => {
    if (reports.length > 0) {
      fetchRelatedData();
    }
  }, [reports]);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/department/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAllDepartments(response.data);
    } catch (error) {
      console.error('Bo\'limlarni yuklashda xatolik:', error);
      toast.error('Bo\'limlarni yuklashda xatolik yuz berdi');
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let url = `${API_URL}/completedWork/paged?page=${currentPage + 1}&size=10`;
      
      if (selectedDepartment || searchQuery) {
        const response = await axios.post(`${API_URL}/completedWork/filter?page=${currentPage + 1}&size=10`, {
          departmentId: selectedDepartment || null,
          search: searchQuery || null
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setReports(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } else {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setReports(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error('Hisobotlarni yuklashda xatolik:', error);
      toast.error('Hisobotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedData = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const applicationIds = [...new Set(reports.map(r => r.applicationId))];
      const departmentIds = [...new Set(reports.map(r => r.departmentId))];
      const employeeIds = [...new Set(reports.map(r => r.employeeId))];

      const applicationsData = {};
      for (const id of applicationIds) {
        try {
          const response = await axios.get(`${API_URL}/application/${id}`, { headers });
          applicationsData[id] = response.data;
        } catch (error) {
          console.error(`Ariza ID=${id} ma'lumotlarini olishda xatolik:`, error);
        }
      }
      setApplications(applicationsData);

      const departmentsData = {};
      for (const id of departmentIds) {
        try {
          const response = await axios.get(`${API_URL}/department/${id}`, { headers });
          departmentsData[id] = response.data;
        } catch (error) {
          console.error(`Bo'lim ID=${id} ma'lumotlarini olishda xatolik:`, error);
        }
      }
      setDepartments(departmentsData);

      const employeesData = {};
      for (const id of employeeIds) {
        try {
          const response = await axios.get(`${API_URL}/employee/${id}`, { headers });
          employeesData[id] = response.data;
        } catch (error) {
          console.error(`Xodim ID=${id} ma'lumotlarini olishda xatolik:`, error);
        }
      }
      setEmployees(employeesData);

    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xatolik:', error);
      toast.error('Qo\'shimcha ma\'lumotlarni yuklashda xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Haqiqatan ham bu hisobotni o\'chirmoqchimisiz?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`${API_URL}/completedWork/${id}/wipe`, 
          { visible: false },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        toast.success("Hisobot muvaffaqiyatli o'chirildi");
        fetchReports();
      } catch (error) {
        console.error("Hisobotni o'chirishda xatolik:", error);
        toast.error("Hisobotni o'chirishda xatolik yuz berdi");
      }
    }
  };

  const handleEdit = (id) => {
    setSelectedReportId(id);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Mavjud emas';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Hisobotlar</title>
        <meta name="description" content="Hisobotlar sahifasi" />
      </Helmet>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Hisobotlar</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Yangi hisobot
        </button>
      </div>

      <div className="mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filtrlash</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label text-gray-700 text-sm font-medium mb-2">
                  Qidirish
                </label>
                <input
                  type="text"
                  className="form-control w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label text-gray-700 text-sm font-medium mb-2">
                  Bo'lim
                </label>
                <select
                  className="form-select w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Barcha bo'limlar</option>
                  {allDepartments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ariza
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bo'lim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xodim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yaratilgan sana
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applications[report.applicationId]?.title || `Ariza #${report.applicationId}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {departments[report.departmentId]?.title || `Bo'lim #${report.departmentId}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employees[report.employeeId] ? 
                      `${employees[report.employeeId].name} ${employees[report.employeeId].surname}` : 
                      `Xodim #${report.employeeId}`
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(report.createdDate)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Hisobotlar mavjud emas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchReports}
      />

      <EditReportModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchReports}
        reportId={selectedReportId}
      />
    </div>
  );
}

export default Reports;
