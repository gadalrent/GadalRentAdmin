import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDropzone } from "react-dropzone";
import { Outlet,Link} from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function WebInfo() {
  const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Home" component={Link} to="/webinfo" value="/webinfo" />
          <Tab
            label="Get Estimation"
            component={Link}
            to="/webinfo/estimation"
            value="/webinfo/estimation"
          />
          <Tab
            label="About Us"
            component={Link}
            to="/webinfo/aboutus"
            value="/webinfo/aboutus"
          />
          <Tab
            label="Bank info"
            component={Link}
            to="/webinfo/bank"
            value="/webinfo/bank"
          />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
}

export default WebInfo;
