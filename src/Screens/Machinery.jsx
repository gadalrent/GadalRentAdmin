import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet,Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useAuth from "../utils/useAuth";
import isSuperAdmin from '../utils/isSuperAdmin'
function Machinery() {
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
          aria-label="machinery info"
        >
          <Tab
            label="unapproved"
            component={Link}
            to="/machinery"
            value="/machinery"
          />
          <Tab
            label="Approved"
            component={Link}
            to="/machinery/approved"
            value="/machinery/approved"
          />
          <Tab
            label="Categories"
            component={Link}
            to="/machinery/categories"
            value="/machinery/categories"
            disabled ={isSuperAdmin(level)?false:true}
          />
          <Tab
            label="Forms"
            component={Link}
            to="/machinery/form"
            value="/machinery/form"
            disabled ={isSuperAdmin(level)?false:true}
          />
          <Tab
            label="Archive"
            component={Link}
            to="/machinery/archive"
            value="/machinery/archive"
            disabled ={isSuperAdmin(level)?false:true}
          />
          <Tab
            label="Post"
            icon={<AddIcon />}
            iconPosition="start"
            component={Link}
            to="/machinery/post"
            value="/machinery/post"
          />
        </Tabs>
      </Box>
      <Toolbar />
      <Outlet />
    </Box>
  );
}

export default Machinery;
