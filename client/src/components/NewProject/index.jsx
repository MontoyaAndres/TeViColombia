import React, { Fragment, PureComponent, lazy, Suspense } from "react";
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

import Loading from "../global/loading";
import MatricesList from "./MatricesList";

const About = lazy(() => import("./about"));
const CreateMatrix = lazy(() => import("./createMatrix"));

const styles = theme => ({
	root: {
		padding: theme.spacing.unit
	}
});

class NewProject extends PureComponent {
	state = {
		help: false,
		newMatrix: false,
		name: ""
	};

	aboutMatrix = name => {
		const { help } = this.state;
		this.setState({ help: !help, name });
	};

	createNewMatrix = name => {
		const { newMatrix } = this.state;
		this.setState({ newMatrix: !newMatrix, name });
	};

	render() {
		const { classes } = this.props;
		const { help, newMatrix, name } = this.state;

		return (
			<Fragment>
				{/* If newMatrix is true, the user can create its own matrix. */}
				{newMatrix ? (
					<Suspense fallback={<Loading />}>
						<CreateMatrix closeWindow={this.createNewMatrix} name={name} />
					</Suspense>
				) : (
					<Paper className={classes.root} elevation={1}>
						<List component="nav">
							{MatricesList.list.map((matrix, key) => (
								<Fragment key={key}>
									<ListItem
										button
										onClick={() => this.createNewMatrix(matrix.name)}
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
								<Suspense fallback={<Loading />}>
									<About
										open={help}
										closeWindow={this.aboutMatrix}
										name={name}
									/>
								</Suspense>
							)}
						</List>
					</Paper>
				)}
			</Fragment>
		);
	}
}

export default withStyles(styles)(NewProject);
