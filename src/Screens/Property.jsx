import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, NavLink,Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useTheme} from "@mui/material/styles";
import useAuth from '../utils/useAuth'
import isSuperAdmin from '../utils/isSuperAdmin'
const linkStyle = {
  marginTop:12,
  textDecoration:'none',
  color:'black',
}
function Property() {
  const [value, setValue] = React.useState(window.location.pathname);
  const theme = useTheme()
  const {level} = useAuth()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%",ml:5,mt:1}}>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          height: "60px",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          position: "fixed",
          zIndex: "100",
          overflowX: "auto",
          background: "rgba(255, 255,255, 0.9)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          // centered
          variant="scrollable"
          aria-label="Property info"
        >
        
             <Tab
            label="unapproved"
            value="/property"
            to="/property"
            component = {Link}
          />
         
         <Tab
            label="Approved"
            to="/property/approved"
            value="/property/approved"
            component = {Link}
          />
         {/* </NavLink> */}
       
         <Tab
            label="Categories"
            disabled ={isSuperAdmin(level)?false:true}
            to="/property/categories"
            component = {Link}
          />
         
       
         <Tab
            disabled ={isSuperAdmin(level)?false:true}
            label="Forms"
            to="/property/form"
            value="/property/form"
            component = {Link}
          />
         
      
          <Tab
            label="Archive"
            value="/property/archive"
            to="/property/archive"
            component = {Link}
            disabled ={isSuperAdmin(level)?false:true}

          />
          
     
          <Tab
            label="Post"
            icon={<AddIcon />}
            iconPosition="start"
            to="/property/post"
            value="/property/post"
            component = {Link}
          />
          
        </Tabs>
      </Box>
      <Toolbar />
      <Outlet />
    </Box>
  );
}

export default Property;
