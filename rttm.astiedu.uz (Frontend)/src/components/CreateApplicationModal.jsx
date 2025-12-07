import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import { API_URL } from '../config/api';
import 'react-toastify/dist/ReactToastify.css';

function CreateApplicationModal({ isOpen, onClose, onSuccess }) {
  const [departments, setDepartments] = useState([]);
  const [newApplication, setNewApplication] = useState({
    title: "",
    description: "",
    departmentId: ""
  });

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

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
      toast.error("Bo'limlarni yuklashda xatolik yuz berdi");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/application`, newApplication, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("Yangi ariza:", response.data);
      toast.success("Ariza muvaffaqiyatli yaratildi");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Arizani yaratishda xatolik:", error);
      toast.error("Arizani yaratishda xatolik yuz berdi");
    }
  };

  const handleClose = () => {
    setNewApplication({
      title: "",
      description: "",
      departmentId: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Yangi ariza yaratish</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sarlavha
            </label>
            <input
              type="text"
              name="title"
              value={newApplication.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Ariza sarlavhasini kiriting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tavsif
            </label>
            <textarea
              name="description"
              value={newApplication.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              rows="4"
              placeholder="Ariza tafsilotlarini kiriting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bo'lim
            </label>
            <select
              name="departmentId"
              value={newApplication.departmentId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Tanlang</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Yaratish
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default CreateApplicationModal;
