import React from "react";

import withAuth from "../utils/withAuth";

const index = props => (
	<h1>
		{console.log(props)}
		Hola
	</h1>
);

export default withAuth(index);
