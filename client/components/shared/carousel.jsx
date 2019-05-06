import React from "react";
import Flickity from "react-flickity-component";

const carousel = ({ children }) => {
  const options = {
    contain: true,
    initialIndex: 0,
    accessibility: true,
    pageDots: false
  };

  return (
    <Flickity className="carousel" options={options} reloadOnUpdate>
      {children}
    </Flickity>
  );
};

export default carousel;
