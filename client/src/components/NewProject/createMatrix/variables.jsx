import React, { Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const Variables = () => (
	<Fragment>
		<div style={{ padding: 20 }}>
			<Typography component="h4" variant="h4">
				Variables
			</Typography>
		</div>
		<Divider />
		<div style={{ padding: "20px 20px 0 20px" }}>
			<Typography component="h6" variant="h6" style={{ fontWeight: 400 }}>
				Descripción
			</Typography>
		</div>
		<div style={{ padding: "0 20px 20px 20px" }}>
			<ul>
				<li>s</li>
				<li>s</li>
				<li>s</li>
				<li>s</li>
			</ul>
		</div>
	</Fragment>
);

export default Variables;
