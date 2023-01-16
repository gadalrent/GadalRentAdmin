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
import FilledInput from "@mui/material/FilledInput";
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
// multi selection

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const VenueLocationIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "  https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconAnchor: null,

  shadowSize: [50, 64],
  shadowAnchor: [16, 40],
  iconSize: [30, 50],
  className: "leaflet-venue-icon",
});

function Mpost() {
  //constants
  const [general, setGeneral] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [varForms, setVarForms] = useState();
  const [imgFile, setImgFile] = useState();
  const [freeContact, setFreeContact] = useState(true);
  const {auth:token} = useAuth()
  const [Negotiable, setNegotiable] = useState(true);

  const [dropValues, setDropValues] = useState([]);
  const [multiValues, setMultiValues] = useState([]);
  const [fieldValues, setFieldValues] = useState([]);
  // image drop

  const onDrop = useCallback((acceptedFiles) => {
    setImgFile(acceptedFiles);

    // setImgPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*",
  });
  //Drop Values

  const updateDrops = (options, option) => {
    const newState = dropValues.map((obj) => {
      if (obj.title === options._id) {
        return { ...obj, value: option.split(" ").join("_") };
      }

      return obj;
    });

    setDropValues(newState);
  };
  const updateMulti = (options, option) => {
    const newState = multiValues.map((obj) => {
      if (obj.title === options._id) {
        return { ...obj, value: option };
      }

      return obj;
    });

    setMultiValues(newState);
  };
  const updateField = (options, option) => {
    const newState = fieldValues.map((obj) => {
      if (obj.title === options._id) {
        return { ...obj, value: option };
      }

      return obj;
    });

    setFieldValues(newState);
  };

  // multi selection

  const handleMultiChange = (event, title, options) => {
    const checkMulti = multiValues.filter((multi) => {
      return multi.title === options._id;
    });
    checkMulti.length === 0
      ? setMultiValues([
          ...multiValues,
          {
            title: options._id,
            value: event.target.value,
          },
        ])
      : updateMulti(options, event.target.value);
  };
  const handleFieldChange = (event, options) => {
    const checkField = fieldValues.filter((field) => {
      return field.title === options._id;
    });
    checkField.length === 0
      ? setFieldValues([
          ...fieldValues,
          {
            title: options._id,
            value: event.target.value.split(" ").join("_"),
          },
        ])
      : updateField(options, event.target.value.split(" ").join("_"));
  };

  //On posting process

  let postFormData = new FormData();
  const handleFreeConatact = (event) => {
    setFreeContact(event.target.checked);
  };
  const handleNegotiable = (event) => {
    setNegotiable(event.target.checked);
  };

  //befor post functions
  useEffect(() => {
    postGet();
    // setToken(localStorage.getItem("token"));
  }, []);

  const postGet = async () => {
    Axios.get(`${api.baseUrl}/general`)
      .then((res) => {
        setGeneral(res.data);
      })
      .catch((err) => console.log(err));
    Axios.get(`${api.baseUrl}/cat/Machinery`)
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
    Axios.get(`${api.baseUrl}/form/${id}`)
      .then((res) => {
        setVarForms(res.data);
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
    postFormData.append("multiSelect", JSON.stringify(multiValues));
    postFormData.append("textField", JSON.stringify(fieldValues));
    imgFile?.forEach((file) => {
      postFormData.append("img[]", file);
    });

    // for (var pair of postFormData.entries()) {
    //   console.log(pair[0] + " - " + pair[1]);
    // }

    try {
      Axios.post(`${api.baseUrl}/Machinery`, postFormData, {
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

          {/* Image Drag Drop */}
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
          {/* Variable TextField */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            {varForms &&
              varForms["fields"].map((options) => (
                <TextField
                  id="filled-select-currency"
                  label={options.ftitle}
                  // value={currency}
                  onChange={(e) => {
                    handleFieldChange(e, options);
                  }}
                  // helperText="Please select Category"
                  variant="filled"
                  sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
                ></TextField>
              ))}
          </Grid>
          {/* variable dropDowns */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            {varForms &&
              varForms["dropDowns"].map((options) => (
                <TextField
                  id="filled-select-currency"
                  select
                  label={options.dtitle}
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

                        const checkDrop = dropValues.filter((drop) => {
                          return drop.title === options._id;
                        });
                        checkDrop.length === 0
                          ? setDropValues([
                              ...dropValues,
                              {
                                title: options._id,
                                value: option.split(" ").join("_"),
                              },
                            ])
                          : updateDrops(options, option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ))}
          </Grid>
          {/* variable multiselcts */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            {varForms &&
              varForms["multiSelect"].map((options, opin) => (
                <FormControl
                  key={opin}
                  variant="filled"
                  sx={{ mx: 2, my: 1, maxWidth: "400px", minWidth: "200px" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    {options["mtitle"]}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    multiple
                    value={
                      multiValues.filter((multi) => {
                        return multi.title === options["_id"];
                      }).length !== 0
                        ? multiValues.filter((multi) => {
                            return multi.title === options["_id"];
                          })[0]["value"]
                        : []
                    }
                    input={<FilledInput label={options["mtitle"]} />}
                    onChange={(e) =>
                      handleMultiChange(e, options["_id"], options)
                    }
                    // renderValue={(selected) => (
                    //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    //     {selected.map((value) => (
                    //       <Chip key={value} label={value} />
                    //     ))}
                    //   </Box>
                    // )}
                    MenuProps={MenuProps}
                  >
                    {options["moptions"].map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        onClick={() => {
                          // var filteredMulti = multiValues.filter((multi) => {
                          //   return multi.title === options["_id"];
                          // });
                          // console.log(name);
                          // console.log(options["_id"]);
                          // console.log(multiValues);
                        }}
                      >
                        {name}
                        {/* <Checkbox checked={multiValues.indexOf(name) > -1} /> */}
                        {/* <ListItemText primary={name} /> */}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
          </Grid>
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

export default Mpost;
