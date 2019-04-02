import React from "react";

import Menu from "./menu";
import Footer from "./footer";

const index = ({ children }) => (
  <>
    <Menu />
    <div className="static-height">{children}</div>
    <Footer />
  </>
);

export default index;
