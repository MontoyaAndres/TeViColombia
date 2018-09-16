import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";

const FieldText = ({ name, type, label }) => (
	<Field
		render={({ field }) => (
			<TextField
				{...field}
				label={label}
				type={type}
				required
				fullWidth
				margin="normal"
			/>
		)}
		id={name}
		name={name}
	/>
);

export default FieldText;
