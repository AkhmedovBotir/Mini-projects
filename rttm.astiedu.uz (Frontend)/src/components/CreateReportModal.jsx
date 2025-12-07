import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { API_URL } from '../config/api';

function CreateReportModal({ isOpen, onClose, onSuccess, applicationId }) {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchApplications();
    }
  }, [isOpen]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/application/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setApplications(response.data);
    } catch (error) {
      console.error("Arizalarni yuklashda xatolik:", error);
      toast.error("Arizalarni yuklashda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/completedWork`, {
        applicationId: Number(selectedApplication)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        toast.success("Hisobot muvaffaqiyatli yaratildi");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Hisobot yaratishda xatolik:", error);
      toast.error("Hisobot yaratishda xatolik yuz berdi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Yangi hisobot yaratish</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ariza
            </label>
            <select
              value={selectedApplication}
              onChange={(e) => setSelectedApplication(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Arizani tanlang</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.title}
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
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReportModal;
