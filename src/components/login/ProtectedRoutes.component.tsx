import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
let protectRouting = false
const useAuth = () => {
  const cookies = new Cookies();

  if (cookies.get("userId")) {
    protectRouting = true
  }

  const user = { loggedIn: protectRouting };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
