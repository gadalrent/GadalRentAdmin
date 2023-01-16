import {Navigate,Outlet} from "react-router-dom";
import useAuth from './utils/useAuth'
const ProtectedRoute = () => {
  const {auth:token} = useAuth();
  // console.log(token)
  if(!Boolean(token)) {
    return  <Navigate to="/login" replace/>;
  }
  return <Outlet/>
};

export default ProtectedRoute;
