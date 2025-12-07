import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Helmet } from 'react-helmet-async';
import api from '../config/api';
import { FiUsers, FiGrid, FiBriefcase, FiFileText, FiCheckCircle } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    departments: [],
    employees: [],
    services: [],
    applications: [],
    completedWorks: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departments, employees, services, applications, completedWorks] = await Promise.all([
          api.get('/department/all'),
          api.get('/employee/all'),
          api.get('/offering/all'),
          api.get('/application/all'),
          api.get('/completedWork/all')
        ]);

        setStats({
          departments: departments.data,
          employees: employees.data,
          services: services.data,
          applications: applications.data,
          completedWorks: completedWorks.data
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  // Statistika kartlari
  const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Arizalar statusi bo'yicha diagramma
  const applicationStatusData = {
    labels: ['Yangi', 'Jarayonda', 'Bajarilgan', 'Bekor qilingan'],
    datasets: [{
      data: [
        stats.applications.filter(a => a.status === 'NEW').length,
        stats.applications.filter(a => a.status === 'IN_PROGRESS').length,
        stats.applications.filter(a => a.status === 'COMPLETED').length,
        stats.applications.filter(a => a.status === 'CANCELLED').length,
      ],
      backgroundColor: ['#4F46E5', '#F59E0B', '#10B981', '#EF4444'],
    }]
  };

  // Oxirgi 6 oyda kelib tushgan arizalar grafigi
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString('default', { month: 'short' });
  }).reverse();

  const applicationsOverTime = {
    labels: last6Months,
    datasets: [{
      label: 'Arizalar soni',
      data: last6Months.map(month => {
        return stats.applications.filter(app => {
          const appDate = new Date(app.createdAt);
          return appDate.toLocaleString('default', { month: 'short' }) === month;
        }).length;
      }),
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  // Bo'limlar bo'yicha xodimlar soni
  const employeesByDepartment = {
    labels: stats.departments.map(d => d.name),
    datasets: [{
      label: 'Xodimlar soni',
      data: stats.departments.map(dept => 
        stats.employees.filter(emp => emp.departmentId === dept.id).length
      ),
      backgroundColor: '#10B981',
    }]
  };

  // Xizmatlar bo'yicha arizalar soni
  const applicationsByService = {
    labels: stats.services.map(s => s.name),
    datasets: [{
      label: 'Arizalar soni',
      data: stats.services.map(service => 
        stats.applications.filter(app => app.serviceId === service.id).length
      ),
      backgroundColor: '#8B5CF6',
    }]
  };

  // Bajarilgan ishlar statistikasi
  const completedWorkStats = {
    labels: ['Bajarilgan', 'Bajarilmagan'],
    datasets: [{
      data: [
        stats.completedWorks.filter(w => w.status === 'COMPLETED').length,
        stats.completedWorks.filter(w => w.status !== 'COMPLETED').length,
      ],
      backgroundColor: ['#10B981', '#F59E0B'],
    }]
  };

  return (
    <div className="p-4 sm:p-6">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Admin panelga dashboard sahifasi" />
      </Helmet>
      
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Dashboard</h1>

        {/* Statistika kartlari */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Bo'limlar"
            value={stats.departments.length}
            icon={FiGrid}
            color="bg-blue-600"
            subtext="Faol bo'limlar"
          />
          <StatCard
            title="Xodimlar"
            value={stats.employees.length}
            icon={FiUsers}
            color="bg-green-600"
            subtext="Jami xodimlar"
          />
          <StatCard
            title="Xizmatlar"
            value={stats.services.length}
            icon={FiBriefcase}
            color="bg-yellow-600"
            subtext="Mavjud xizmatlar"
          />
          <StatCard
            title="Arizalar"
            value={stats.applications.length}
            icon={FiFileText}
            color="bg-purple-600"
            subtext={`${stats.applications.filter(a => a.status === 'NEW').length} ta yangi ariza`}
          />
        </div>

        {/* Grafiklar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Arizalar statistikasi</h2>
            <Doughnut 
              data={applicationStatusData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Arizalar dinamikasi</h2>
            <Line 
              data={applicationsOverTime}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Bo'limlar va xizmatlar statistikasi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Bo'limlar bo'yicha xodimlar</h2>
            <Bar 
              data={employeesByDepartment}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Xizmatlar bo'yicha arizalar</h2>
            <Bar 
              data={applicationsByService}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
