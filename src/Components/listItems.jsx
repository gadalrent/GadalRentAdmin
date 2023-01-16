import React, { useState, useEffect, useCallback } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EmailIcon from "@mui/icons-material/Email";
import AppsIcon from "@mui/icons-material/Apps";
import PeopleIcon from "@mui/icons-material/People";
import Axios from "axios";
import { api } from "../Private/api";
import Badge from "@mui/material/Badge";
import Machinery from "../Screens/Machinery";

function Categories(props) {
  const [products, setProducts] = useState();
  const [pproduct, setPproduct] = useState();
  const [mproduct, setMproduct] = useState();
  const [vproduct, setVproduct] = useState();

  //Load Data
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = Axios.get(`${api.baseUrl}/admin/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  //Filter Data

  useEffect(() => {
    products && filterProduct();
  }, [products]);

  const filterProduct = () => {
    const property = products.filter((each) => {
      return (
        each.service === "62dfac51713951211b7f1c56" && each.isApproved === false
      );
    });
    setPproduct(property);
    const machinery = products.filter((each) => {
      return (
        each.service === "62e21df789b2c9b017502a90" && each.isApproved === false
      );
    });
    setMproduct(machinery);
    const vehicle = products.filter((each) => {
      return (
        each.service === "62e22bf69ec6a56974a96ea8" && each.isApproved === false
      );
    });
    setVproduct(vehicle);
  };
  return (
    <React.Fragment>
      <ListItemButton
        selected={window.location.pathname === "/" ? true : false}
        to="/"
      >
        <ListItemIcon>
          <DashboardIcon
            color={window.location.pathname === "/" ? "primary" : ""}
          />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        selected={window.location.pathname.includes("/property") ? true : false}
        to="/property"
      >
        <ListItemIcon>
          {pproduct && pproduct.length !== 0 ? (
            <Badge badgeContent={pproduct.length}>
              <ApartmentIcon
                color={
                  window.location.pathname.includes("/property")
                    ? "primary"
                    : ""
                }
              />
            </Badge>
          ) : (
            <ApartmentIcon
              color={
                window.location.pathname.includes("/property") ? "primary" : ""
              }
            />
          )}
        </ListItemIcon>
        <ListItemText primary="Property" />
      </ListItemButton>
      <ListItemButton
        selected={
          window.location.pathname.includes("/machinery") ? true : false
        }
        to="/machinery"
      >
        <ListItemIcon>
          {mproduct && mproduct.length !== 0 ? (
            <Badge badgeContent={mproduct.length}>
              <PrecisionManufacturingIcon
                color={
                  window.location.pathname.includes("/machinery")
                    ? "primary"
                    : ""
                }
              />
            </Badge>
          ) : (
            <PrecisionManufacturingIcon
              color={
                window.location.pathname.includes("/machinery") ? "primary" : ""
              }
            />
          )}
        </ListItemIcon>
        <ListItemText primary="Machinery" />
      </ListItemButton>
      <ListItemButton
        selected={window.location.pathname.includes("/vehicle") ? true : false}
        to="/vehicle"
      >
        <ListItemIcon>
          {vproduct && vproduct.length !== 0 ? (
            <Badge badgeContent={vproduct.length}>
              <DriveEtaIcon
                color={
                  window.location.pathname.includes("/vehicle") ? "primary" : ""
                }
              />
            </Badge>
          ) : (
            <DriveEtaIcon
              color={
                window.location.pathname.includes("/vehicle") ? "primary" : ""
              }
            />
          )}
        </ListItemIcon>
        <ListItemText primary="Vehicle" />
      </ListItemButton>
      <ListItemButton
        selected={window.location.pathname.includes("/message") ? true : false}
        to="/message"
      >
        <ListItemIcon>
          <EmailIcon
            color={
              window.location.pathname.includes("/message") ? "primary" : ""
            }
          />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItemButton>
      <ListItemButton
        selected={window.location.pathname.includes("/user") ? true : false}
        to="/user"
      >
        <ListItemIcon>
          <PeopleIcon
            color={window.location.pathname.includes("/user") ? "primary" : ""}
          />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
      {/* <ListItemButton
      selected={window.location.pathname.includes("/admins") ? true : false}
      to="admins"
    >
      <ListItemIcon>
        <AdminPanelSettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Admins" />
    </ListItemButton> */}

      <ListItemButton
        selected={window.location.pathname.includes("/webinfo") ? true : false}
        to="/webinfo"
      >
        <ListItemIcon>
          <AppsIcon
            color={
              window.location.pathname.includes("/webinfo") ? "primary" : ""
            }
          />
        </ListItemIcon>
        <ListItemText primary="Web Info" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default Categories;
