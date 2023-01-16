import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Axios from "axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../Private/api";
import "./wsp-gallery.css";

const IMageGalleryEdit = ({ galleryImages }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = async (name, id) => {
    console.log(id);
    console.log(name);
    try {
      const res = await Axios.patch(
        `${api.baseUrl}/property/photo/delete/${id}`,
        {
          img: name,
          otiuth: "edtrgjelrg",
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(galleryImages.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  // Next Image
  const nextSlide = () => {
    slideNumber + 1 === galleryImages.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <React.Fragment>
      <div>
        <div className="sliderWrapedit">
          <div className="">
            <IconButton
              sx={{ bgcolor: "#fff" }}
              onClick={() => {
                document.getElementById("Rowss").scrollLeft -=
                  window.innerWidth - 80;
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              sx={{ bgcolor: "#fff" }}
              onClick={() => {
                document.getElementById("Rowss").scrollLeft +=
                  window.innerWidth - 80;
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <div className="max-h-60 flex">
            {galleryImages.map((imgu, index) => (
              <div className=" m-2">
                <img
                  className="max-h-60"
                  src={galleryImages[index].img}
                  alt=""
                />
                <IconButton
                  className="btnCloseedit"
                  sx={{ bgcolor: "#ff0000" }}
                  onClick={() => {
                    handleCloseModal(imgu.name, imgu.id);
                  }}
                >
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <br />
      Current slide number:  {slideNumber}
      <br />
      Total Slides: {galleryImages.length}
      <br /><br /> */}
      {/* <div className="galleryWrapedit max-h-[70vh] overflow-hidden">
        {galleryImages &&
          galleryImages.map((slide, index) => {
            return (
              <div
                className="singleedit flex flex-row"
                key={index}
                onClick={() => handleOpenModal(index)}
              >
                <img className="flex " src={slide.img} alt="" />
              </div>
            );
          })}
      </div> */}
    </React.Fragment>
  );
};

export default IMageGalleryEdit;
