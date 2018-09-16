import React, { PureComponent } from "react";
import Router from "next/router";
import { Formik, Form, ErrorMessage } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import normalizeErrors from "../utils/normalizeErrors";
import { LoginValidation } from "../utils/validation";
import FieldText from "../components/shared/FieldText";
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

class Login extends PureComponent {
	componentWillReceiveProps(nextProps) {
		const {
			state: { response },
			setError
		} = nextProps;
		console.log(response);

		if (response.ok) {
			Router.push("/");
		} else if (!response.ok && response.errors) {
			setError(normalizeErrors(response.errors));
		}
	}

	render() {
		const { classes, isSubmitting } = this.props;

		return (
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
						<Form method="POST">
							<Grid item xs={12}>
								<FieldText
									name="email"
									type="email"
									label="Correo electrónico"
								/>
								<Typography variant="headline" className={classes.error}>
									<ErrorMessage name="email" />
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<FieldText name="password" type="password" label="Contraseña" />
								<Typography variant="headline" className={classes.error}>
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
	}
}

const wrapperLogin = React.forwardRef(({ classes }, ref) => (
	<Consumer>
		{state => (
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={LoginValidation}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={async (values, { setSubmitting }) => {
					await state.actions.loginUser(values);
					setSubmitting(false);
				}}
				render={props => (
					<Login {...props} classes={classes} state={state} ref={ref} />
				)}
			/>
		)}
	</Consumer>
));

export default withStyles(styles)(wrapperLogin);
