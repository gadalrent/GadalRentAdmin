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
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams,
} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";
import { api } from "../Private/api";
import * as Yup from "yup";

function FormDropDown() {
  const [drops, setDrops] = useState([]);
  const [doptions, setDoptions] = useState([]);
  const [multis, setMultis] = useState([]);
  const [fields, setFields] = useState([]);
  const [moptions, setMoptions] = useState([]);
  let { subId } = useParams();
  useEffect(() => {
    formDatas();
  }, []);

  const formDatas = async () => {
    const res = Axios.get(`${api.baseUrl}/form/${subId}`)
      .then((res) => dispatcher(res.data))
      .catch((err) => console.log(err));
  };
  const dispatcher = async (data) => {
    setDrops(data["dropDowns"]);
    setMultis(data["multiSelect"]);
    setFields(data["fields"]);
  };
  const subdropData = async (data) => {
    setDoptions(
      drops.filter((drop) => {
        return drop._id === data;
      })
    );
  };
  const singleData = async (data) => {
    setMoptions(
      multis.filter((drop) => {
        return drop._id === data;
      })
    );
  };
  const postDrop = (e) => {
    console.log(e.title);
    Axios.post(`${api.baseUrl}/form/drop/${subId}`, {
      dtitle: e.title,
    })
      .then((res) => formDatas())
      .catch((err) => console.log(err));
    handleCloseDrop();
  };
  const postMultis = (e) => {
    Axios.post(`${api.baseUrl}/form/multi/${subId}`, {
      mtitle: e.title,
    })
      .then((res) => {
        formDatas();
        console.log(res.data);
        handleCloseMulti();
      })
      .catch((err) => console.log(err));
    handleCloseDrop();
  };
  const postSub = (e) => {
    Axios.patch(`${api.baseUrl}/form/drop/${doptions[0]._id}`, {
      doptions: e.title,
    })
      .then((res) => formDatas())
      .catch((err) => console.log(err));
    handleCloseSub();
  };
  const postSingle = (e) => {
    Axios.patch(`${api.baseUrl}/form/multi/${moptions[0]._id}`, {
      moptions: e.title,
    })
      .then((res) => {
        console.log(res.data);
        formDatas();
        handleCloseSingle();
      })
      .catch((err) => console.log(err));
    handleCloseSub();
  };
  const postField = (e) => {
    Axios.post(`${api.baseUrl}/form/field/${subId}`, {
      ftitle: e.title,
    })
      .then((res) => {
        formDatas();

        handleCloseField();
      })
      .catch((err) => console.log(err));
    handleCloseDrop();
  };
  const deldrop = (e) => {
    console.log(e);
    Axios.delete(`${api.baseUrl}/form/drop/${e}`)
      .then((res) => formDatas())
      .catch((err) => console.log(err));
  };
  const delsingle = (e) => {
    Axios.delete(`${api.baseUrl}/form/multi/${e}`)
      .then((res) => formDatas())
      .catch((err) => console.log(err));
  };
  const delField = (e) => {
    Axios.delete(`${api.baseUrl}/form/field/${e}`)
      .then((res) => formDatas())
      .catch((err) => console.log(err));
  };
  const deloption = (e, name) => {
    Axios.delete(`${api.baseUrl}/form/drop/${e}/${name}`)
      .then((res) => formDatas())
      .catch((err) => console.log(err));
  };
  const delselection = (e, name) => {
    Axios.delete(`${api.baseUrl}/form/multi/${e}/${name}`)
      .then((res) => formDatas())
      .catch((err) => console.log(err));
  };
  const validationSchema = Yup.object({
    title: Yup.string().required(" required"),
  });
  const [openDrop, setOpenDrop] = React.useState(false);
  const handleOpenDrop = () => setOpenDrop(true);
  const handleCloseDrop = () => setOpenDrop(false);
  const [opensub, setOpensub] = React.useState(false);
  const handleOpenSub = () => setOpensub(true);
  const handleCloseSub = () => setOpensub(false);
  const [openMulti, setOpenMulti] = React.useState(false);
  const handleOpenMulti = () => setOpenMulti(true);
  const handleCloseMulti = () => setOpenMulti(false);

  const [openSingle, setOpenSingle] = React.useState(false);
  const handleOpenSingle = () => setOpenSingle(true);
  const handleCloseSingle = () => setOpenSingle(false);
  const [dropId, setDropId] = React.useState("");
  const [singleId, setSingleId] = React.useState("");
  const [selectedL, setSelectedL] = React.useState();
  const [selectedM, setSelectedM] = React.useState();
  const [openField, setOpenField] = React.useState(false);
  const handleOpenField = () => setOpenField(true);
  const handleCloseField = () => setOpenField(false);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Button
            variant="outlined"
            onClick={handleOpenDrop}
            startIcon={<AddIcon />}
          >
            Add Drop Down
          </Button>
          <Formik
            initialValues={{ title: "" }}
            onSubmit={(values, { resetForm }) => {
              postDrop(values);
              resetForm({ values: "" });
            }}
            validationSchema={validationSchema}
          >
            {(prop) => (
              <Form onSubmit={prop.handleSubmit}>
                <Dialog
                  fullWidth={true}
                  open={openDrop}
                  onClose={handleCloseDrop}
                >
                  <DialogTitle>Create DropDown</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      id="title"
                      label="Title"
                      onChange={prop.handleChange}
                      defaultValue={prop.values.title}
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="primary" onClick={handleCloseDrop}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={prop.handleSubmit}
                      type="submit"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Form>
            )}
          </Formik>
          <Paper
            sx={{
              p: 3,
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
            }}
            elevation={0}
            className="drop-shadow-sm"
          >
            <nav aria-label="main mailbox folders">
              <List>
                {drops.map((drop) => (
                  <ListItem key={drop._id}>
                    <ListItemButton
                      selected={drop._id === selectedL}
                      onClick={() => {
                        subdropData(drop._id);
                        setDropId(drop._id);
                        setSelectedL(drop._id);
                      }}
                    >
                      <ListItemText primary={drop.dtitle} />
                      {/* <IconButton edge="end" aria-label="delete">
                        <EditIcon sx={{ mx: 1 }} />
                      </IconButton> */}
                      <IconButton
                        onClick={() => deldrop(drop._id)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon sx={{ mx: 1 }} />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Paper>
        </Grid>
        {!selectedL ? (
          <p>Select Dropdown title</p>
        ) : (
          <Grid item xs={12} md={4} lg={6}>
            <Button
              variant="outlined"
              onClick={handleOpenSub}
              startIcon={<AddIcon />}
            >
              Add Options
            </Button>
            <Formik
              initialValues={{ title: "" }}
              onSubmit={(values) => {
                postSub(values);
              }}
              validationSchema={validationSchema}
            >
              {(prop) => (
                <Form onSubmit={prop.handleSubmit}>
                  <Dialog
                    fullWidth={true}
                    open={opensub}
                    onClose={handleCloseSub}
                  >
                    <DialogTitle>Create options</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        id="title"
                        label="Title"
                        onChange={prop.handleChange}
                        defaultValue={prop.values.title}
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button variant="primary" onClick={handleCloseSub}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={prop.handleSubmit}
                        type="submit"
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Form>
              )}
            </Formik>
            <Paper
              sx={{
                p: 3,
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
              }}
              elevation={0}
              className="drop-shadow-sm"
            >
              <nav aria-label="main mailbox folders">
                <List>
                  {doptions.map((drop) =>
                    drop.doptions.map((option, index) => (
                      <ListItem key={index}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt={option} src={option.sub_img} />
                          </ListItemAvatar>

                          <ListItemText primary={option} />
                          {/* <IconButton edge="end" aria-label="delete">
                          <EditIcon sx={{ mx: 1 }} />
                        </IconButton> */}
                          <IconButton
                            onClick={() => deloption(dropId, option)}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon sx={{ mx: 1 }} />
                          </IconButton>
                        </ListItemButton>
                      </ListItem>
                    ))
                  )}
                </List>
              </nav>
            </Paper>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Button
            variant="outlined"
            onClick={handleOpenMulti}
            startIcon={<AddIcon />}
          >
            Add Multi Selection
          </Button>
          <Formik
            initialValues={{ title: "" }}
            onSubmit={(values, { resetForm }) => {
              postMultis(values);
              resetForm({ values: "" });
            }}
            validationSchema={validationSchema}
          >
            {(prop) => (
              <Form onSubmit={prop.handleSubmit}>
                <Dialog
                  fullWidth={true}
                  open={openMulti}
                  onClose={handleCloseMulti}
                >
                  <DialogTitle>Create Multi Selections</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      id="title"
                      label="Title"
                      onChange={prop.handleChange}
                      defaultValue={prop.values.title}
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="primary" onClick={handleCloseMulti}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={prop.handleSubmit}
                      type="submit"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Form>
            )}
          </Formik>
          <Paper
            sx={{
              p: 3,
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
            }}
            elevation={0}
            className="drop-shadow-sm"
          >
            <nav aria-label="main mailbox folders">
              <List>
                {multis.map((single) => (
                  <ListItem key={single._id}>
                    <ListItemButton
                      onClick={() => {
                        singleData(single._id);
                        setSingleId(single._id);
                        setSelectedM(single._id);
                      }}
                    >
                      <ListItemText primary={single.mtitle} />
                      {/* <IconButton edge="end" aria-label="delete">
                        <EditIcon sx={{ mx: 1 }} />
                      </IconButton> */}
                      <IconButton
                        selected={single._id === selectedM}
                        onClick={() => {
                          delsingle(single._id);
                          setSelectedM(single._id);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon sx={{ mx: 1 }} />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Paper>
        </Grid>
        {!selectedM ? (
          <p>Select Multiselection title</p>
        ) : (
          <Grid item xs={12} md={4} lg={6}>
            <Button
              variant="outlined"
              onClick={handleOpenSingle}
              startIcon={<AddIcon />}
            >
              Add Selection lists
            </Button>
            <Formik
              initialValues={{ title: "" }}
              onSubmit={(values, { resetForm }) => {
                postSingle(values);
                resetForm({ values: "" });
              }}
              validationSchema={validationSchema}
            >
              {(prop) => (
                <Form onSubmit={prop.handleSubmit}>
                  <Dialog
                    fullWidth={true}
                    open={openSingle}
                    onClose={handleCloseSingle}
                  >
                    <DialogTitle>Create Selection lists</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        id="title"
                        label="Title"
                        onChange={prop.handleChange}
                        defaultValue={prop.values.title}
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button variant="primary" onClick={handleCloseSingle}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={prop.handleSubmit}
                        type="submit"
                      >
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Form>
              )}
            </Formik>
            <Paper
              sx={{
                p: 3,
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
              }}
              elevation={0}
              className="drop-shadow-sm"
            >
              <nav aria-label="main mailbox folders">
                <List>
                  {moptions.map((single) =>
                    single.moptions.map((option, index) => (
                      <ListItem key={index}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt={option} src={option.sub_img} />
                          </ListItemAvatar>

                          <ListItemText primary={option} />
                          {/* <IconButton edge="end" aria-label="delete">
                          <EditIcon sx={{ mx: 1 }} />
                        </IconButton> */}
                          <IconButton
                            onClick={() => delselection(singleId, option)}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon sx={{ mx: 1 }} />
                          </IconButton>
                        </ListItemButton>
                      </ListItem>
                    ))
                  )}
                </List>
              </nav>
            </Paper>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Button
            variant="outlined"
            onClick={handleOpenField}
            startIcon={<AddIcon />}
          >
            Add Text Field
          </Button>
          <Formik
            initialValues={{ title: "" }}
            onSubmit={(values, { resetForm }) => {
              postField(values);
              resetForm({ values: "" });
            }}
            validationSchema={validationSchema}
          >
            {(prop) => (
              <Form onSubmit={prop.handleSubmit}>
                <Dialog
                  fullWidth={true}
                  open={openField}
                  onClose={handleCloseField}
                >
                  <DialogTitle>Create Text Field </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      id="title"
                      label="Title"
                      onChange={prop.handleChange}
                      defaultValue={prop.values.title}
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="primary" onClick={handleCloseField}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={prop.handleSubmit}
                      type="submit"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Form>
            )}
          </Formik>
          <Paper
            sx={{
              p: 3,
              maxWidth: 360,
              display: "flex",
              flexDirection: "column",
            }}
            elevation={0}
            className="drop-shadow-sm"
          >
            <nav aria-label="main mailbox folders">
              <List>
                {fields.map((single) => (
                  <ListItem key={single._id}>
                    <ListItemText primary={single.ftitle} />
                    {/* <IconButton edge="end" aria-label="delete">
                        <EditIcon sx={{ mx: 1 }} />
                      </IconButton> */}
                    <IconButton
                      onClick={() => {
                        delField(single._id);
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon sx={{ mx: 1 }} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FormDropDown;
