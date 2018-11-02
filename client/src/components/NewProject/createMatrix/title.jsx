import React, { Fragment } from "react";
import { ErrorMessage } from "formik";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import FieldText from "../../shared/FieldText";

const Title = () => (
	<Fragment>
		<div style={{ padding: 20 }}>
			<Typography component="h4" variant="h4">
				Titulo del proyecto
			</Typography>
		</div>
		<Divider />
		<div style={{ padding: "20px 20px 0 20px" }}>
			<Typography component="h6" variant="h6" style={{ fontWeight: 400 }}>
				Añada un título que identifique la matriz a elaborar. Recuerde que debe
				ser mayor a 5 y menor que 100 caracteres.
			</Typography>
		</div>
		<div style={{ padding: "0 20px 20px 20px" }}>
			<FieldText name="title" type="text" label="Título" required />
			<Typography
				component="p"
				variant="caption"
				style={{ color: "red", fontSize: 14 }}
			>
				<ErrorMessage name="title" />
			</Typography>
		</div>
	</Fragment>
);

export default Title;
