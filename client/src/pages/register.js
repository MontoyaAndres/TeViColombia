import React from "react";
import { withFormik, Form, ErrorMessage } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import normalizeErrors from "../utils/normalizeErrors";
import { RegisterValidation } from "../utils/validation";
import { register } from "../api/auth";
import Success from "../components/global/success";
import FieldText from "../components/shared/FieldText";

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 2,
		margin: theme.spacing.unit * 2,
		textAlign: "center",
		color: theme.palette.text.secondary
	},
	image: {
		width: "100%",
		height: "auto",
		maxWidth: 400,
		maxHeight: 250
	},
	margin: {
		margin: theme.spacing.unit
	},
	error: {
		color: "red",
		fontSize: 14
	}
});

const Login = ({ classes, values, handleSubmit, isSubmitting }) => (
	<Grid item xs={12}>
		<Grid container justify="center">
			<Paper className={classes.paper}>
				<Success hide={values.registered} message="Ahora confirme su correo!" />

				<Grid item xs={12}>
					<img className={classes.image} src="img/logo.svg" alt="Uniminuto" />
				</Grid>
				<Form method="POST" onSubmit={handleSubmit}>
					<Grid item xs={12}>
						<FieldText name="name" type="text" label="Nombre" />
						<Typography variant="caption" className={classes.error}>
							<ErrorMessage name="name" />
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<FieldText name="lastname" type="text" label="Apellido" />
						<Typography variant="caption" className={classes.error}>
							<ErrorMessage name="lastname" />
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<FieldText name="email" type="email" label="Correo electrónico" />
						<Typography variant="caption" className={classes.error}>
							<ErrorMessage name="email" />
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<FieldText name="password" type="password" label="Contraseña" />
						<Typography variant="caption" className={classes.error}>
							<ErrorMessage name="password" />
						</Typography>
					</Grid>
					<Button
						type="submit"
						disabled={isSubmitting}
						variant="contained"
						color="primary"
						className={classes.margin}
					>
						<Typography variant="button" color="secondary">
							Entrar
						</Typography>
					</Button>
				</Form>
			</Paper>
		</Grid>
	</Grid>
);

export default withFormik({
	mapPropsToValues: () => ({
		name: "",
		lastname: "",
		email: "",
		password: ""
	}),
	validationSchema: RegisterValidation,
	validateOnBlur: false,
	validateOnChange: false,
	handleSubmit: async (
		values,
		{ setSubmitting, setErrors, setFieldValue, resetForm }
	) => {
		const response = await register(values);

		const { ok, errors } = response;
		if (ok) {
			setSubmitting(false);
			resetForm();
			setFieldValue("registered", true, false);
		} else {
			setSubmitting(false);
			setFieldValue("registered", false, false);
			setErrors(normalizeErrors(errors));
		}
	}
})(withStyles(styles)(Login));
