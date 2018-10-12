// Example code from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/autocomplete/IntegrationReactSelect.js

import React, { PureComponent } from "react";
import Select from "react-select";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

const suggestions = [
	{ label: "Afghanistan" },
	{ label: "Aland Islands" },
	{ label: "Albania" },
	{ label: "Algeria" },
	{ label: "American Samoa" },
	{ label: "Andorra" },
	{ label: "Angola" },
	{ label: "Anguilla" },
	{ label: "Antarctica" },
	{ label: "Antigua and Barbuda" },
	{ label: "Argentina" },
	{ label: "Armenia" },
	{ label: "Aruba" },
	{ label: "Australia" },
	{ label: "Austria" },
	{ label: "Azerbaijan" },
	{ label: "Bahamas" },
	{ label: "Bahrain" },
	{ label: "Bangladesh" },
	{ label: "Barbados" },
	{ label: "Belarus" },
	{ label: "Belgium" },
	{ label: "Belize" },
	{ label: "Benin" },
	{ label: "Bermuda" },
	{ label: "Bhutan" },
	{ label: "Bolivia, Plurinational State of" },
	{ label: "Bonaire, Sint Eustatius and Saba" },
	{ label: "Bosnia and Herzegovina" },
	{ label: "Botswana" },
	{ label: "Bouvet Island" },
	{ label: "Brazil" },
	{ label: "British Indian Ocean Territory" },
	{ label: "Brunei Darussalam" }
].map(suggestion => ({
	value: suggestion.label,
	label: suggestion.label
}));

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	input: {
		display: "flex",
		padding: 0
	},
	valueContainer: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1,
		alignItems: "center"
	},
	chip: {
		margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === "light"
				? theme.palette.grey[300]
				: theme.palette.grey[700],
			0.08
		)
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	placeholder: {
		position: "absolute",
		left: 2,
		fontSize: 16
	}
});

function NoOptionsMessage(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			No se encontraron resultados.
		</Typography>
	);
}

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />;
}

function Control(props) {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps
				}
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

function Placeholder(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.placeholder}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function ValueContainer(props) {
	return (
		<div className={props.selectProps.classes.valueContainer}>
			{props.children}
		</div>
	);
}

function MultiValue(props) {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={classNames(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused
			})}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
}

const components = {
	Control,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	ValueContainer
};

class Autocompleter extends PureComponent {
	state = {
		coworkers: null
	};

	handleChange = value => {
		this.setState({
			coworkers: value
		});
	};

	render() {
		const { classes, theme } = this.props;
		const { coworkers } = this.state;

		const selectStyles = {
			input: base => ({
				...base,
				color: theme.palette.text.primary,
				"& input": {
					font: "inherit"
				}
			})
		};

		return (
			<div className={classes.root}>
				<NoSsr>
					<Select
						classes={classes}
						styles={selectStyles}
						options={suggestions}
						components={components}
						value={coworkers}
						onChange={this.handleChange}
						placeholder="Seleccionar"
						isMulti
					/>
				</NoSsr>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(Autocompleter);
