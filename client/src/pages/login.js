import React from "react";
import Router from "next/router";
import { Form, ErrorMessage, Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import normalizeErrors from "../utils/normalizeErrors";
import { LoginValidation } from "../utils/validation";
import FieldText from "../components/shared/FieldText";
import { login } from "../api/auth";
import { Consumer } from "../components/shared/ContextApi";

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

const Login = ({ classes }) => (
	<Grid item xs={12}>
		<Grid container justify="center">
			<Paper className={classes.paper}>
				<Grid item xs={12}>
					<img className={classes.image} src="img/logo.svg" alt="Uniminuto" />
				</Grid>
				<Consumer>
					{state => (
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={LoginValidation}
							validateOnBlur={false}
							validateOnChange={false}
							onSubmit={async (values, { setSubmitting, setErrors }) => {
								const response = await login(values);

								const { ok, errors } = response;
								if (ok) {
									setSubmitting(false);
									// Getting current user
									await state.actions.getMeUser();
									Router.replace("/");
								} else {
									setSubmitting(false);
									setErrors(normalizeErrors(errors));
								}
							}}
							render={({ isSubmitting }) => (
								<Form method="POST">
									<Grid item xs={12}>
										<FieldText
											name="email"
											type="email"
											label="Correo electrónico"
										/>
										<Typography variant="caption" className={classes.error}>
											<ErrorMessage name="email" />
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<FieldText
											name="password"
											type="password"
											label="Contraseña"
										/>
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
							)}
						/>
					)}
				</Consumer>
			</Paper>
		</Grid>
	</Grid>
);

export default withStyles(styles)(Login);
