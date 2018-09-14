import React from "react";
import Router from "next/router";
import { withFormik, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import normalizeErrors from "../utils/normalizeErrors";
import { LoginValidation } from "../utils/validation";
import { login } from "../api/auth";
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

const Login = ({ classes, handleSubmit, isSubmitting, touched, errors }) => (
	<Grid item xs={12}>
		<Grid container justify="center">
			<Paper className={classes.paper}>
				<Grid item xs={12}>
					{/* <img
                className={classes.image}
                src={UniminutoLogin}
                alt="Uniminuto"
							/> */}
					image
				</Grid>
				<Form method="POST" onSubmit={handleSubmit}>
					<Grid item xs={12}>
						<FieldText
							name="email"
							type="email"
							label="Correo electrónico"
							touched={touched}
							errors={errors}
						/>
						<Typography variant="headline" className={classes.error}>
							{touched.email && errors.email ? errors.email : null}
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<FieldText
							name="password"
							type="password"
							label="Contraseña"
							touched={touched}
							errors={errors}
						/>
						<Typography variant="headline" className={classes.error}>
							{touched.password && errors.password ? errors.password : null}
						</Typography>
					</Grid>
					<Button
						type="submit"
						disabled={isSubmitting}
						variant="contained"
						color="primary"
						className={classes.margin}
					>
						Entrar
					</Button>
				</Form>
			</Paper>
		</Grid>
	</Grid>
);

export default withFormik({
	mapPropsToValues: () => ({ email: "", password: "" }),
	validationSchema: LoginValidation,
	validateOnBlur: false,
	validateOnChange: false,
	handleSubmit: async (values, { setSubmitting, setErrors }) => {
		const response = await login(values);

		const { ok, errors } = response;
		if (ok) {
			setSubmitting(false);
			Router.replace("/");
		} else {
			setSubmitting(false);
			setErrors(normalizeErrors(errors));
		}
	}
})(withStyles(styles)(Login));
