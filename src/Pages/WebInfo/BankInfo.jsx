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
import { api } from "../../Private/api";
import * as Yup from "yup";

function BankInfo() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    bankData();
  }, []);

  const bankData = async () => {
    const res = Axios.get(`${api.baseUrl}/info/bank`)
      .then((res) => setBanks(res.data))
      .catch((err) => console.log(err));
  };

  const editCat = (e) => {
    console.log(e.title);
    Axios.patch(`${api.baseUrl}/cat/${editId}`, {
      title: e.title,
      // name: props.service,
      // img: "",
    })
      .then((res) => {
        bankData();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
    handleCloseCatEdit();
  };

  const postCat = (e) => {
    console.log(e.title);
    Axios.post(`${api.baseUrl}/cat`, e, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        bankData();
        setImgPreview(null);
        setImgFile();
        setSnackopen(true);
      })
      .catch((err) => console.log(err));
    handleCloseCat();
  };

  const delCat = (e) => {
    console.log(e);
    Axios.delete(`${api.baseUrl}/cat/${e}`)
      .then((res) => {
        bankData();
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

      <Grid container spacing={1}>
        <Grid item sx={{ mx: "auto" }}>
          {/* <Button
            variant="outlined"
            onClick={handleOpenCat}
            startIcon={<AddIcon />}
          >
            Add Bank Account
          </Button> */}
          <Formik
            initialValues={{ bank: "", num: "", name: "" }}
            onSubmit={(values, { resetForm }) => {
              let data = new FormData();
              data.append("img", imgFile);
              data.append("title", values.title);

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
                  <DialogTitle>Create Bank Account</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      id="bank"
                      label="Bank Name"
                      onChange={prop.handleChange}
                      defaultValue={prop.values.bank}
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      id="name"
                      label="name"
                      onChange={prop.handleChange}
                      defaultValue={prop.values.name}
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

              display: "flex",
              flexDirection: "column",
            }}
            elevation={0}
            className="drop-shadow-sm "
          >
            <nav aria-label="main mailbox folders">
              <List>
                {banks.map((cat) => (
                  <ListItem key={cat._id}>
                    <ListItemButton
                      selected={cat._id === selectedL}
                      onClick={() => {
                        setSelectedL(cat._id);
                      }}
                      sx={{
                        p: 3,

                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <ListItemText primary={cat.bank} />
                      <ListItemText primary={cat.num} />
                      <ListItemText primary={cat.name} />
                    </ListItemButton>
                    {/* <IconButton edge="end" aria-label="delete">
                      <EditIcon
                        sx={{ mx: 1 }}
                        onClick={() => {
                          setEditValue(cat.title);
                          setEditId(cat._id);
                          handleOpenCatEdit();
                        }}
                      />
                    </IconButton> */}
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
                            <DialogTitle>Edit Bank Account</DialogTitle>
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
                    {/* <IconButton
                      edge="end"
                      onClick={() => delCat(cat._id)}
                      aria-label="delete"
                    >
                      <DeleteIcon sx={{ mx: 1 }} />
                    </IconButton> */}
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

export default BankInfo;
