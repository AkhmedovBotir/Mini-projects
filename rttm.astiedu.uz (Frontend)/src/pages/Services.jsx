import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config/api';
import { Helmet } from 'react-helmet-async';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    departmentId: '',
    status: true,
  });
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);

  const token = localStorage.getItem('token'); // Token ni o'zingizning tokeningiz bilan almashtiring
  const userRole = localStorage.getItem('userRole');

  // Barcha xizmatlarni olish
  useEffect(() => {
    fetchServices();
    fetchDepartments(); // Bo'limlarni olish
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/offering/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Xizmatlar: ', response.data);
      setServices(response.data || []); // Agar data null bo'lsa bo'sh massiv o'rnatamiz
    } catch (error) {
      console.error('Xizmatlarni olishda xatolik:', error);
      setServices([]); // Xatolik bo'lganda bo'sh massiv o'rnatamiz
      toast.error('Xizmatlarni olishda xatolik yuz berdi');
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_URL}/department/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Bo\'limlar: ', response.data);
      setDepartments(response.data); // Agar data null bo'lsa bo'sh massiv o'rnatamiz
    } catch (error) {
      console.error('Bo\'limlarni olishda xatolik:', error);
      setDepartments([]); // Xatolik bo'lganda bo'sh massiv o'rnatamiz
      if (error.response?.status !== 400) { // 400 xatolik bo'lmasa xabar ko'rsatamiz
        toast.error('Bo\'limlarni olishda xatolik yuz berdi');
      }
    }
  };

  // Yangi xizmat qo'shish
  const handleAddService = () => {
    setIsModalOpen(true);
    setNewService({
      title: '',
      description: '',
      departmentId: '',
      status: true,
    });
  };

  // Modal oynani yopish
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewService({
      title: '',
      description: '',
      departmentId: ''
    });
  };

  // Xizmat qo'shish
  const handleSaveService = async () => {
    if (newService.title && newService.departmentId) {
      try {
        // Faqat ADMIN uchun xizmat qo'shish
        if (userRole === 'ADMIN') {
          await axios.post(
            `${API_URL}/offering`,
            {
              title: newService.title,
              description: newService.description,
              departmentId: newService.departmentId,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          toast.success('Xizmat muvaffaqiyatli qo\'shildi');
          handleCloseModal();
          fetchServices();
        } else {
          toast.error('Sizda xizmat qo\'shish huquqi yo\'q');
        }
      } catch (error) {
        console.error('Xizmat qo\'shishda xatolik:', error);
        toast.error('Xizmat qo\'shishda xatolik yuz berdi');
      }
    }
  };

  // Xizmatni tahrirlash
  const handleEditService = (service) => {
    setEditingService({ ...service });
    setIsEditModalOpen(true);
  };

  // Xizmatni yangilash
  const handleUpdateService = async () => {
    if (editingService.title && editingService.departmentId) {
      try {
        await axios.put(
          `${API_URL}/offering/${editingService.id}`,
          {
            title: editingService.title,
            description: editingService.description,
            departmentId: editingService.departmentId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchServices(); // Xizmatlar ro'yxatini yangilash
        setIsEditModalOpen(false);
        setEditingService(null);
        toast.success('Xizmat muvaffaqiyatli yangilandi');
      } catch (error) {
        toast.error('Xizmatni yangilashda xatolik:', error);
      }
    }
  };

  // Xizmatni o'chirish
  const handleDeleteService = (service) => {
    setDeletingService(service);
    setIsDeleteModalOpen(true);
  };

  // O'chirishni tasdiqlash
  const handleConfirmDelete = async () => {
    try {
      // Faqat ADMIN uchun xizmatni o'chirish
      if (userRole === 'ADMIN') {
        await axios.patch(
          `${API_URL}/offering/${deletingService.id}/wipe`,
          { visible: false },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        toast.success('Xizmat muvaffaqiyatli o\'chirildi');
        fetchServices();
      } else {
        toast.error('Sizda xizmatni o\'chirish huquqi yo\'q');
      }
    } catch (error) {
      console.error('Xizmatni o\'chirishda xatolik:', error);
      toast.error('Xizmatni o\'chirishda xatolik yuz berdi');
    }
  };

  // Xizmatni ko'rish
  const handleViewService = (service) => {
    setSelectedService(service);
  };

  // Statusni o'zgartirish
  const handleToggleStatus = async (service) => {
    try {
      await axios.patch(
        `${API_URL}/offering/${service.id}/status`,
        { status: !service.status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchServices(); // Xizmatlar ro'yxatini yangilash
      toast.success('Status muvaffaqiyatli o\'zgartirildi');
    } catch (error) {
      toast.error('Statusni o\'zgartirishda xatolik:', error);
    }
  };

  // Qidiruv va filtrlash
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDepartment ? service.departmentId === parseInt(filterDepartment) : true) &&
      (filterStatus !== '' ? service.status === (filterStatus === 'true') : true)
  );

  // Pagination uchun ma'lumotlarni filtrlash
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Sahifani o'zgartirish
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Xizmatlar</title>
        <meta name="description" content="Admin panelga xizmatlar sahifasi" />
      </Helmet>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Xizmatlar</h1>
          {userRole === 'ADMIN' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Yangi qo'shish
            </button>
          )}
        </div>

        {/* Qidiruv va filterlar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Xizmat nomi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Barcha bo'limlar</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.title}
              </option>
            ))}
          </select>
          {/* <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Barcha statuslar</option>
            <option value="true">Faol</option>
            <option value="false">Nofaol</option>
          </select> */}
        </div>

        {/* Xizmatlar jadvali */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bo'lim</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                {userRole === 'ADMIN' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amallar</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {departments.find((dept) => dept.id === service.departmentId)?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {service.status ? 'Faol' : 'Nofaol'}
                    </span>
                  </td>
                  {userRole === 'ADMIN' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleEditService(service)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredServices.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Yangi xizmat qo'shish modali */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Yangi xizmat qo'shish</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomi</label>
                  <input
                    type="text"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tavsif</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bo'lim</label>
                  <select
                    value={newService.departmentId}
                    onChange={(e) => setNewService({ ...newService, departmentId: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Tanlang</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSaveService}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tahrirlash modali */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Xizmatni tahrirlash</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomi</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tavsif</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bo'lim</label>
                  <select
                    value={editingService.departmentId}
                    onChange={(e) => setEditingService({ ...editingService, departmentId: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Tanlang</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleUpdateService}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Xizmatni ko'rish modali */}
        {selectedService && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Xizmat ma'lumotlari</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomi</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedService.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tavsif</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedService.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bo'lim</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {departments.find((dept) => dept.id === selectedService.departmentId)?.title}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedService.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {selectedService.status ? 'Faol' : 'Nofaol'}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* O'chirish modali */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Xizmatni o'chirish</h2>
              <p className="text-gray-500 mb-4">
                Haqiqatan ham bu xizmatni o'chirmoqchimisiz?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Services;