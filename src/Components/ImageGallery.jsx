import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";

import "./wsp-gallery.css";

const ImageGallery = ({ galleryImages }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
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
      {openModal && (
        <div>
          <div className="sliderWrap">
            <div className="btnPrev">
              <IconButton sx={{ bgcolor: "#fff" }} onClick={prevSlide}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className="fullScreenImage">
              <img src={galleryImages[slideNumber].img} alt="" />
            </div>
            <div className="btnNext">
              <IconButton sx={{ bgcolor: "#fff" }} onClick={nextSlide}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            <IconButton
              className="btnClose"
              sx={{ bgcolor: "#ff0000" }}
              onClick={handleCloseModal}
            >
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </div>
        </div>
      )}

      {/* <br />
      Current slide number:  {slideNumber}
      <br />
      Total Slides: {galleryImages.length}
      <br /><br /> */}

      <div className="galleryWrap max-h-[70vh] overflow-hidden">
        {galleryImages &&
          galleryImages.map((slide, index) => {
            return (
              <div
                className="single flex flex-row"
                key={index}
                onClick={() => handleOpenModal(index)}
              >
                <img className="flex " src={slide.img} alt="" />
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default ImageGallery;
