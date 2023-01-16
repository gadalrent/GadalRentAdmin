import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MainListItem from "./Components/listItems";
import DashobardDetail from "./Screens/DashobardDetail";
import Copyright from "./Components/Copyright";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import SignIn from "./Pages/Signin";
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
import Signin from "./Pages/Signin";
import UserChat from "./Pages/Message/userChat";
import ProptectedRoutes from "./ProtectedRoutes";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeInfo from "./Pages/WebInfo/HomeInfo";
import BankInfo from "./Pages/WebInfo/BankInfo";
import AboutUsInfo from "./Pages/WebInfo/AboutUsInfo";
import GetEstimationInfo from "./Pages/WebInfo/GetEstimationInfo";
import PEdit from "./Pages/Property/PEdit";
import EstimationEdit from "./Pages/Property/EstimationEdit";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F38B35",
    },
    light: {
      main: "#FFFFFF",
      light: "#f38b35",
      dark: "#FFFFFF",
      contrastText: "#2b2b2b",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
    custom: {
      light: "#ffa726",
      main: "#f57c00",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    contrastThreshold: 3,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#ffffff",
            width: "6px",
            height: "6px",
            zIndex: "1110",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#8c8c8c",
            minHeight: 24,
            width: "1px",
            border: "1px solid transparent",
            zIndex: "1110",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    !user && setUser(localStorage.getItem("img"));
  }, [user]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="App">
        <div className="flex">
          <AppBar
            position="fixed"
            color="light"
            sx={{
              background: "rgba(255, 255,255, 0.9)",
              backdropFilter: "blur(5px)",
            }}
            elevation={0}
            open={open}
          >
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Gadal Rent
              </Typography>
              {localStorage.getItem("token") ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload(false);
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button color="inherit">Login</Button>
              )}
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="light">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List component="nav">
              <MainListItem /> <Divider sx={{ my: 1 }} />
              {/* {secondaryListItems} */}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Router>
              <Routes>
                <Route element={<ProptectedRoutes />}>
                  <Route path="/" element={<DashobardDetail />} />
                  <Route path="/Property" element={<Property />}>
                    <Route path="" element={<PunApproved />} />
                    <Route path="approved" element={<Papproved />} />
                    <Route path="categories" element={<Pcategories />} />
                    <Route path="form" element={<Pform />}></Route>
                    <Route path="form/:subId" element={<PformList />} />
                    <Route path="archive" element={<Parchive />} />
                    <Route path="post" element={<Ppost />} />
                  </Route>

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
                  <Route path="/estimation/:id" element={<EstimationEdit />} />
                  <Route path="/machinery/:id" element={<PEdit />} />
                  <Route path="/vehicle/:id" element={<PEdit />} />
                  <Route path="/Property/:id" element={<PEdit />} />
                  <Route path="*" element={<DashobardDetail />} />
                </Route>
                <Route element={<Signin />} path="/login" />
              </Routes>
            </Router>
            <Copyright />
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
