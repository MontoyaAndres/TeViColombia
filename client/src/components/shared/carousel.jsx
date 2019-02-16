import React from "react";
import { Carousel } from "react-responsive-carousel";

const carousel = ({ children }) => (
  <Carousel
    showThumbs={false}
    showStatus={false}
    stopOnHover={false}
    showIndicators={false}
    infiniteLoop
    emulateTouch
  >
    {children}
  </Carousel>
);

export default carousel;
