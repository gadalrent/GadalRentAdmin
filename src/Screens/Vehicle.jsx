import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {Link} from 'react-router-dom'
import useAuth from "../utils/useAuth";
import isSuperAdmin from '../utils/isSuperAdmin'
function Vehicle() {
  const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const {level} = useAuth()
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
          aria-label="vehicle info"
        >
          <Tab
            label="unapproved"
            component={Link}
            to="/vehicle"
            value="/vehicle"
          />
          <Tab
            label="Approved"
            component={Link}
            to="/vehicle/approved"
            value="/vehicle/approved"
          />
          <Tab
            label="Categories"
            component={Link}
            to="/vehicle/categories"
            value="/vehicle/categories"
            disabled ={isSuperAdmin(level)?false:true}
          />
          <Tab
            label="Forms"
            component={Link}
            to="/vehicle/form"
            value="/vehicle/form"
            disabled ={isSuperAdmin(level)?false:true}
          />
          <Tab
            label="Archive"
            component={Link}
            to="/vehicle/archive"
            value="/vehicle/archive"
            disabled ={isSuperAdmin(level)?false:true}
          />
          <Tab
            label="Post"
            icon={<AddIcon />}
            iconPosition="start"
            component={Link}
            to="/vehicle/post"
            value="/vehicle/post"
          />
        </Tabs>
      </Box>
      <Toolbar />
      <Outlet />
    </Box>
  );
}

export default Vehicle;
