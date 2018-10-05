import React, { Fragment, PureComponent } from "react";
import { Form, withFormik, ErrorMessage } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import FieldText from "../../shared/FieldText";
import { CreateMatrixValidation } from "../../../utils/validation";

const styles = theme => ({
	root: {
		margin: "0 auto",
		maxWidth: "90%",
		paddingTop: "8%"
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2
	},
	resetContainer: {
		padding: theme.spacing.unit * 3
	}
});

const steps = ["Nombre del proyecto", "Create an ad group", "Create an ad"];

function getStepContent(step) {
	switch (step) {
		case 0:
			return (
				<Fragment>
					<Typography>
						Añada un título que identifique la matriz a elaborar. Recuerde que
						debe ser mayor a 5 y menor que 100 caracteres.
					</Typography>
					<FieldText name="title" type="text" label="Título" />
					<Typography variant="caption" style={{ color: "red", fontSize: 14 }}>
						<ErrorMessage name="title" />
					</Typography>
				</Fragment>
			);
		case 1:
			return "An ad group contains one or more ads which target a shared set of keywords.";
		case 2:
			return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
		default:
			return "Unknown step";
	}
}

class index extends PureComponent {
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleReset = () => {
		const { resetForm } = this.props;

		this.setState({
			activeStep: 0
		});
		resetForm();
	};

	render() {
		const { classes, handleSubmit, isSubmitting } = this.props;
		const { activeStep } = this.state;

		return (
			<div className={classes.root}>
				<Form method="POST" onSubmit={handleSubmit}>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, key) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>

								<StepContent>
									{/* Depending of the number key, some component will render. */}
									{getStepContent(key)}

									<div className={classes.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={this.handleBack}
												className={classes.button}
											>
												Atrás
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={this.handleNext}
												className={classes.button}
											>
												{activeStep === steps.length - 1
													? "Finalizar"
													: "Siguiente"}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length && (
						<Paper square elevation={0} className={classes.resetContainer}>
							<Typography>Todos los pasos han sido completados!</Typography>

							<Button onClick={this.handleReset} className={classes.button}>
								Reiniciar
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
					)}
				</Form>
			</div>
		);
	}
}

export default withFormik({
	mapPropsToValues: () => ({
		title: ""
	}),
	validationSchema: CreateMatrixValidation,
	handleSubmit: async (values, { setSubmitting }) => {
		console.log(values);
		setSubmitting(false);
	}
})(withStyles(styles)(index));
