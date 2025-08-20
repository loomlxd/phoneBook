import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoggedInStatus } from '../redux/user/user-selectors';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(getLoggedInStatus);
  return isLoggedIn ? children : <Navigate to={'/login'} />;
}
