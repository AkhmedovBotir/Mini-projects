import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
// import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import Employees from './pages/Employees';
import Services from './pages/Services';
import Applications from './pages/Applications';
import Reports from './pages/Reports';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Helmet defaultTitle="Admin Panel" titleTemplate="%s | Admin Panel">
        <meta name="description" content="Admin Panel - Arizalarni boshqarish tizimi" />
      </Helmet>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Registratsiya route
        <Route path="/register" element={<Register />} /> */}

        {/* Dashboard route (himoyalangan) */}
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        {/* Departments route (himoyalangan) */}
        <Route path="/departments" element={
          <PrivateRoute>
            <Departments />
          </PrivateRoute>
        } />

        {/* Employees route (himoyalangan) */}
        <Route path="/employees" element={
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        } />

        {/* Services route (himoyalangan) */}
        <Route path="/services" element={
          <PrivateRoute>
            <Services />
          </PrivateRoute>
        } />

        {/* Applications route (himoyalangan) */}
        <Route path="/applications" element={
          <PrivateRoute>
            <Applications />
          </PrivateRoute>
        } />

        {/* Reports routes (himoyalangan) */}
        <Route path="/reports" element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        } />
        {/* 404 sahifasi */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
