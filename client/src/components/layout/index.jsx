import React, { Fragment } from "react";

import Menu from "./menu";

const index = ({ children }) => (
  <Fragment>
    <Menu />
    {children}
  </Fragment>
);

export default index;
