import React, { useEffect, useState } from "react";
import { api } from "../../Private/api";
import Axios from "axios";
import { Button, TextField, InputBase, CircularProgress } from "@mui/material";

function AboutUsInfo() {
  const [aboutUs, setAboutUs] = useState();
  const [descCont, setdescCont] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    aboutData();
  }, []);

  const aboutData = async () => {
    const res = Axios.get(`${api.baseUrl}/info`)
      .then((res) => setAboutUs(res.data[0]))
      .catch((err) => console.log(err));
  };

  const UpdateWebInfo = async (ev, id) => {
    ev.preventDefault();
    setLoading(true);
    const res = Axios.patch(`${api.baseUrl}/info/${id}`, {
      desc: descCont,
    })
      .then((res) => {
        setAboutUs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="flex mx-auto">
      {aboutUs ? (
        !loading ? (
          <InputBase
            sx={{ px: 5, py: 10, flex: 1 }}
            fullWidth
            multiline
            defaultValue={aboutUs ? aboutUs.desc : "Loading..."}
            inputProps={{
              style: {},
            }}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                UpdateWebInfo(ev, aboutUs._id);
                ev.preventDefault();
              }
            }}
            onChange={(e) => {
              setdescCont(e.target.value);
            }}
          />
        ) : (
          <CircularProgress />
        )
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default AboutUsInfo;
