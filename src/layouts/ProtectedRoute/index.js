import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('jwt');
  return token ? <Outlet /> : <Navigate to="/requireLogin" />;
};

export default ProtectedRoute