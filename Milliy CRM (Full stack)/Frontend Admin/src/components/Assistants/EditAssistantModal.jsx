import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const permissionSections = {
  products: ['view', 'create', 'edit', 'delete'],
  orders: ['view', 'create', 'edit'],
  reports: ['view']
};

// Static data for development
const stores = [
  { id: 1, name: "Olmazor do'koni", ownerId: 1 },
  { id: 2, name: "Chilonzor do'koni", ownerId: 2 },
  { id: 3, name: "Yunusobod do'koni", ownerId: 3 }
];

const EditAssistantModal = ({ isOpen, onClose, onSubmit, assistant, isAdmin }) => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    username: '',
    password: '',
    storeId: '',
    permissions: {
      products: [],
      orders: [],
      reports: []
    },
    status: 'active'
  });

  useEffect(() => {
    if (assistant) {
      setFormData({
        ...assistant,
        password: '' // Clear password when editing
      });
    }
  }, [assistant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (section, permission, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: checked
          ? [...prev.permissions[section], permission]
          : prev.permissions[section].filter(p => p !== permission)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedStore = stores.find(store => store.id === parseInt(formData.storeId));
    onSubmit({
      ...formData,
      storeId: parseInt(formData.storeId),
      storeName: selectedStore ? selectedStore.name : '',
      password: formData.password || assistant.password // Keep old password if new one is not provided
    });
    onClose();
  };

  // Filter stores based on user role
  const availableStores = isAdmin 
    ? stores 
    : stores.filter(store => store.ownerId === user?.id);

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
                Yordamchini tahrirlash
              </Dialog.Title>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ism familiya
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon raqami
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yangi password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="Yangi parol kiriting..."
                  />
                </div>

                {isAdmin && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do'kon
                    </label>
                    <select
                      name="storeId"
                      value={formData.storeId}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                      required
                    >
                      <option value="">Do'konni tanlang</option>
                      {availableStores.map(store => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Permissions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Ruxsatlar</h4>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(permissionSections).map(([section, permissions]) => (
                    <div key={section} className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 capitalize">{section}</h5>
                      <div className="space-y-2">
                        {permissions.map(permission => (
                          <label key={permission} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.permissions[section].includes(permission)}
                              onChange={(e) => handlePermissionChange(section, permission, e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditAssistantModal;
