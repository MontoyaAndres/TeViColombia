import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";

const FieldText = ({ name, type, label, touched, errors }) => (
	<Field
		render={({ field }) => (
			<TextField
				{...field}
				label={label}
				type={type}
				error={Boolean(touched.name && errors.name)}
				fullWidth
				margin="normal"
			/>
		)}
		id={name}
		name={name}
	/>
);

export default FieldText;
