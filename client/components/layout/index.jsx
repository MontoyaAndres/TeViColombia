import React from "react";

import Menu from "./menu";
import Footer from "./footer";

const index = ({ children }) => (
  <>
    <Menu />
    {children}
    <Footer />
  </>
);

export default index;
