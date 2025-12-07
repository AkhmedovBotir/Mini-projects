import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import CreateCategoryModal from '../components/Categories/CreateCategoryModal';
import EditCategoryModal from '../components/Categories/EditCategoryModal';
import DeleteCategoryModal from '../components/Categories/DeleteCategoryModal';

const Categories = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'administrator';

  // Static data for development
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Ichimliklar",
      subcategories: [
        { id: 11, name: "Gazli ichimliklar" },
        { id: 12, name: "Gazsiz ichimliklar" },
        { id: 13, name: "Energetik ichimliklar" }
      ],
      storeId: 1,
      storeName: "Olmazor do'koni",
      createdBy: {
        id: 1,
        name: "Akmal Akmalov",
        role: "admin"
      },
      status: 'active'
    },
    {
      id: 2,
      name: "Shirinliklar",
      subcategories: [
        { id: 21, name: "Shokoladlar" },
        { id: 22, name: "Konfetlar" }
      ],
      storeId: 2,
      storeName: "Chilonzor do'koni",
      createdBy: {
        id: 2,
        name: "Botir Botirov",
        role: "assistant"
      },
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    store: '',
    createdBy: ''
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleStatusChange = (categoryId) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          status: category.status === 'active' ? 'inactive' : 'active'
        };
      }
      return category;
    }));
  };

  const toggleExpand = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter categories based on user role
  const userCategories = isAdmin 
    ? categories 
    : categories.filter(category => category.storeId === user?.storeId);

  const filteredCategories = userCategories.filter(category => {
    const searchMatch = 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      category.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = !filters.status || category.status === filters.status;
    const storeMatch = !filters.store || category.storeId.toString() === filters.store;
    const createdByMatch = !filters.createdBy || category.createdBy.role === filters.createdBy;

    return searchMatch && statusMatch && storeMatch && createdByMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Kategoriyalar</h1>
          <p className="mt-2 text-sm text-gray-700">
            {isAdmin 
              ? "Barcha do'konlardagi kategoriyalar ro'yxati"
              : "Do'koningizdagi kategoriyalar ro'yxati"}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Yangi kategoriya
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors duration-200"
                placeholder="Kategoriya nomi, sub-kategoriya yoki do'kon nomi bo'yicha qidirish..."
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-40 px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors duration-200"
            >
              <option value="">Barcha status</option>
              <option value="active">Faol</option>
              <option value="inactive">Faol emas</option>
            </select>

            {isAdmin && (
              <select
                value={filters.createdBy}
                onChange={(e) => setFilters(prev => ({ ...prev, createdBy: e.target.value }))}
                className="w-40 px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors duration-200"
              >
                <option value="">Yaratuvchi</option>
                <option value="admin">Admin</option>
                <option value="assistant">Yordamchi</option>
              </select>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nomi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub-kategoriyalar
                </th>
                {isAdmin && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Do'kon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yaratuvchi
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map(sub => (
                        <span
                          key={sub.id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  {isAdmin && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {category.storeName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {category.createdBy.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.createdBy.role === 'admin' ? 'Admin' : 'Yordamchi'}
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status === 'active' ? 'Faol' : 'Nofaol'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
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
              <tr>
                <td colSpan={isAdmin ? 7 : 5} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        Jami <span className="font-medium">{filteredCategories.length}</span> ta kategoriya,{' '}
                        <span className="font-medium">{startIndex + 1}</span> dan{' '}
                        <span className="font-medium">{Math.min(endIndex, filteredCategories.length)}</span> gacha ko'rsatilmoqda
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

        {/* Modals */}
        <CreateCategoryModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={(data) => {
            setCategories([
              ...categories,
              {
                id: categories.length + 1,
                ...data,
                createdBy: {
                  id: user?.id,
                  name: user?.name,
                  role: user?.role === 'administrator' ? 'admin' : 'assistant'
                },
                subcategories: [],
                status: 'active'
              }
            ]);
            setShowCreateModal(false);
          }}
          isAdmin={isAdmin}
        />

        <EditCategoryModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          category={selectedCategory}
          onSubmit={(data) => {
            setCategories(
              categories.map((category) =>
                category.id === data.id ? { ...category, ...data } : category
              )
            );
            setShowEditModal(false);
          }}
          isAdmin={isAdmin}
        />

        <DeleteCategoryModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          category={selectedCategory}
          onSubmit={() => {
            setCategories(categories.filter((category) => category.id !== selectedCategory.id));
            setShowDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Categories;
