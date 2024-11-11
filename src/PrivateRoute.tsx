import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from './context/UserContext';

const PrivateRoute = () => {
  const { isLogged } = useContext(UserContext);
  return isLogged ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute