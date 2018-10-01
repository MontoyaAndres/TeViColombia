import React, { Fragment, PureComponent } from "react";
import Link from "next/link";
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

import MatricesList from "../../static/MatricesList";
import About from "./about";

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
		open: false,
		name: ""
	};

	aboutMatrix = name => {
		const { open } = this.state;
		this.setState({ open: !open, name });
	};

	render() {
		const { classes } = this.props;
		const { open, name } = this.state;

		return (
			<Paper className={classes.root} elevation={1}>
				<List component="nav">
					{MatricesList.list.map((matrix, key) => (
						<Fragment key={key}>
							<Link href={matrix.link} prefetch passHref>
								<ListItem button>
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
							</Link>
							<Divider />
						</Fragment>
					))}
					{open && (
						<About open={open} closeWindow={this.aboutMatrix} name={name} />
					)}
				</List>
			</Paper>
		);
	}
}

export default withStyles(styles)(NewProject);
