import React, { Fragment, PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Help from "@material-ui/icons/Help";

import MatricesList from "./MatricesList";
import About from "./about";
import CreateMatrix from "./createMatrix";

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	}
});

class NewProject extends PureComponent {
	state = {
		help: false,
		newMatrix: false,
		name: "",
		link: ""
	};

	aboutMatrix = name => {
		const { help } = this.state;
		this.setState({ help: !help, name });
	};

	createNewMatrix = (name, link) => {
		const { newMatrix } = this.state;
		this.setState({ newMatrix: !newMatrix, name, link });
	};

	render() {
		const { classes } = this.props;
		const { help, newMatrix, name, link } = this.state;

		return (
			<Fragment>
				{/* If newMatrix is true, the user can create its own matrix. */}
				{newMatrix ? (
					<CreateMatrix
						closeWindow={this.createNewMatrix}
						name={name}
						link={link}
					/>
				) : (
					<Paper className={classes.root} elevation={1}>
						<List component="nav">
							{MatricesList.list.map((matrix, key) => (
								<Fragment key={key}>
									<ListItem
										button
										onClick={() =>
											this.createNewMatrix(matrix.name, matrix.link)
										}
									>
										<ListItemIcon>
											<Add />
										</ListItemIcon>
										<ListItemText inset primary={matrix.name} />
										<ListItemSecondaryAction
											onClick={() => this.aboutMatrix(matrix.name)}
										>
											<IconButton aria-label="about">
												<Help />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider />
								</Fragment>
							))}

							{/* When open is true, it'll show the help about any matrix. */}
							{help && (
								<About open={help} closeWindow={this.aboutMatrix} name={name} />
							)}
						</List>
					</Paper>
				)}
			</Fragment>
		);
	}
}

export default withStyles(styles)(NewProject);
