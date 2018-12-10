import React, { Fragment } from "react";

import Menu from "./menu";
import { Consumer } from "../shared/contextApi";

const index = ({ children }) => (
  <Consumer>
    {state => (
      <Fragment>
        <Menu response={state.response} actions={state.actions} />
        {children}
      </Fragment>
    )}
  </Consumer>
);

export default index;
