import React from "react";
import Router from "next/router";
import { withFormik, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import normalizeErrors from "../utils/normalizeErrors";
import { LoginValidation } from "../utils/validation";
import { login } from "../api/auth";

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

const Login = ({
	classes,
	values,
	handleChange,
	handleBlur,
	handleSubmit,
	isSubmitting,
	touched,
	errors
}) => (
	<Grid container>
		<Grid item xs={12}>
			<Grid
				container
				justify="center"
				alignItems="center"
				style={{ height: 500 }}
			>
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
							<TextField
								error={Boolean(touched.email && errors.email)}
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								id="email"
								label="Correo electrónico"
								name="email"
								type="email"
								fullWidth
								margin="normal"
							/>
							<Typography variant="headline" className={classes.error}>
								{touched.email && errors.email ? errors.email : null}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								error={Boolean(touched.password && errors.password)}
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								id="password"
								label="Contraseña"
								name="password"
								type="password"
								fullWidth
								margin="normal"
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
	</Grid>
);

export default withFormik({
	mapPropsToValues: () => ({ email: "", password: "" }),
	validationSchema: LoginValidation,
	handleSubmit: async (values, { setSubmitting, setErrors }) => {
		const response = await login(values);

		const { ok, errors } = response;
		if (ok) {
			setSubmitting(false);
			Router.push("/");
		} else {
			setSubmitting(false);
			setErrors(normalizeErrors(errors));
		}
	}
})(withStyles(styles)(Login));
