import React, { useState, useEffect, useRef, memo } from "react";
import Flickity from "flickity";

const carousel = ({ cellSelector, children }) => {
  const element = useRef(null);
  const [_, setIndex] = useState(0);

  const options = {
    cellSelector,
    contain: true,
    initialIndex: 0,
    accessibility: true,
    pageDots: false
  };

  useEffect(() => {
    const flick = new Flickity(element.current, options);
    flick.on("cellSelect", setIndex(flick.selectedIndex));

    return () => {
      if (flick) {
        flick.off("cellSelect", setIndex(flick.selectedIndex));
        flick.destroy();
      }
    };
  });

  return (
    <div ref={element} className="carousel">
      {children}
    </div>
  );
};

export default memo(carousel);
