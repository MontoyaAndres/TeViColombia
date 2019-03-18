import React from "react";

import Menu from "./menu";
import Footer from "./footer";

const index = ({ children }) => (
  <>
    <Menu />
    <div className="hero is-fullheight-with-navbar">{children}</div>
    <Footer />
  </>
);

export default index;
