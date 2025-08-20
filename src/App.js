import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainPage from './views/MainPage';
import Login from './views/Login';
import Register from './views/Register';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/user/user-actions';
import { getRefreshingUserStatus } from './redux/user/user-selectors';

function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(getRefreshingUserStatus);

  useEffect(() => {
    dispatch(refreshUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer />
      {!isRefreshingUser && (
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
