import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getToken } from '../storage/sessionStorage';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();
  
  useEffect(() => {
    if (!token) {
      navigate('/auth', { state: { from: location } });
    }
  }, [navigate, token, location] );

  return <Outlet />;
};

export default PrivateRoute;