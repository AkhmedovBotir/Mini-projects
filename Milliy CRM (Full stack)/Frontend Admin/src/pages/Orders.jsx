import React, { useState } from 'react';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CreateOrderModal from '../components/Orders/CreateOrderModal';
import EditOrderModal from '../components/Orders/EditOrderModal';
import DeleteOrderModal from '../components/Orders/DeleteOrderModal';

const Orders = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [dateRange, setDateRange] = useState('all');

  // Mock data for orders
  const [orders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      products: [
        { name: 'iPhone 13', quantity: 1, price: 12000000 },
        { name: 'AirPods Pro', quantity: 1, price: 3000000 },
      ],
      totalAmount: 15000000,
      status: 'pending',
      createdAt: '2024-01-29',
    },
    // Add more mock orders as needed
  ]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort orders based on sort order
  const sortedOrders = filteredOrders.sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'amount_high':
        return b.totalAmount - a.totalAmount;
      case 'amount_low':
        return a.totalAmount - b.totalAmount;
      default:
        return 0;
    }
  });

  // Filter orders based on date range
  const dateFilteredOrders = sortedOrders.filter(order => {
    switch (dateRange) {
      case 'today':
        return new Date(order.createdAt).toLocaleDateString('uz-UZ') === new Date().toLocaleDateString('uz-UZ');
      case 'week':
        return new Date(order.createdAt).getTime() >= new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
      case 'month':
        return new Date(order.createdAt).getTime() >= new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
      case 'year':
        return new Date(order.createdAt).getTime() >= new Date().getTime() - 365 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  const currentOrders = dateFilteredOrders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dateFilteredOrders.length / itemsPerPage);

  const handleCreateOrder = (orderData) => {
    // Handle order creation logic here
    setShowCreateModal(false);
  };

  const handleEditOrder = (orderData) => {
    // Handle order update logic here
    setShowEditModal(false);
  };

  const handleDeleteOrder = () => {
    // Handle order deletion logic here
    setShowDeleteModal(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Buyurtmalar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Barcha buyurtmalar ro'yxati. Bu yerda yangi buyurtma qo'shish, tahrirlash va o'chirish mumkin.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            Yangi buyurtma
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="sm:flex sm:gap-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Qidiruv
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Mijoz nomi bo'yicha qidirish..."
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:w-40">
            <label htmlFor="status" className="sr-only">
              Status bo'yicha filtrlash
            </label>
            <select
              id="status"
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Barcha statuslar</option>
              <option value="pending">Kutilmoqda</option>
              <option value="processing">Jarayonda</option>
              <option value="completed">Bajarildi</option>
              <option value="cancelled">Bekor qilindi</option>
            </select>
          </div>
          <div className="mt-4 sm:mt-0 sm:w-40">
            <label htmlFor="sort" className="sr-only">
              Saralash
            </label>
            <select
              id="sort"
              name="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="newest">Eng yangi</option>
              <option value="oldest">Eng eski</option>
              <option value="amount_high">Narxi (yuqori)</option>
              <option value="amount_low">Narxi (past)</option>
            </select>
          </div>
          <div className="mt-4 sm:mt-0 sm:w-40">
            <label htmlFor="dateRange" className="sr-only">
              Vaqt oralig'i
            </label>
            <select
              id="dateRange"
              name="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Barcha vaqt</option>
              <option value="today">Bugun</option>
              <option value="week">Shu hafta</option>
              <option value="month">Shu oy</option>
              <option value="year">Shu yil</option>
            </select>
          </div>
        </div>

        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mijoz</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Maxsulotlar</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Umumiy summa</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sana</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Amallar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{order.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">{order.customer}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="max-h-20 overflow-auto">
                          {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between mb-1">
                              <span>{product.name}</span>
                              <span className="text-gray-400">
                                {product.quantity} x {product.price.toLocaleString()} so'm
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {order.totalAmount.toLocaleString()} so'm
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          order.status === 'completed'
                            ? 'bg-green-50 text-green-700 ring-green-600/20'
                            : order.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                            : order.status === 'processing'
                            ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                            : 'bg-red-50 text-red-700 ring-red-600/20'
                        }`}>
                          {order.status === 'pending'
                            ? 'Kutilmoqda'
                            : order.status === 'processing'
                            ? 'Jarayonda'
                            : order.status === 'completed'
                            ? 'Bajarildi'
                            : 'Bekor qilindi'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
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
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Oldingi
            </button>
            <button
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Keyingi
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Jami <span className="font-medium">{filteredOrders.length}</span> ta buyurtmadan{' '}
                <span className="font-medium">{startIndex + 1}</span>-
                <span className="font-medium">{Math.min(endIndex, filteredOrders.length)}</span> ko'rsatilmoqda
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Oldingi</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Keyingi</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <CreateOrderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateOrder}
      />

      <EditOrderModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditOrder}
        order={selectedOrder}
      />

      <DeleteOrderModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteOrder}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
