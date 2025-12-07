import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../components/Pagination';
import CreateApplicationModal from '../components/CreateApplicationModal';
import EditApplicationModal from '../components/EditApplicationModal';
import axios from 'axios';
import { API_URL } from '../config/api';
import { Helmet } from 'react-helmet-async';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatusApp, setSelectedStatusApp] = useState(null);
  const [editingApplicationId, setEditingApplicationId] = useState(null);
  const [deletingApplication, setDeletingApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const statusList = [
    { value: "SENT", label: "Yangi" },
    { value: "IN_PROGRESS", label: "Jarayonda" },
    { value: "APPROVED", label: "Tasdiqlandi" },
    { value: "COMPLETED", label: "Bajarilgan" },
    { value: "REJECTED", label: "Rad etilgan" }
  ];

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'ADMIN');
  }, []);

  useEffect(() => {
    if (searchQuery || selectedDepartment || selectedEmployee || selectedStatus || startDate || endDate) {
      filterApplications();
    } else {
      fetchApplications();
    }
  }, [currentPage, searchQuery, selectedDepartment, selectedEmployee, selectedStatus, startDate, endDate]);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/department/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Bo'limlarni yuklashda xatolik:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/employee/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Xodimlarni yuklashda xatolik:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setCurrentPage(1);
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      // API endpointni userRole ga qarab tanlash
      const endpoint = userRole === 'ADMIN' 
        ? `${API_URL}/application/paged/admins` 
        : `${API_URL}/application/paged`;
      
      const response = await axios.get(`${endpoint}?page=${currentPage}&size=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setApplications(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Arizalarni yuklashda xatolik:", error);
      if (error.response) {
        console.error("Server javobi:", error.response.data);
      }
      toast.error("Arizalarni yuklashda xatolik yuz berdi");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Filter parametrlarini tekshiramiz
      const filterParams = {
        search: searchQuery || undefined,
        departmentId: selectedDepartment || undefined,
        employeeId: selectedEmployee || undefined,
        status: selectedStatus || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      };

      // Faqat qiymati bor parametrlarni qoldiramiz
      const cleanFilterParams = Object.fromEntries(
        Object.entries(filterParams).filter(([_, v]) => v !== undefined)
      );

      const response = await axios.post(
        `${API_URL}/application/filter?page=${currentPage}&size=${itemsPerPage}`,
        cleanFilterParams,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setApplications(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Filtrlashda xatolik:", error);
      if (error.response) {
        console.error("Server javobi:", error.response.data);
      }
      toast.error("Filtrlashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    const statusItem = statusList.find(item => item.value === status);
    return statusItem ? statusItem.label : status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SENT":
        return "bg-blue-500 text-white";
      case "APPROVED":
        return "bg-indigo-700 text-white";
      case "IN_PROGRESS":
        return "bg-yellow-500 text-white";
      case "COMPLETED":
        return "bg-green-500 text-white";
      case "REJECTED":
        return "bg-red-500 text-white";
      default:
        return "bg-orange-500 text-white";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("uz-UZ");
  };

  const handleDeleteApplication = (application) => {
    setDeletingApplication(application);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${API_URL}/application/${deletingApplication.id}/wipe`,
        { visible: false },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Arizani o\'chirishda xatolik');
      }

      toast.success('Ariza muvaffaqiyatli o\'chirildi');
      setIsDeleteModalOpen(false);
      fetchApplications();
    } catch (error) {
      console.error('Arizani o\'chirishda xatolik:', error);
      toast.error('Arizani o\'chirishda xatolik yuz berdi');
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsViewModalOpen(true);
  };

  const getEmployeeName = (id) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? `${employee.name} ${employee.surname}` : 'Noma\'lum';
  };

  const getDepartmentName = (id) => {
    const department = departments.find(dep => dep.id === id);
    return department ? department.title : 'Noma\'lum';
  };

  const handleAssignEmployee = async (applicationId, employeeId) => {
    if (!employeeId) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/application/${applicationId}/assignedTo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          assignedToId: parseInt(employeeId)
        })
      });

      // Agar response text bo'lsa
      const responseText = await response.text();
      let data;
      try {
        // JSON parse qilishga harakat qilamiz
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        // Agar JSON parse qilib bo'lmasa, text xabar qaytaramiz
        data = { message: responseText };
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Xodim tayinlashda xatolik');
      }

      toast.success("Xodim muvaffaqiyatli tayinlandi");
      
      // Faqat tanlangan arizani yangilaymiz
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId 
            ? { ...app, assignedTo: parseInt(employeeId) }
            : app
        )
      );
    } catch (error) {
      console.error("Xodim tayinlashda xatolik:", error);
      toast.error(error.message || "Xodim tayinlashda xatolik yuz berdi");
    }
  };

  const handleStatusClick = (application) => {
    setSelectedStatusApp(application);
    setIsStatusModalOpen(true);
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/application/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status: newStatus
        })
      });

      // Agar response text bo'lsa
      const responseText = await response.text();
      let data;
      try {
        // JSON parse qilishga harakat qilamiz
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        // Agar JSON parse qilib bo'lmasa, text xabar qaytaramiz
        data = { message: responseText };
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Holatni o\'zgartirishda xatolik');
      }

      toast.success("Holat muvaffaqiyatli o'zgartirildi");
      setIsStatusModalOpen(false);
      setCurrentPage(1);
      // Faqat tanlangan arizani yangilaymiz
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId 
            ? { ...app, status: newStatus }
            : app
        )
      );
    } catch (error) {
      console.error("Holatni o'zgartirishda xatolik:", error);
      toast.error(error.message || "Holatni o'zgartirishda xatolik yuz berdi");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditApplication = (application) => {
    setEditingApplicationId(application.id);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      // USER uchun faqat name va description ni yuborish
      const requestData = userRole === 'USER' ? {
        name: updatedData.name,
        description: updatedData.description
      } : updatedData;

      const response = await axios.put(
        `${API_URL}/application/${editingApplicationId}`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        toast.success("Ariza muvaffaqiyatli yangilandi");
        setIsEditModalOpen(false);
        fetchApplications();
      }
    } catch (error) {
      console.error("Arizani yangilashda xatolik:", error);
      toast.error("Arizani yangilashda xatolik yuz berdi");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
        <title>Arizalar</title>
        <meta name="description" content="Admin panelga arizalar sahifasi" />
      </Helmet>
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Arizalar</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Yangi ariza
          </button>
        </div>

        {isAdmin && (
          <div className="mb-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Filtrlash</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Arizalarni qidirish va filtrlash
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-3">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="form-group">
                      <label className="form-label text-gray-700 text-sm font-medium mb-2">
                        Qidirish
                      </label>
                      <input
                        type="text"
                        className="form-control w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Qidirish..."
                        value={searchQuery}
                        onChange={handleSearch}
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
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label text-gray-700 text-sm font-medium mb-2">
                        Xodim
                      </label>
                      <select
                        className="form-select w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedEmployee}
                        onChange={handleEmployeeChange}
                      >
                        <option value="">Barcha xodimlar</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>
                            {emp.name} {emp.surname}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label text-gray-700 text-sm font-medium mb-2">
                        Holat
                      </label>
                      <select
                        className="form-select w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedStatus}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <option value="">Barcha holatlar</option>
                        <option value="SENT">Yangi</option>
                        <option value="IN_PROGRESS">Jarayonda</option>
                        <option value="COMPLETED">Bajarilgan</option>
                        <option value="REJECTED">Rad etilgan</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label text-gray-700 text-sm font-medium mb-2">
                        Boshlanish sanasi
                      </label>
                      <input
                        type="date"
                        className="form-control w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label text-gray-700 text-sm font-medium mb-2">
                        Tugash sanasi
                      </label>
                      <input
                        type="date"
                        className="form-control w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ko'rish modali */}
        {isViewModalOpen && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">So'rov ma'lumotlari</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sarlavha</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tavsif</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedApplication.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Holat</label>
                    <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                      {getStatusText(selectedApplication.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Yaratilgan sana</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedApplication.createdDate)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* O'chirish modali */}
        {isDeleteModalOpen && deletingApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">So'rovni o'chirish</h2>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Haqiqatan ham bu so'rovni o'chirmoqchimisiz?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  So'rov: {deletingApplication.title} ({deletingApplication.code})
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Application Modal */}
        <CreateApplicationModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchApplications();
          }}
        />

        {/* Edit Application Modal */}
        <EditApplicationModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            setIsEditModalOpen(false);
            fetchApplications();
          }}
          applicationId={editingApplicationId}
        />

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sarlavha
                </th>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bo'lim
                  </th>
                )}
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xodim
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yaratilgan sana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.title}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {departments.find(dept => dept.id === application.department)?.title || "Bo'lim tanlanmagan"}
                    </td>
                  )}
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={application.assignedTo || ""}
                        onChange={(e) => handleAssignEmployee(application.id, e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="">Xodim tanlang</option>
                        {employees.map((employee) => (
                          <option 
                            key={employee.id} 
                            value={employee.id}
                            selected={application.assignedTo === employee.id}
                          >
                            {employee.name} {employee.surname}
                          </option>
                        ))}
                      </select>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(application.createdDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)} ${isAdmin ? 'cursor-pointer' : ''}`}
                      onClick={() => isAdmin && handleStatusClick(application)}
                    >
                      {getStatusText(application.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center">
                    <button
                      onClick={() => handleViewApplication(application)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleEditApplication(application)}
                          className="text-yellow-600 hover:text-yellow-900 mr-2"
                        >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(application)}
                          className="text-red-600 hover:text-red-900"
                        >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status o'zgartirish modali */}
        {isStatusModalOpen && selectedStatusApp && (
          <div className="fixed inset-0 bg-gray-500 z-50 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Holat o'zgartirish</h3>
                <button
                  onClick={() => setIsStatusModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Yopish</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {statusList.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(selectedStatusApp.id, status.value)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      selectedStatusApp.status === status.value ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(status.value)}`}></span>
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </>
  );
}

export default Applications;
