import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ViewInstallmentModal = ({ isOpen, onClose, installment }) => {
  if (!installment) return null;

  return (
    <Dialog as="div" className="relative z-[60]" onClose={onClose} open={isOpen}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />

      <div className="fixed inset-0 z-[60] overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Yopish</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 border-b pb-2">
                  Muddatli to'lov ma'lumotlari
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">ID</p>
                      <p className="mt-1 text-sm text-gray-900">#{installment.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Sana</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(installment.createdAt).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mijoz</p>
                      <p className="mt-1 text-sm text-gray-900">{installment.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Maxsulot</p>
                      <p className="mt-1 text-sm text-gray-900">{installment.product}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <span className={`mt-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
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
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">To'lov ma'lumotlari</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Umumiy summa</p>
                        <p className="mt-1 text-sm text-gray-900">{installment.totalAmount.toLocaleString()} so'm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Boshlang'ich to'lov</p>
                        <p className="mt-1 text-sm text-gray-900">{installment.downPayment.toLocaleString()} so'm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Oylik to'lov</p>
                        <p className="mt-1 text-sm text-gray-900">{installment.monthlyPayment.toLocaleString()} so'm</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Qolgan summa</p>
                        <p className="mt-1 text-sm text-gray-900">{installment.remainingAmount.toLocaleString()} so'm</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Muddat ma'lumotlari</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Umumiy muddat</p>
                        <p className="mt-1 text-sm text-gray-900">{installment.duration} oy</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">To'langan</p>
                        <p className="mt-1 text-sm text-gray-900">{installment.paidMonths} / {installment.duration} oy</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Keyingi to'lov sanasi</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(installment.nextPaymentDate).toLocaleDateString('uz-UZ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Yopish
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewInstallmentModal;
