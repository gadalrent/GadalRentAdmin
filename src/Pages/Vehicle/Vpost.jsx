import React, { useState, useEffect, useRef, useCallback } from "react";
import * as L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDropzone } from "react-dropzone";
import { Form, Formik } from "formik";
import Axios from "axios";
import { api } from "../../Private/api";
import useAuth from "../../utils/useAuth";
function Vpost() {
  // image drop
  const [imgFile, setImgFile] = useState();
  const [ImgPreview, setImgPreview] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    setImgFile(acceptedFiles);

    // setImgPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  // useEffect(() => {
  //   for (var i in imgFile) {
  //     setImgPreview(...ImgPreview, URL.createObjectURL(imgFile[i]));
  //   }
  // }, [imgFile]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*",
  });

  // multi selection

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  //constants
  const [general, setGeneral] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [varForms, setVarForms] = useState();
  //On posting process

  let postFormData = new FormData();

  const [multiValues, setMultiValues] = useState([]);
  const [dropValues, setDropValues] = useState([]);
  let [freeContact, setFreeContact] = useState(true);
  const {auth:token} = useAuth()
  const handleFreeConatact = (event) => {
    setFreeContact(event.target.checked);
  };
  let [Negotiable, setNegotiable] = useState(true);
  const handleNegotiable = (event) => {
    setNegotiable(event.target.checked);
  };
  // console.log(token)
  const addDrops = async (val) => {
    // multiValues.push({});
    console.log("Add Drops");
    console.log(val);
    for (var i in val["multiSelect"]) {
      console.log(i);
      setMultiValues(
        multiValues.concat({ title: val.multiSelect[i].mtitle, value: [] })
      );
      console.log(multiValues);
      // multiValues.push({ title: varForms.multiSelect[i]._id, value: [] });
    }
  };
  //befor post functions
  useEffect(() => {
    postGet();
    // alert(token)
    // setToken(localStorage.getItem("token"));
  }, []);

  const postGet = async () => {
    const res = Axios.get(`${api.baseUrl}/general`)
      .then((res) => {
        setGeneral(res.data);
      })
      .catch((err) => console.log(err));
    const cats = Axios.get(`${api.baseUrl}/cat/vehicle`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  const subCatData = async (data) => {
    setSubCats(
      categories.filter((subCat) => {
        return subCat._id === data;
      })
    );
  };
  const varPostGet = async (id) => {
    const vares = Axios.get(`${api.baseUrl}/form/${id}`)
      .then((res) => {
        setVarForms(res.data, addDrops(varForms));
      })
      .catch((err) => console.log(err));
  };

  const pinLocation = (e) => {
    // if (!map) return;

    map.addEventListener("click", (e) => {
      console.log(e);
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
  };
  //final Post
  let position = [9.03768102008089, 38.77212524414063];
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState({ lat: 8.928487, lng: 39.60329 });
  const { lat, lng } = coords;
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [SubC, setSubC] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [snackopen, setSnackopen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const postProduct = async () => {
    console.log("Posting...");
    postFormData.append("title", title);
    postFormData.append("desc", desc);
    postFormData.append("subCat", SubC);
    postFormData.append("price", price);
    postFormData.append("currency", "ETB");
    postFormData.append("period", "/month");
    postFormData.append("location", "Addis Ababa");
    postFormData.append("freeContact", freeContact);
    postFormData.append("isnegotiable", Negotiable);
    postFormData.append("dropDowns", JSON.stringify(dropValues));
    imgFile?.forEach((file) => {
      postFormData.append("img[]", file);
    });

    // for (var pair of postFormData.entries()) {
    //   console.log(pair[0] + " - " + pair[1]);
    // }

    try {
      Axios.post(`${api.baseUrl}/vehicle`, postFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setSnackopen(true);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess(false);
          setSnackopen(true);
        });
    } catch (e) {
      setIsSuccess(false);
      setSnackopen(true);
    }
  };
  //ALert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <div>
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
          severity={isSuccess ? "success" : "warning"}
          sx={{ width: "100%" }}
        >
          {isSuccess ? `Successfully Done` : `Somthing wents wrong`}
        </Alert>
      </Snackbar>
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          m: 5,
          p: 2,
          align: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowX: "auto",
        }}
      >
        <form>
          <Grid container spacing={0} sx={{ my: 1 }}>
            <TextField
              autoFocus
              id="title"
              label="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              variant="filled"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              // rows={3}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              variant="filled"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            />

            {general.length !== 0 && general[0].options.length !== 0 ? (
              <div>
                <TextField
                  id="Price"
                  label="Price"
                  multiline
                  // rows={3}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  variant="filled"
                  sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
                />
                <TextField
                  id="filled-select-currency"
                  select
                  label={"Currency"}
                  // value={currency}
                  // onChange={prop.handleChange}
                  // helperText="Please select Category"
                  variant="filled"
                  sx={{ mx: 2, my: 1, maxWidth: "200px", minWidth: "200px" }}
                >
                  {general[0].options.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      onClick={() => {
                        console.log(option);
                        // setDropValues([
                        //   ...dropValues,
                        //   {
                        //     title: options._id,
                        //     value: options.dtitle.split(" ").join("_"),
                        //   },
                        // ]);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="filled-select-currency"
                  select
                  label={"/Per"}
                  // value={currency}
                  // onChange={prop.handleChange}
                  // helperText="Please select Category"
                  variant="filled"
                  sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
                >
                  {general[1].options.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      onClick={() => {
                        console.log(option);
                        // setDropValues([
                        //   ...dropValues,
                        //   {
                        //     title: options._id,
                        //     value: options.dtitle.split(" ").join("_"),
                        //   },
                        // ]);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
            <TextField
              id="filled-select-currency"
              select
              label="Categories"
              // value={currency}
              // onChange={prop.handleChange}
              variant="filled"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            >
              {categories.map((option) => (
                <MenuItem
                  key={option._id}
                  value={option._id}
                  onClick={() => {
                    subCatData(option._id);
                  }}
                >
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-select-currency"
              select
              label="Sub- Categories"
              // value={currency}
              disabled={subCats.length === 0 ? true : false}
              // onChange={prop.handleChange}
              variant="filled"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            >
              {subCats.map((option) =>
                option.subCat.map((subs) => (
                  <MenuItem
                    key={subs._id}
                    value={subs._id}
                    onClick={() => {
                      varPostGet(subs._id);
                      setSubC(subs._id);
                    }}
                  >
                    {subs.sub_title}
                  </MenuItem>
                ))
              )}
            </TextField>
            <FormControl
              component="fieldset"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            >
              <FormControlLabel
                label="Free Contact"
                labelPlacement="top"
                control={
                  <Switch checked={freeContact} onChange={handleFreeConatact} />
                }
              />
            </FormControl>
            <FormControl
              component="fieldset"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            >
              <FormControlLabel
                label="Negotiable"
                labelPlacement="top"
                control={
                  <Switch checked={Negotiable} onChange={handleNegotiable} />
                }
              />
            </FormControl>
            <TextField
              autoFocus
              id="location"
              label="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              variant="filled"
              sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
            />
          </Grid>
          {/* <div className="col-lg-6 mt-3 max-w-52">
            <MapContainer
              center={position}
              zoom={5}
              style={{ height: "360px" }}
              whenCreated={setMap}
              eventHandlers={{
                click: (e) => {
                  console.log("marker clicked", e);
                },
              }}
              onClick={pinLocation}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {coords ? (
                <Marker icon={VenueLocationIcon} position={coords}>
                  <Popup style={{ backgroundColor: "red" }}>
                    You are here
                    <img
                      className="img-fluid"
                      src="https://wallpapercave.com/uwp/uwp962201.jpeg"
                      alt="Sacré-Coeur"
                    />
                  </Popup>
                </Marker>
              ) : (
                <p>asdasd</p>
              )}
            </MapContainer>
          </div> */}
          <Grid
            container
            spacing={2}
            sx={{ my: 1, align: "center", justifyContent: "center" }}
          >
            <div
              className="border-2 rounded-md border-dashed flex items-center w-10/12 justify-center h-48 m-8"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : imgFile ? (
                <p>{imgFile.length} Photo loaded</p>
              ) : (
                <p>Drag and drop image here, or click to select image</p>
              )}
            </div>
            {/* {ImgPreview ? (
              <div className="relative h-48">
                {ImgPreview.map((options, index) => (
                  <img src={options} className="h-48" />
                ))}
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
            ) : (
              <h1>No Image</h1>
            )} */}
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            {varForms ? (
              varForms["dropDowns"].map((options) => (
                <TextField
                  id="filled-select-currency"
                  select
                  label={options.dtitle}
                  // value={currency}
                  // onChange={prop.handleChange}
                  // helperText="Please select Category"
                  variant="filled"
                  sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
                >
                  {options["doptions"].map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      onClick={() => {
                        // postFormData.append(options._id, option);
                        // postFormData.dropDowns.forEach((file) => {
                        //   postFormData.append(options.dtitle, option);
                        // });
                        setDropValues([
                          ...dropValues,
                          {
                            title: options._id,
                            value: options.dtitle.split(" ").join("_"),
                          },
                        ]);
                        // dropValues.push({
                        //   title: options._id,
                        //   value: options.dtitle,
                        // });
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ))
            ) : (
              <h1></h1>
            )}
          </Grid>
          {/* {varForms ? (
          varForms["multiSelect"].map((options, opin) => (
            <FormControl key={opin} variant="filled" sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-simple-select-filled-label">
                {options["mtitle"]}
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                multiple
                value={personName}
                onChange={handleChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {options["moptions"].map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    onClick={() => {
                      // multiValues[opin].value.push(name);
                      addDrops();
                      console.log(opin);
                      console.log(multiValues);
                    }}
                  >
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))
        ) : (
          <h1>Somthing</h1>
        )} */}

          <Button
            type="submit"
            fullWidth
            elevation={0}
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => {
              // for (var pair of postFormData.entries()) {
              //   console.log(pair[0] + " - " + pair[1]);
              // }
              e.preventDefault();
              postProduct();
            }}
          >
            Post
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Vpost;
