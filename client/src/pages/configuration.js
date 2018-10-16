import React, { Fragment, PureComponent } from "react";
import Router from "next/router";
import { Formik, Form, ErrorMessage } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { me, updateUser } from "../api/user";
import normalizeErrors from "../utils/normalizeErrors";
import FieldText from "../components/shared/FieldText";
import Loading from "../components/global/loading";
import { UserConfiguration } from "../utils/validation";

const styles = theme => ({
	root: {
		margin: theme.spacing.unit * 2
	},
	margin: {
		margin: theme.spacing.unit
	},
	error: {
		color: "red",
		fontSize: 14
	}
});

class Configuration extends PureComponent {
	state = {
		data: {}
	};

	async componentDidMount() {
		const response = await me();

		this.setState({ data: response.me });
	}

	render() {
		const { data } = this.state;
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={1}>
				<Fragment>
					<div style={{ padding: 20 }}>
						<Typography component="h4" variant="h4">
							Configuración de usuario.
						</Typography>
					</div>
					<Divider />

					<div style={{ padding: 20 }}>
						<Grid item xs={12}>
							<Grid container justify="center">
								<Grid item xs={12}>
									{/* wait until the data are loaded */}
									{data.name ? (
										<Formik
											initialValues={{
												name: data.name,
												lastname: data.lastname,
												email: data.email,
												oldPassword: "",
												newPassword: ""
											}}
											validationSchema={UserConfiguration}
											validateOnBlur={false}
											validateOnChange={false}
											onSubmit={async (
												values,
												{ setSubmitting, setErrors }
											) => {
												const response = await updateUser(values);

												const { ok, errors } = response;
												if (ok) {
													setSubmitting(false);
													Router.push("/");
												} else {
													setSubmitting(false);
													setErrors(normalizeErrors(errors));
												}
											}}
											render={({ isSubmitting }) => (
												<Form method="POST">
													<FieldText name="name" type="text" label="Nombre" />
													<Typography
														variant="caption"
														className={classes.error}
													>
														<ErrorMessage name="name" />
													</Typography>

													<FieldText
														name="lastname"
														type="text"
														label="Apellido"
													/>
													<Typography
														variant="caption"
														className={classes.error}
													>
														<ErrorMessage name="lastname" />
													</Typography>

													<FieldText
														name="email"
														type="text"
														label="Correo electrónico"
													/>
													<Typography
														variant="caption"
														className={classes.error}
													>
														<ErrorMessage name="email" />
													</Typography>

													<FieldText
														name="oldPassword"
														type="password"
														label="Contraseña vieja"
													/>
													<Typography
														variant="caption"
														className={classes.error}
													>
														<ErrorMessage name="oldPassword" />
													</Typography>

													<FieldText
														name="newPassword"
														type="password"
														label="Contraseña nueva"
													/>
													<Typography
														variant="caption"
														className={classes.error}
													>
														<ErrorMessage name="newPassword" />
													</Typography>

													<Button
														type="submit"
														disabled={isSubmitting}
														variant="contained"
														color="primary"
														className={classes.margin}
													>
														<Typography variant="button" color="secondary">
															Enviar
														</Typography>
													</Button>
												</Form>
											)}
										/>
									) : (
										<Loading />
									)}
								</Grid>
							</Grid>
						</Grid>
					</div>
				</Fragment>
			</Paper>
		);
	}
}

export default withStyles(styles)(Configuration);
