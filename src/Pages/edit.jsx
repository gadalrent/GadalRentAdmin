import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { api } from '../Private/api'
import ImageGallery from "../Components/ImageGallery";
import { Button, TextField, InputBase, FormControl } from "@mui/material";
import { Update } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useDropzone } from "react-dropzone";
import IMageGalleryEdit from "../Components/ImageGalleryEdit";
import useAuth from "../utils/useAuth";
function PEdit() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [descrption, setDescrp] = useState();
  const [price, setPrice] = useState();
  const [hiddenInfo, setHiddenInfo] = useState();
  const [galleryImages, setGalleryImages] = useState([]);
  const {auth:token} = useAuth()
  useEffect(() => {
    !data
      ? Axios.get(`${api.baseUrl}/property/admin/${id}`)
          .then((res) => {
            var tempGallery = [];

            for (let i = 0; i < res.data.img.length; i++) {
              tempGallery.push({
                img: `${api.imageUrl + res.data.img[i]}`,
                name: `${res.data.img[i]}`,
                id: `${res.data._id}`,
              });
              setGalleryImages(tempGallery);
            }
            setData(res.data);
          })
          .catch((err) => console.log(err))
      : console.log();
  }, [data]);

  const switchAccount = async () => {
    // const token = localStorage.getItem("token");
    Axios.patch(`${api.baseUrl}/property/admin/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        var tempGallery = [];
        console.log(res.data);
        for (let i = 0; i < res.data.img.length; i++) {
          tempGallery.push({
            img: `${api.imageUrl + res.data.img[i]}`,
          });
          setGalleryImages(tempGallery);
        }
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const updateInfo = async (ev) => {
    // const token = localStorage.getItem("token");
    const res = Axios.patch(
      `${api.baseUrl}/property/${id}`,
      {
        title: title,
        desc: descrption,
        price: price,
        location: location,
        others: hiddenInfo,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        data();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let postFormData = new FormData();
  const postProduct = async () => {
    console.log(imgFile[0]);
    // const token = localStorage.getItem("token");
    imgFile?.forEach((file) => {
      postFormData.append("img[]", file);
    });
    // for (var pair of postFormData.entries()) {
    //   console.log(pair[0] + " - " + pair[1]);
    // }
    try {
      Axios.patch(`${api.baseUrl}/property/photo/${data._id}`, postFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setIsLoading(true);
          window.location.reload();
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } catch (e) {}
  };

  const [imgFile, setImgFile] = useState();
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
  return (
    <div>
      <div className="container p-3 mt-5">
        {data ? (
          <ImageGallery galleryImages={galleryImages} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {data ? (
        <div>
          <div className="container mt-6">
            <div className="grid md:grid-cols-3 grid-cols-1">
              <div className="px-3 col-span-2">
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    border: 0,
                    bgcolor: "#dbdbdb",
                    px: 5,
                    my: 2,
                  }}
                  defaultValue={data ? data.title : "No data"}
                  inputProps={{
                    style: { fontSize: 40, fontWeight: "bold" },
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      updateInfo(ev);
                      ev.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setLocation(data.location);
                    setPrice(data.price);
                    setDescrp(data.desc);
                    setTitle(e.target.value);
                    setHiddenInfo(data.others);
                  }}
                />
                <h3 className="text-2xl font-semibold  mb-4">
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      border: 0,
                      bgcolor: "#dbdbdb",
                      px: 5,
                      my: 2,
                    }}
                    defaultValue={
                      data ? data.location.split("_").join(" ") : "No data"
                    }
                    inputProps={{
                      style: { fontSize: 20, fontWeight: "medium" },
                    }}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        updateInfo(ev);
                        ev.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setPrice(data.price);
                      setDescrp(data.desc);
                      setTitle(data.title);
                      setHiddenInfo(data.others);
                    }}
                  />
                </h3>
                <span className="mb-3 font-normal text-black">
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      border: 0,
                      bgcolor: "#dbdbdb",
                      px: 5,
                      my: 2,
                    }}
                    defaultValue={data ? data.desc : "No data"}
                    inputProps={{
                      style: { fontSize: 20, fontWeight: "medium" },
                    }}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        updateInfo(ev);
                        ev.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setLocation(data.location);
                      setPrice(data.price);
                      setDescrp(e.target.value);
                      setTitle(data.title);
                      setHiddenInfo(data.others);
                    }}
                  />
                </span>
                <div className="mb-3 font-normal text-black">
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      border: 0,
                      bgcolor: "#dbdbdb",
                      px: 5,
                      my: 2,
                    }}
                    placeholder="hidden info"
                    defaultValue={data.others ? data.others : ""}
                    inputProps={{
                      style: { fontSize: 20, fontWeight: "medium" },
                    }}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        updateInfo(ev);
                        ev.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setLocation(data.location);
                      setPrice(data.price);
                      setDescrp(data.desc);
                      setTitle(data.title);
                      setHiddenInfo(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-rows-2 gap-2 p-2">
                <div>
                  <div className="  rounded-lg border shadow-sm md:flex-row md:max-w-xl p-6 ">
                    <h2 className="font-semibold text-xl">
                      {data.period.split("/").join("")}
                    </h2>
                    <h2 className="font-bold text-3xl ">
                      {data.currency + " "}
                      <span>
                        {" "}
                        <InputBase
                          sx={{
                            ml: 1,
                            flex: 1,
                            border: 0,
                            bgcolor: "#dbdbdb",
                            px: 5,
                            my: 2,
                          }}
                          defaultValue={data ? data.price : "No data"}
                          inputProps={{
                            style: { fontSize: 30, fontWeight: "bold" },
                          }}
                          onKeyPress={(ev) => {
                            if (ev.key === "Enter") {
                              updateInfo(ev);
                              ev.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            setLocation(data.location);
                            setPrice(e.target.value);
                            setDescrp(data.desc);
                            setTitle(data.title);
                            setHiddenInfo(data.others);
                          }}
                        />
                      </span>
                    </h2>

                    <div className="flex justify-between mt-2">
                      <h2 className="font-bold text-xl">Availablity</h2>
                      {data.available ? (
                        <h2 className="font-bold text-xl text-green-500">
                          Available
                        </h2>
                      ) : (
                        <h2 className="font-bold text-xl text-red-500">
                          Not available
                        </h2>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <h2 className="font-bold text-xl">Rental Period</h2>
                      <h2 className="font-bold text-xl ">
                        {data.rentalPeriod ? data.rentalPeriod : "Unlimited"}
                      </h2>
                    </div>

                    {/* <button
                      // onClick={(event) => routeChange(event, "/message")}
                      disabled={
                        data.user._id !== localStorage.getItem("id")
                          ? false
                          : true
                      }
                      onClick={() => {
                        // localStorage.getItem("id") !== null &&
                        //   data.user._id !== localStorage.getItem("id") &&
                        //   writeMessage();
                      }}
                      className={
                        data.user._id !== localStorage.getItem("id")
                          ? "w-full mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                          : "w-full mt-4 bg-white border text-black font-bold py-2 px-4 rounded"
                      }
                    >
                      {data.user._id !== localStorage.getItem("id")
                        ? "Write Message"
                        : "Your Product"}
                    </button> */}
                  </div>
                </div>

                <div>
                  <div className="grid  place-items-center  rounded-lg border shadow-sm md:flex-row md:max-w-xl p-3">
                    {/* <UserCircleIcon className="w-24" /> */}
                    <h2 className="md:text-xl text-lg font-bold">
                      {data.user.name}
                    </h2>
                    <h2 className="md:text-lg text-sm font-bold">
                      {
                        data.user.products.filter(
                          (each) => each.service === "62dfac51713951211b7f1c56"
                        ).length
                      }
                      property .{" "}
                      {
                        data.user.products.filter(
                          (each) => each.service === "62e21df789b2c9b017502a90"
                        ).length
                      }{" "}
                      Machinary .{" "}
                      {
                        data.user.products.filter(
                          (each) => each.service === "62e22bf69ec6a56974a96ea8"
                        ).length
                      }
                      Vehicle
                    </h2>
                    <button
                      onClick={(event) => switchAccount()}
                      className="w-full mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold m-8 py-2 px-4 rounded"
                    >
                      Switch
                    </button>
                    <h2 className="md:text-xl text-lg font-bold">
                      {data.switch.name}
                    </h2>
                    <h2 className="md:text-lg text-sm font-bold">
                      {
                        data.switch.products.filter(
                          (each) => each.service === "62dfac51713951211b7f1c56"
                        ).length
                      }
                      property .{" "}
                      {
                        data.switch.products.filter(
                          (each) => each.service === "62e21df789b2c9b017502a90"
                        ).length
                      }{" "}
                      Machinary .{" "}
                      {
                        data.switch.products.filter(
                          (each) => each.service === "62e22bf69ec6a56974a96ea8"
                        ).length
                      }
                      Vehicle
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {data ? (
        <IMageGalleryEdit galleryImages={galleryImages} />
      ) : (
        <p>Loading...</p>
      )}
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
      <button
        // onClick={(event) => routeChange(event, "/message")}
        disabled={isLoading}
        onClick={postProduct}
        className={
          "w-full mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        }
      >
        {isLoading ? "Uploading" : "Upload"}
      </button>
    </div>
  );
}

export default PEdit;
