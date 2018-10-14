import React, { PureComponent, Fragment } from "react";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

import { users } from "../../../../api/user";

const styles = theme => ({
	chip: {
		margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
	},
	inputRoot: {
		flexWrap: "wrap"
	},
	inputInput: {
		width: "auto",
		flexGrow: 1
	}
});

function renderInput(inputProps) {
	const { InputProps, ref, classes, ...other } = inputProps;

	return (
		<TextField
			InputProps={{
				inputRef: ref,
				classes: {
					root: classes.inputRoot,
					input: classes.inputInput
				},
				...InputProps
			}}
			{...other}
		/>
	);
}

class Autocompleter extends PureComponent {
	state = {
		data: [],
		inputValue: "",
		selectedItem: []
	};

	fetchUsers = async event => {
		if (!event.target.value) {
			return;
		}

		const response = await users(event.target.value);

		this.setState({ data: response.users });
	};

	handleChange = item => {
		let { selectedItem } = this.state;

		if (selectedItem.indexOf(item) === -1) {
			selectedItem = [...selectedItem, item];
		}

		this.setState({
			inputValue: "",
			selectedItem
		});
	};

	handleInputChange = event => {
		this.setState({ inputValue: event.target.value });
		this.fetchUsers(event);
	};

	handleDelete = item => () => {
		this.setState(state => {
			const selectedItem = [...state.selectedItem];
			selectedItem.splice(selectedItem.indexOf(item), 1);
			return { selectedItem };
		});
	};

	render() {
		const { inputValue, selectedItem, data } = this.state;
		const { classes } = this.props;

		return (
			<Downshift
				inputValue={inputValue}
				onChange={this.handleChange}
				selectedItem={selectedItem}
			>
				{({ getInputProps, getItemProps, isOpen, highlightedIndex }) => (
					<div>
						{renderInput({
							fullWidth: true,
							classes,
							InputProps: getInputProps({
								startAdornment: selectedItem.map(item => (
									<Chip
										key={item}
										tabIndex={-1}
										label={item}
										className={classes.chip}
										onDelete={this.handleDelete(item)}
									/>
								)),
								onChange: this.handleInputChange,
								placeholder: "Selección multiple"
							})
						})}
						{isOpen ? (
							<Fragment>
								{data.slice(0, 10).map((item, index) => (
									<MenuItem
										{...getItemProps({
											item: `${item.name} ${item.lastname}`
										})}
										key={item.id}
										selected={highlightedIndex === index}
										component="div"
									>
										{`${item.name} ${item.lastname}`}
									</MenuItem>
								))}
							</Fragment>
						) : null}
					</div>
				)}
			</Downshift>
		);
	}
}

export default withStyles(styles)(Autocompleter);
