import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { API_URL } from '../config/api';

function EditReportModal({ isOpen, onClose, onSuccess, reportId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    if (isOpen && reportId) {
      fetchEmployees();
    }
  }, [isOpen, reportId]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/employee/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Xodimlarni yuklashda xatolik:", error);
      toast.error("Xodimlarni yuklashda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/completedWork/${reportId}/employee`, {
        employeeId: Number(selectedEmployee)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success("Hisobot muvaffaqiyatli yangilandi");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Hisobotni yangilashda xatolik:", error);
      toast.error("Hisobotni yangilashda xatolik yuz berdi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Hisobotni tahrirlash</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Xodim
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Xodimni tanlang</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
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

export default EditReportModal;
