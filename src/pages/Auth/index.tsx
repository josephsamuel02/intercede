import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import { public_routes } from '../../utils/public_routes';

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={public_routes.login.split('/auth/')[1]} replace />} />
      <Route path={public_routes.login.split('/auth/')[1]} element={<Login />} />
      <Route path={public_routes.signup.split('/auth/')[1]} element={<Signup />} />
      <Route path={public_routes.forgot_password.split('/auth/')[1]} element={<ForgotPassword />} />
      <Route path={public_routes.reset_password.split('/auth/')[1]} element={<ResetPassword />} />
    </Routes>
  );
};

export default Auth;

