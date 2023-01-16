import { useContext } from "react";
import AuthContext from '../Private/AuthProvider'
const useAuth = () => {
    return useContext(AuthContext)
  };
export default useAuth  