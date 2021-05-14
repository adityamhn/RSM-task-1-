import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector } from 'react-redux'
import { useRoutes, Navigate } from 'react-router-dom';



import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  const user = useSelector(state => state.user.value)

  const homeRoutes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/resetPassword/:token/:userId', element: <ResetPassword /> },

  ]

  const loginRoutes = [
    { path: '/dashboard', element: user ? <Dashboard /> : <Navigate to="/" /> },
    { path: '/', element: user ? <Dashboard /> : <Navigate to="/" /> },
    { path: '*', element: <Navigate to="/" /> },
  ]

  const homeRouting = useRoutes(homeRoutes)
  const loginRouting = useRoutes(loginRoutes);


  return (
    <>
      {user ? <>{loginRouting}</> : <>{homeRouting}</>}
    </>
  );
}

export default App;
