import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ViewAssistantModal = ({ isOpen, onClose, assistant }) => {
  if (!isOpen || !assistant) return null;

  return (
    <Dialog
      as="div"
      className="relative z-50"
      onClose={onClose}
      open={isOpen}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                Yordamchi ma'lumotlari
              </Dialog.Title>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Asosiy ma'lumotlar</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Ism familiya
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{assistant.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Telefon raqami
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{assistant.phone}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Username
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{assistant.username}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Do'kon
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{assistant.storeName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <p className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assistant.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {assistant.status === 'active' ? 'Faol' : 'Faol emas'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Ruxsatlar</h4>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(assistant.permissions).map(([section, permissions]) => (
                    <div key={section} className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 capitalize">{section}</h5>
                      <div className="space-y-2">
                        {permissions.map(permission => (
                          <div key={permission} className="flex items-center">
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="ml-2 text-sm text-gray-700 capitalize">
                              {permission}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default ViewAssistantModal;
