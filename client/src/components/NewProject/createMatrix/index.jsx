import React from "react";
import { Form, withFormik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { CreateMatrixValidation } from "../../../utils/validation";
import Title from "./title";
import Coworkers from "./coworkers";
import { createMatrix } from "../../../api/matrix";
import normalizeErrors from "../../../utils/normalizeErrors";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		margin: theme.spacing.unit * 2,
		padding: theme.spacing.unit * 2
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	}
});

const index = ({
	classes,
	handleSubmit,
	isSubmitting,
	setFieldValue,
	closeWindow
}) => (
	<div>
		<Form method="POST" onSubmit={handleSubmit}>
			<Paper className={classes.root} elevation={1}>
				<Title />
				<Coworkers setFieldValue={setFieldValue} />

				<Button
					disabled={isSubmitting}
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={closeWindow}
				>
					Volver
				</Button>
				<Button
					type="submit"
					disabled={isSubmitting}
					variant="contained"
					color="primary"
					className={classes.button}
				>
					Crear matriz
				</Button>
			</Paper>
		</Form>
	</div>
);

export default withFormik({
	mapPropsToValues: () => ({
		title: "",
		coworkers: []
	}),
	validateOnBlur: false,
	validateOnChange: false,
	validationSchema: CreateMatrixValidation,
	handleSubmit: async (
		values,
		{ setSubmitting, setErrors, props: { name } }
	) => {
		const response = await createMatrix({ data: { values, name } });

		const { ok, errors } = response;
		if (ok) {
			setSubmitting(false);
		} else {
			setSubmitting(false);
			setErrors(normalizeErrors(errors));
		}
	}
})(withStyles(styles)(index));
