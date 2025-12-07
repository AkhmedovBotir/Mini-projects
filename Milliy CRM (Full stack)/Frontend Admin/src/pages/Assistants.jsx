import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import CreateAssistantModal from '../components/Assistants/CreateAssistantModal';
import EditAssistantModal from '../components/Assistants/EditAssistantModal';
import DeleteAssistantModal from '../components/Assistants/DeleteAssistantModal';
import ViewAssistantModal from '../components/Assistants/ViewAssistantModal';

const Assistants = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'administrator';

  const [assistants, setAssistants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    store: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  const [stores, setStores] = useState([]);

  const handleStatusChange = (assistantId) => {
    setAssistants(assistants.map(assistant => {
      if (assistant.id === assistantId) {
        return {
          ...assistant,
          status: assistant.status === 'active' ? 'inactive' : 'active'
        };
      }
      return assistant;
    }));
  };

  const handleCreateAssistant = async (assistantData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token topilmadi');
      }

      if (!assistantData.storeId) {
        setSnackbar({
          open: true,
          message: 'Do\'konni tanlang',
          type: 'error'
        });
        return;
      }

      // Permissions ni Map formatiga o'tkazish
      const permissions = {};
      assistantData.permissions.forEach(permission => {
        permissions[permission] = true;
      });

      // User ma'lumotlarini olish
      const userDataStr = localStorage.getItem('user');
      if (!userDataStr) {
        throw new Error('Foydalanuvchi ma\'lumotlari topilmadi');
      }
      const userData = JSON.parse(userDataStr);

      const response = await fetch('http://localhost:3000/api/assistant/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: assistantData.name,
          phone: assistantData.phone,
          username: assistantData.username,
          password: assistantData.password,
          storeId: assistantData.storeId,
          permissions,
          createdBy: userData._id
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Token yaroqsiz');
        }
        throw new Error('Yordamchi qo\'shishda xatolik yuz berdi');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Yordamchi qo\'shishda xatolik yuz berdi');
      }

      setSnackbar({
        open: true,
        message: 'Yordamchi muvaffaqiyatli qo\'shildi',
        type: 'success'
      });

      setShowCreateModal(false);
      fetchAssistants();
    } catch (error) {
      console.error('Error creating assistant:', error);
      setSnackbar({
        open: true,
        message: error.message,
        type: 'error'
      });
    }
  };

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token topilmadi');
      }

      const response = await fetch('http://localhost:3000/api/shop/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Token yaroqsiz');
        }
        throw new Error('Do\'konlarni yuklashda xatolik yuz berdi');
      }

      const data = await response.json();
      console.log('Shops response:', data);

      if (!data.success) {
        throw new Error(data.message || 'Do\'konlarni yuklashda xatolik yuz berdi');
      }

      const shops = data.shops || [];
      console.log('Shops:', shops);
      setStores(shops);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setSnackbar({
        open: true,
        message: error.message,
        type: 'error'
      });
    }
  };

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token topilmadi');
        }

        let url = 'http://localhost:3000/api/assistant/list';
        const params = new URLSearchParams();
        
        // Qidiruv parametrini qo'shish
        if (searchTerm) {
          params.append('search', searchTerm);
        }

        // Admin bo'lmasa, faqat o'zining do'konlaridagi yordamchilarni ko'rishi kerak
        if (user?.role !== 'administrator' && user?.store?.id) {
          params.append('storeId', user.store.id);
        }

        // URL ga parametrlarni qo'shish
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('Token yaroqsiz');
          }
          throw new Error('Yordamchilarni yuklashda xatolik yuz berdi');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Yordamchilarni yuklashda xatolik yuz berdi');
        }

        // Yordamchilar ro'yxatini formatlash
        const formattedAssistants = data.assistants.map(assistant => ({
          id: assistant.id,
          name: assistant.name,
          phone: assistant.phone,
          username: assistant.username,
          store: assistant.store,
          storeOwner: assistant.storeOwner,
          permissions: assistant.permissions,
          status: assistant.status,
          createdAt: new Date(assistant.createdAt).toLocaleString('uz-UZ'),
          createdBy: assistant.createdBy ? `${assistant.createdBy.name} (${assistant.createdBy.role})` : 'Noma\'lum'
        }));

        setAssistants(formattedAssistants);
      } catch (error) {
        console.error('Error fetching assistants:', error);
      }
    };

    fetchAssistants();
    fetchStores();
  }, [searchTerm, user]);

  // Filter assistants based on user role
  const userAssistants = isAdmin 
    ? assistants 
    : assistants.filter(assistant => assistant.storeOwnerId === user?.id);

  const filteredAssistants = userAssistants.filter(assistant => {
    const searchMatch = 
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = !filters.status || assistant.status === filters.status;
    const storeMatch = !filters.store || assistant.storeId.toString() === filters.store;

    return searchMatch && statusMatch && storeMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredAssistants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAssistants = filteredAssistants.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-semibold text-gray-900">Yordamchilar</h2>
          <p className="mt-2 text-sm text-gray-700">
            {isAdmin 
              ? "Barcha do'konlardagi yordamchilar ro'yxati"
              : "Do'koningizdagi yordamchilar ro'yxati"}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Yangi yordamchi
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors duration-200"
                placeholder="Ism, telefon, username yoki do'kon nomi bo'yicha qidirish..."
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="block w-40 px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors duration-200"
            >
              <option value="">Barcha status</option>
              <option value="active">Faol</option>
              <option value="inactive">Faol emas</option>
            </select>
          </div>
        </div>

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Ism familiya
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Telefon
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Username
                    </th>
                    {isAdmin && (
                      <>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Do'kon
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Do'kon egasi
                        </th>
                      </>
                    )}
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ruxsatlar
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentAssistants.map((assistant) => (
                    <tr key={assistant.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {assistant.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {assistant.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {assistant.username}
                      </td>
                      {isAdmin && (
                        <>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {assistant.storeName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {assistant.storeOwnerName}
                          </td>
                        </>
                      )}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(assistant.permissions).map(([key, perms]) => (
                            <span
                              key={key}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              title={`${key}: ${perms.join(', ')}`}
                            >
                              {key}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleStatusChange(assistant.id)}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                              assistant.status === 'active' ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                assistant.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className="ml-3 text-sm">
                            {assistant.status === 'active' ? 'Faol' : 'Faol emas'}
                          </span>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedAssistant(assistant);
                              setShowViewModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAssistant(assistant);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAssistant(assistant);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className='w-full'>
                    <td colSpan="7" className="w-full px-2 py-4">
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center">
                          <p className="text-sm text-gray-700">
                            Jami <span className="font-medium">{filteredAssistants.length}</span> ta yordamchi,{' '}
                            <span className="font-medium">{startIndex + 1}</span> dan{' '}
                            <span className="font-medium">{Math.min(endIndex, filteredAssistants.length)}</span> gacha ko'rsatilmoqda
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                              currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <ChevronLeftIcon className="h-5 w-5" />
                          </button>
                          {[...Array(totalPages)].map((_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => handlePageChange(index + 1)}
                              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                currentPage === index + 1
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                              currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <ChevronRightIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateAssistantModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAssistant}
        stores={stores}
      />

      <EditAssistantModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        assistant={selectedAssistant}
        onSubmit={(data) => {
          setAssistants(
            assistants.map((assistant) =>
              assistant.id === data.id ? { ...assistant, ...data } : assistant
            )
          );
          setShowEditModal(false);
        }}
        isAdmin={isAdmin}
      />

      <DeleteAssistantModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        assistant={selectedAssistant}
        onSubmit={() => {
          setAssistants(assistants.filter((assistant) => assistant.id !== selectedAssistant.id));
          setShowDeleteModal(false);
        }}
      />

      <ViewAssistantModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        assistant={selectedAssistant}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default Assistants;
