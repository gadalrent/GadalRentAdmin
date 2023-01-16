import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function Message() {
  const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh",ml:5,mt:1 }}>
      {/* <Box
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
          aria-label="Message info"
        >
          <Tab
            label="User Chat"
            component="a"
            href="/message"
            value="/message"
          />
          <Tab
            label="Approved"
            component="a"
            href="/message/admin"
            value="/message/admin"
          />
        </Tabs>
      </Box>
      <Toolbar /> */}
      <Outlet />
    </Box>
  );
}

export default Message;
