import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config/api';
import axios from 'axios';

function EditApplicationModal({ isOpen, onClose, onSuccess, applicationId }) {
  const [departments, setDepartments] = useState([]);
  const [application, setApplication] = useState({
    title: "",
    description: "",
    departmentId: ""
  });

  useEffect(() => {
    if (isOpen && applicationId) {
      fetchApplication();
      fetchDepartments();
    }
  }, [isOpen, applicationId]);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/application/${applicationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = response.data;
      setApplication({
        title: data.title,
        description: data.description,
        departmentId: data.department
      });
    } catch (error) {
      console.error("Arizani yuklashda xatolik:", error);
      toast.error("Arizani yuklashda xatolik yuz berdi");
      onClose();
    }
  };

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
    setApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/application/${applicationId}`, {
        title: application.title,
        description: application.description,
        departmentId: Number(application.departmentId)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success("Ariza muvaffaqiyatli yangilandi");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Arizani yangilashda xatolik:", error);
      toast.error("Arizani yangilashda xatolik yuz berdi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Arizani tahrirlash</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sarlavha
            </label>
            <input
              type="text"
              name="title"
              value={application.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tavsif
            </label>
            <textarea
              name="description"
              value={application.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bo'lim
            </label>
            <select
              name="departmentId"
              value={application.departmentId}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Bo'limni tanlang</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplicationModal;
