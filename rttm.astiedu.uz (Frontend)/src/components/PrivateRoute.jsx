import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import TopNav from './dashboard/TopNav';

const PrivateRoute = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col overflow-hidden ${isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300 ease-in-out bg-gray-100`}>
        <TopNav onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PrivateRoute;
