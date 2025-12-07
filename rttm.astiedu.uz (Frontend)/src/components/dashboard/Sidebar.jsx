import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  HomeIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  UsersIcon, 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline'

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation()
  const isActive = (path) => {
    return location.pathname === path
  }

  const [isOpen, setIsOpen] = useState(true);
  const userRole = localStorage.getItem('userRole');

  // Menyu elementlari
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <HomeIcon className="w-5 h-5" />,
      path: '/',
      adminOnly: true
    },
    {
      name: 'Xodimlar',
      icon: <UsersIcon className="w-5 h-5" />,
      path: '/employees',
      adminOnly: true
    },
    {
      name: "Bo'limlar",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      path: '/departments',
      adminOnly: true
    },
    {
      name: 'Xizmatlar',
      icon: <BriefcaseIcon className="w-5 h-5" />,
      path: '/services',
      adminOnly: false
    },
    {
      name: 'Arizalar',
      icon: <DocumentTextIcon className="w-5 h-5" />,
      path: '/applications',
      adminOnly: false
    },
    {
      name: 'Hisobotlar',
      icon: <ChartBarIcon className="w-5 h-5" />,
      path: '/reports',
      adminOnly: true
    },
  ];

  // Rolega qarab menyu elementlarini filtrlash
  const filteredMenuItems = menuItems.filter(item => 
    userRole === 'ADMIN' || !item.adminOnly
  );

  return (
    <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transform transition-all duration-300 ease ${isCollapsed ? 'w-12 sm:w-16' : 'w-48 sm:w-64'}`}>
      <div className={`h-14 sm:h-16 flex items-center px-2 sm:px-4 border-b ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && <div className="text-base sm:text-xl font-bold text-blue-500">ADMIN PANEL</div>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 sm:p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100">
          {isCollapsed ? <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
      <nav className="mt-2 sm:mt-4 px-1 sm:px-2">
        {filteredMenuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={`flex items-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg mb-1 ${isCollapsed ? 'justify-center' : ''} ${isActive(item.path) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <div className={`${isCollapsed ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'}`}>
              {item.icon}
            </div>
            {!isCollapsed && <span className="ml-2 sm:ml-3 text-sm sm:text-base">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
