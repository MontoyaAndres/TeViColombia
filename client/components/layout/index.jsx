import React from "react";

import Menu from "./menu";
import Footer from "./footer";

const index = ({ children }) => (
  <>
    <style global jsx>{`
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background-color: white;

        position: fixed;
        z-index: 1131;
        top: 0;
        left: 0;

        width: 100%;
        height: 5px;
      }
    `}</style>
    <Menu />
    <div className="static-height">{children}</div>
    <Footer />
  </>
);

export default index;
