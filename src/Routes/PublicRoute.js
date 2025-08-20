import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoggedInStatus } from '../redux/user/user-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

export default function PublicRoute({ children }) {
  const filterValue = useSelector(getFilter);
  const navigator = filterValue
    ? `/contacts?filter=${filterValue}`
    : '/contacts';
  const isLoggedIn = useSelector(getLoggedInStatus);

  return isLoggedIn ? <Navigate to={navigator} /> : children;
}
