import React, { Fragment } from "react";

import Menu from "./menu";

const layout = ({ children, data }) => (
	<Fragment>
		{console.log("layout", data)}
		<Menu data={data} />
		{children}
	</Fragment>
);

export default layout;
