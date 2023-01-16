import * as  React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Property from "./Screens/Property";
import Vehicle from "./Screens/Vehicle";
import Machinery from "./Screens/Machinery";
import Message from "./Screens/Message";
import User from "./Screens/User";
import Admins from "./Screens/Admins";
import WebInfo from "./Screens/WebInfo";
import Papproved from "./Pages/Property/Papproved";
import PunApproved from "./Pages/Property/PunApproved";
import Pcategories from "./Pages/Property/Pcategories";
import Pform from "./Pages/Property/Pform";
import Parchive from "./Pages/Property/Parchive";
import Ppost from "./Pages/Property/Ppost";
import PformList from "./Pages/Property/PformList";
import MunApproved from "./Pages/Machinery/MunApproved";
import Mapproved from "./Pages/Machinery/Mapproved";
import Mcategories from "./Pages/Machinery/Mcategories";
import MformList from "./Pages/Machinery/MformList";
import Marchive from "./Pages/Machinery/Marchive";
import Mpost from "./Pages/Machinery/Mpost";
import Mform from "./Pages/Machinery/Mform";
import VunApproved from "./Pages/Vehicle/VunApproved";
import Vapproved from "./Pages/Vehicle/Vapproved";
import Vcategories from "./Pages/Vehicle/Vcategories";
import Vform from "./Pages/Vehicle/Vform";
import VformList from "./Pages/Vehicle/VformList";
import Varchive from "./Pages/Vehicle/Varchive";
import Vpost from "./Pages/Vehicle/Vpost";
import Signin from "./Pages/AdminUsers/Signin";
import PassResetForm from './Pages/AdminUsers/resetPass'
import UserChat from "./Pages/Message/userChat";
import ProtectedRoute from "./ProtectedRoutes";
import HomeInfo from "./Pages/WebInfo/HomeInfo";
import BankInfo from "./Pages/WebInfo/BankInfo";
import AboutUsInfo from "./Pages/WebInfo/AboutUsInfo";
import GetEstimationInfo from "./Pages/WebInfo/GetEstimationInfo";
import DashobardDetail from "./Screens/DashobardDetail";
import theme from './theme'
import {AuthProvider} from './Private/AuthProvider'
import { ThemeProvider} from "@mui/material/styles";
import PEdit from "./Pages/edit";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
    <Router>
              <Routes>
                <Route element={<ProtectedRoute/>}>
                  <Route path="/" element={<App/>}>
                  <Route path="/" element={<DashobardDetail />} />
                  <Route path="/resetpass" element={<PassResetForm/>}/>
                  {/* <Route element={<ProtectedRoute/>}> */}
                  <Route path="/Property" element={<Property />}> 
                   <Route path="" element={<PunApproved />} />
                    <Route path="approved" element={<Papproved />} />
                    <Route path="categories" element={<Pcategories />} />
                    <Route path="form" element={<Pform />}></Route>
                    <Route path="form/:subId" element={<PformList />} />
                    <Route path="archive" element={<Parchive />} />
                    <Route path="post" element={<Ppost />} />
                   </Route>
                  {/* </Route> */}
                  <Route path="/Vehicle" element={<Vehicle />}>
                    <Route path="" element={<VunApproved />} />
                    <Route path="approved" element={<Vapproved />} />
                    <Route path="categories" element={<Vcategories />} />
                    <Route path="form" element={<Vform />}></Route>
                    <Route path="form/:subId" element={<VformList />} />
                    <Route path="archive" element={<Varchive />} />
                    <Route path="post" element={<Vpost />} />
                  </Route>
                  <Route path="/Machinery" element={<Machinery />}>
                    <Route path="" element={<MunApproved />} />
                    <Route path="approved" element={<Mapproved />} />
                    <Route path="categories" element={<Mcategories />} />
                    <Route path="form" element={<Mform />}></Route>
                    <Route path="form/:subId" element={<MformList />} />
                    <Route path="archive" element={<Marchive />} />
                    <Route path="post" element={<Mpost />} />
                  </Route>
                  <Route path="/Message" element={<Message />}>
                    <Route path="" element={<UserChat />} />
                  </Route>
                  <Route path="/User" element={<User />}>
                    <Route path="" element={<User />} />
                  </Route>
                  <Route path="/Admins" element={<Admins />} />
                  <Route path="/Webinfo" element={<WebInfo />}>
                    <Route path="" element={<HomeInfo />} />
                    <Route path="estimation" element={<GetEstimationInfo />} />
                    <Route path="aboutus" element={<AboutUsInfo />} />
                    <Route path="bank" element={<BankInfo />} />
                  </Route>
                  {/* <Route path="/estimation/:id" element={<EstimationEdit />} /> */}
                  <Route path="/machinery/:id" element={<PEdit />} />
                  <Route path="/vehicle/:id" element={<PEdit />} />
                  <Route path="/Property/:id" element={<PEdit />} />
                  <Route path="*" element={<DashobardDetail />} />
                  <Route element={<PassResetForm />} path="/resetpass" />
                  </Route>
                  <Route path="*" element={<DashobardDetail />} />
                </Route>  
                <Route element={<Signin />} path="/login" />
              </Routes>
            </Router>
            </AuthProvider>
    </ThemeProvider>
      
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
