import { createContext,useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth,setAuth] = useState(sessionStorage.getItem('access-token'))
  const [username,setUsername] = useState(sessionStorage.getItem('username'))
  const [level,setLevel] = useState(sessionStorage.getItem('access-level'))
  const [user_id,setId] = useState(sessionStorage.getItem('user-id'))
  const handleLogout = ()=>{
    sessionStorage.setItem('access-token','')
  }

  const handleLogin = (token)=>{
    sessionStorage.setItem('access-token',token)
    setAuth(sessionStorage.getItem('access-token'))
  }
  const handleUserName = (username)=>{
    sessionStorage.setItem('username',username)
    setUsername(sessionStorage.getItem('username'))
  }
  const handleLevel = (level)=>{
    sessionStorage.setItem('access-level',level)
    setLevel(sessionStorage.getItem('access-level'))
  }
  const handleId = (id)=>{
    sessionStorage.setItem('user-id',id)
    setId(sessionStorage.getItem('user-id'))
  }
  // const username = sessionStorage.getItem('username')
  // const level = sessionStorage.getItem('access-level')
  // const auth = sessionStorage.getItem('access-token')
  // const user_id = sessionStorage.getItem('user-id')
  const value = {
    username,
    handleUserName,
    level,
    handleLevel,
    auth,
    user_id,
    handleLogin,
    handleLogout,
    handleId,
  }
  console.log(value)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
