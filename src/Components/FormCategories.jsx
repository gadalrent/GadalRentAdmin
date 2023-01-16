import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DraftsIcon from "@mui/icons-material/Drafts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import { Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Axios from "axios";
import { api } from "../Private/api";
import * as Yup from "yup";

function FormCategories(props) {
  const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  useEffect(() => {
    catData();
  }, []);

  const catData = async () => {
    const res = Axios.get(`${api.baseUrl}/cat/${props.service}`)
      .then((res) => setCats(res.data))
      .catch((err) => console.log(err));
  };
  const subCatData = async (data) => {
    setSubCats(
      cats.filter((subCat) => {
        return subCat._id == data;
      })
    );
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(" required"),
  });
  const [opencat, setOpencat] = React.useState(false);
  const handleOpenCat = () => setOpencat(true);
  const handleCloseCat = () => setOpencat(false);
  const [opensub, setOpensub] = React.useState(false);
  const handleOpenSub = () => setOpensub(true);
  const handleCloseSub = () => setOpensub(false);
  const [selectedL, setSelectedL] = React.useState();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <h2>Categories</h2>
          <Paper
            sx={{
              p: 3,
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
            }}
            elevation={0}
            className="drop-shadow-sm "
          >
            <nav aria-label="main mailbox folders">
              <List>
                {cats.map((cat) => (
                  <ListItem key={cat._id}>
                    <ListItemButton
                      selected={cat._id === selectedL}
                      onClick={() => {
                        subCatData(cat._id);
                        setSelectedL(cat._id);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={cat.name} src={cat.img} />
                      </ListItemAvatar>

                      <ListItemText primary={cat.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Paper>
        </Grid>
        {!selectedL ? (
          <p>Select Category</p>
        ) : (
          <Grid item xs={12} md={4} lg={6}>
            <h2>Sub Categories</h2>
            <Paper
              sx={{
                p: 3,
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
              }}
              elevation={0}
              className="drop-shadow-sm "
            >
              <nav aria-label="main mailbox folders">
                <List>
                  {subCats.map((cat) =>
                    cat.subCat.map((subs) => (
                      <ListItem key={subs._id}>
                        <Link to={`/${props.service}/form/${subs._id}`}>
                          <ListItemButton>
                            {/* <ListItemAvatar>
                            <Avatar alt={subs.sub_img} src={subs.sub_img} />
                          </ListItemAvatar> */}

                            <ListItemText primary={subs.sub_title} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))
                  )}
                </List>
              </nav>
            </Paper>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default FormCategories;
