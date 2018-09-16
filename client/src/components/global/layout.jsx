import React, { Fragment } from "react";

import Menu from "./menu";
import { Consumer } from "../shared/ContextApi";

const layout = ({ children }) => (
	<Consumer>
		{state => (
			<Fragment>
				<Menu data={state.response} />
				{children}
			</Fragment>
		)}
	</Consumer>
);

export default layout;
