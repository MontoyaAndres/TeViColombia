import React from "react";

import Menu from "./menu";
import Footer from "./footer";

const index = ({ children }) => (
  <>
    <style global jsx>{`
      html,
      body {
        font-family: "Roboto", sans-serif;
      }

      ::-moz-selection {
        background-color: #00d1b2;
        color: white;
      }

      ::selection {
        background-color: #00d1b2;
        color: white;
      }

      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background-color: #69f0ae;

        position: fixed;
        z-index: 1131;
        top: 0;
        left: 0;

        width: 100%;
        height: 5px;
      }

      .static-height {
        min-height: calc(100vh - 3.25rem);
      }
    `}</style>
    <Menu />
    <div className="static-height">{children}</div>
    <Footer />
  </>
);

export default index;
