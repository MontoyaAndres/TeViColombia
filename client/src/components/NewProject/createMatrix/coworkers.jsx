import React, { Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const Coworkers = () => (
	<Fragment>
		<div style={{ padding: 20 }}>
			<Typography component="h4" variant="display1">
				Compañeros
			</Typography>
		</div>
		<Divider />
		<div style={{ padding: "20px 20px 0 20px" }}>
			<Typography component="h6" variant="title" style={{ fontWeight: 400 }}>
				Añada cuantos compañeros usted quiera, o puede trabajar sólo.
			</Typography>
		</div>
		<div style={{ padding: "0 20px 20px 20px" }}>test</div>
	</Fragment>
);

export default Coworkers;
