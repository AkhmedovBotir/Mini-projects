import React, { useState } from 'react';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import CreateInstallmentModal from '../components/Installments/CreateInstallmentModal';
import EditInstallmentModal from '../components/Installments/EditInstallmentModal';
import DeleteInstallmentModal from '../components/Installments/DeleteInstallmentModal';
import ViewInstallmentModal from '../components/Installments/ViewInstallmentModal';

const Installments = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for installments
  const [installments] = useState([
    {
      id: 1,
      customer: 'John Doe',
      product: 'iPhone 13',
      totalAmount: 15000000,
      downPayment: 3000000,
      monthlyPayment: 1000000,
      duration: 12,
      paidMonths: 3,
      remainingAmount: 9000000,
      nextPaymentDate: '2024-02-15',
      status: 'active',
      createdAt: '2024-01-29',
    },
    // Add more mock installments as needed
  ]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter installments based on search term and status
  const filteredInstallments = installments.filter(installment => {
    const matchesSearch = installment.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || installment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentInstallments = filteredInstallments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInstallments.length / itemsPerPage);

  const handleCreateInstallment = (installmentData) => {
    // Handle installment creation logic here
    setShowCreateModal(false);
  };

  const handleEditInstallment = (installmentData) => {
    // Handle installment update logic here
    setShowEditModal(false);
  };

  const handleDeleteInstallment = () => {
    // Handle installment deletion logic here
    setShowDeleteModal(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Muddatli to'lovlar</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            Yangi muddatli to'lov
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="sm:flex sm:gap-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Mijoz nomi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Barcha statuslar</option>
              <option value="active">Faol</option>
              <option value="completed">To'langan</option>
              <option value="overdue">Muddati o'tgan</option>
              <option value="cancelled">Bekor qilingan</option>
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
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sana</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mijoz</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Maxsulot</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Umumiy summa</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">To'langan</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Qolgan summa</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Keyingi to'lov</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Amallar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentInstallments.map((installment) => (
                    <tr key={installment.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{installment.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(installment.createdAt).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                        {installment.customer}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {installment.product}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          installment.status === 'completed'
                            ? 'bg-green-50 text-green-700 ring-green-600/20'
                            : installment.status === 'active'
                            ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                            : installment.status === 'overdue'
                            ? 'bg-red-50 text-red-700 ring-red-600/20'
                            : 'bg-gray-50 text-gray-700 ring-gray-600/20'
                        }`}>
                          {installment.status === 'active'
                            ? 'Faol'
                            : installment.status === 'completed'
                            ? 'To\'langan'
                            : installment.status === 'overdue'
                            ? 'Muddati o\'tgan'
                            : 'Bekor qilingan'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {installment.totalAmount.toLocaleString()} so'm
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {installment.paidMonths} / {installment.duration} oy
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {installment.remainingAmount.toLocaleString()} so'm
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(installment.nextPaymentDate).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedInstallment(installment);
                              setShowViewModal(true);
                            }}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedInstallment(installment);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedInstallment(installment);
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
                Jami <span className="font-medium">{filteredInstallments.length}</span> ta to'lovdan{' '}
                <span className="font-medium">{startIndex + 1}</span>-
                <span className="font-medium">{Math.min(endIndex, filteredInstallments.length)}</span> ko'rsatilmoqda
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

      <CreateInstallmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateInstallment}
      />

      <EditInstallmentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditInstallment}
        installment={selectedInstallment}
      />

      <DeleteInstallmentModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteInstallment}
        installment={selectedInstallment}
      />

      <ViewInstallmentModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        installment={selectedInstallment}
      />
    </div>
  );
};

export default Installments;
