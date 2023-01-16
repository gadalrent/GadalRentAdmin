import React, { useState, useEffect, useCallback } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Axios from "axios";
import { useDropzone } from "react-dropzone";
import { api } from "../Private/api";
import * as Yup from "yup";

function Categories(props) {
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
        return subCat._id === data;
      })
    );
  };
  const editCat = (e) => {
    console.log(e.title);
    Axios.patch(`${api.baseUrl}/cat/${editId}`, {
      title: e.title,
      // name: props.service,
      // img: "",
    })
      .then((res) => {
        catData();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
    handleCloseCatEdit();
  };
  const editSub = (e) => {
    console.log(e.title);
    Axios.patch(`${api.baseUrl}/cat/sub/${editId}`, {
      title: e.title,
    })
      .then((res) => {
        catData();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
    handleCloseSubEdit();
  };
  const postCat = (e) => {
    console.log(e.title);
    Axios.post(`${api.baseUrl}/cat`, e, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        catData();
        setImgPreview(null);
        setImgFile();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
    handleCloseCat();
  };
  const postSub = (e) => {
    console.log();
    Axios.post(`${api.baseUrl}/subcat/${subCats[0]._id}`, e, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        catData();
        setImgPreview();
        setImgFile();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
    handleCloseSub();
  };
  const delCat = (e) => {
    console.log(e);
    Axios.delete(`${api.baseUrl}/cat/${e}`)
      .then((res) => {
        catData();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
  };
  const delSub = (e) => {
    console.log(e);
    Axios.delete(`${api.baseUrl}/subcat/${e}`)
      .then((res) => {
        catData();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
  };
  const validationSchema = Yup.object({
    title: Yup.string().required(" required"),
  });
  const [opencat, setOpencat] = React.useState(false);
  const handleOpenCat = () => setOpencat(true);
  const handleCloseCat = () => setOpencat(false);
  const [opencatEdit, setOpencatEdit] = React.useState(false);
  const handleOpenCatEdit = () => setOpencatEdit(true);
  const handleCloseCatEdit = () => setOpencatEdit(false);
  const [opensub, setOpensub] = React.useState(false);
  const handleOpenSub = () => setOpensub(true);
  const handleCloseSub = () => setOpensub(false);
  const [opensubEdit, setOpensubEdit] = React.useState(false);
  const handleOpenSubEdit = () => setOpensubEdit(true);
  const handleCloseSubEdit = () => setOpensubEdit(false);
  const [editValue, setEditValue] = React.useState("");
  const [editId, setEditId] = React.useState("");
  const [imgFile, setImgFile] = React.useState();
  const [ImgPreview, setImgPreview] = React.useState();
  const [selectedL, setSelectedL] = React.useState();
  const [snackopen, setSnackopen] = React.useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    setImgFile(acceptedFiles[0]);
    setImgPreview(URL.createObjectURL(acceptedFiles[0]));
    console.log(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <React.Fragment>
      <Snackbar
        autoHideDuration={2000}
        open={snackopen}
        onClose={() => {
          setSnackopen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackopen(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully Done
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Button
            variant="outlined"
            onClick={handleOpenCat}
            startIcon={<AddIcon />}
          >
            Add Category
          </Button>
          <Formik
            initialValues={{ title: "" }}
            onSubmit={(values, { resetForm }) => {
              console.log(imgFile);
              let data = new FormData();
              data.append("img", imgFile);
              data.append("title", values.title);
              data.append("name", props.service);
              postCat(data);

              resetForm({ values: "" });
            }}
            validationSchema={validationSchema}
          >
            {(prop) => (
              <Form onSubmit={prop.handleSubmit}>
                <Dialog
                  fullWidth={true}
                  open={opencat}
                  onClose={handleCloseCat}
                >
                  <DialogTitle>Create Category</DialogTitle>
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
                    {/* <input
                      type="file"
                      name="img"
                      onChange={(e) => {
                        prop.setFieldValue("img", e.currentTarget.files[0]);
                      }}
                    /> */}
                    <div
                      className="border-2 rounded-md border-dashed flex items-center justify-center h-48 m-8"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {imgFile ? (
                        <div className="relative h-48">
                          <img src={ImgPreview} className="h-48" />
                          <div className="absolute top-px right-px">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                setImgPreview();
                                setImgFile();
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                        </div>
                      ) : isDragActive ? (
                        <p>Drop the image here ...</p>
                      ) : (
                        <p>
                          Drag and drop image here, or click to select image
                        </p>
                      )}
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleCloseCat();
                        setImgPreview(null);
                        setImgFile();
                      }}
                    >
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
              maxWidth: 500,
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
                      <IconButton edge="end" aria-label="delete">
                        <EditIcon
                          sx={{ mx: 1 }}
                          onClick={() => {
                            setEditValue(cat.title);
                            setEditId(cat._id);
                            handleOpenCatEdit();
                          }}
                        />
                      </IconButton>
                      <Formik
                        initialValues={{ title: editValue }}
                        onSubmit={(values, { resetForm }) => {
                          editCat(values);
                          resetForm({ values: "" });
                        }}
                        validationSchema={validationSchema}
                      >
                        {(prop) => (
                          <Form onSubmit={prop.handleSubmit}>
                            <Dialog
                              fullWidth={true}
                              open={opencatEdit}
                              onClose={handleCloseCatEdit}
                            >
                              <DialogTitle>Edit Category</DialogTitle>
                              <DialogContent>
                                <TextField
                                  autoFocus
                                  id="title"
                                  label="Title"
                                  onChange={prop.handleChange}
                                  defaultValue={editValue}
                                  fullWidth
                                  variant="standard"
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  variant="primary"
                                  onClick={handleCloseCatEdit}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  startIcon={<AddIcon />}
                                  onClick={prop.handleSubmit}
                                  type="submit"
                                >
                                  Update
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Form>
                        )}
                      </Formik>
                      <IconButton
                        edge="end"
                        onClick={() => delCat(cat._id)}
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
          <p>Select Category</p>
        ) : (
          <Grid item xs={12} md={4} lg={6}>
            <Button
              variant="outlined"
              onClick={handleOpenSub}
              startIcon={<AddIcon />}
            >
              Add Sub Category
            </Button>
            <Formik
              initialValues={{ title: "" }}
              onSubmit={(values, { resetForm }) => {
                let data = new FormData();
                data.append("sub_img", values.img);
                data.append(" sub_title", values.title);
                postSub(data);
                resetForm({ values: "" });
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
                    <DialogTitle>Create Sub Category</DialogTitle>
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
                      {/* <input
                      type="file"
                      name="sub_img"
                      onChange={(e) => {
                        prop.setFieldValue("sub_img", e.currentTarget.files[0]);
                      }}
                    /> */}
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
                maxWidth: 500,
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
                        <ListItemButton>
                          {/* <ListItemAvatar>
                          <Avatar alt={subs.sub_img} src={subs.sub_img} />
                        </ListItemAvatar> */}

                          <ListItemText primary={subs.sub_title} />
                          <IconButton edge="end" aria-label="delete">
                            <EditIcon
                              sx={{ mx: 1 }}
                              onClick={() => {
                                setEditValue(subs.sub_title);
                                setEditId(subs._id);
                                handleOpenSubEdit();
                              }}
                            />
                          </IconButton>
                          <Formik
                            initialValues={{ title: editValue }}
                            onSubmit={(values, { resetForm }) => {
                              editSub(values);
                              resetForm({ values: "" });
                            }}
                            validationSchema={validationSchema}
                          >
                            {(prop) => (
                              <Form onSubmit={prop.handleSubmit}>
                                <Dialog
                                  fullWidth={true}
                                  open={opensubEdit}
                                  onClose={handleCloseSubEdit}
                                >
                                  <DialogTitle>Edit Sub Category</DialogTitle>
                                  <DialogContent>
                                    <TextField
                                      autoFocus
                                      id="title"
                                      label="Title"
                                      onChange={prop.handleChange}
                                      defaultValue={editValue}
                                      fullWidth
                                      variant="standard"
                                    />
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      variant="primary"
                                      onClick={handleCloseSubEdit}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      startIcon={<AddIcon />}
                                      onClick={prop.handleSubmit}
                                      type="submit"
                                    >
                                      Update
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </Form>
                            )}
                          </Formik>
                          <IconButton
                            onClick={() => delSub(subs._id)}
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
    </React.Fragment>
  );
}

export default Categories;
