import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { api } from "../../Private/api";
import { Button, TextField, InputBase, FormControl } from "@mui/material";
import { useDropzone } from "react-dropzone";

function HomeInfo() {
  const [loading, setLoading] = useState(true);
  const [webInfo, setWebInfo] = useState();
  const [idcont, setIdCont] = useState();
  const [titleCont, setTitleCont] = useState();
  const [descCont, setDescCont] = useState();

  useEffect(() => {
    !webInfo && data();
  });

  const data = async () => {
    const res = Axios.get(`${api.baseUrl}/service`)
      .then((res) => {
        setWebInfo(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const UpdateWebInfo = async (ev) => {
    setLoading(true);
    // ev.preventDefault();
    const res = Axios.patch(`${api.baseUrl}/service/${idcont}`, {
      title: titleCont,
      desc: descCont,
    })
      .then((res) => {
        data();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // image drop
  const onDrop = useCallback((acceptedFiles) => {
    // setImgPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*",
  });
  let postFormData = new FormData();

  const UpdateImageInfo = async (ev, id) => {
    setLoading(true);
    ev.preventDefault();

    postFormData.append("img", ev.target.files[0]);
    Axios.patch(`${api.baseUrl}/service/img/${id}`, postFormData)
      .then((res) => {
        data();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* <Button
        onClick={() => {
          console.log(webInfo);
        }}
      >
        {" "}
        Helloe
      </Button> */}

      {webInfo && !loading
        ? webInfo.map((each, index) => (
            <section key={each._id} className="relative p-4 ">
              <div
                className={
                  index % 2 !== 0
                    ? "container flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28"
                    : "container flex flex-col-reverse lg:flex-row-reverse items-center gap-12 mt-14 lg:mt-28"
                }
              >
                <div className="flex justify-center  flex-1 mb-10 md:mb-16 lg:mb-0 z-10 lg:order-first order-last">
                  <img
                    className="sm:w-3/4 sm:h-3/4 md:w-full  p-22  object-contain  h-48 w-96 "
                    src={api.imageUrl + each.img}
                    alt={api.imageUrl + each.img}
                  />
                </div>
                <div className="flex flex-1 flex-col items-center lg:items-start">
                  <div className="text-bookmark-orange text-3xl md:text-4 lg:text-5xl font-bold text-center lg:text-left mb-2">
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      defaultValue={data ? each.title : "No data"}
                      inputProps={{
                        style: { fontSize: 40, fontWeight: "bold" },
                      }}
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          UpdateWebInfo(ev);
                          ev.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setIdCont(each._id);
                        setDescCont(each.desc);
                        setTitleCont(e.target.value);
                      }}
                    />
                  </div>

                  <div className="text-bookmark-grey text-lg text-center lg:text-left mb-6 text-gray-400">
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      defaultValue={each.desc}
                      size="medium"
                      inputProps={{ style: { fontSize: 16 } }}
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          UpdateWebInfo();
                          ev.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setIdCont(each._id);
                        setDescCont(e.target.value);
                        setTitleCont(each.title);
                      }}
                    />
                  </div>
                  <div className="text-bookmark-grey text-lg text-center lg:text-left mb-6 text-gray-400">
                    <input
                      type="file"
                      id="myFile"
                      name="propertyimg"
                      onChange={(e) => UpdateImageInfo(e, each._id)}
                    />
                  </div>
                </div>
              </div>
            </section>
          ))
        : loading && <h1>Loading ...</h1>}
    </div>
  );
}

export default HomeInfo;
