import React, { Fragment } from "react";

import Menu from "./menu";

const layout = ({ children }) => (
	<Fragment>
		<Menu />
		{children}
	</Fragment>
);

export default layout;
