import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";

import Home from "./List/Home";
import IsLoggedIn from "./Auth/isLoggedIn";
import IsNotLoggedIn from "./Auth/isNotLoggedIn";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	list: {
		width: 250
	}
});

class index extends PureComponent {
	state = {
		open: false,
		openUser: null
	};

	handleMenuModal = () => {
		const { open } = this.state;

		this.setState({ open: !open });
	};

	handleMenuUser = event => {
		this.setState({ openUser: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ openUser: null });
	};

	render() {
		const { classes, data } = this.props;
		const { open, openUser } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							className={classes.menuButton}
							color="secondary"
							aria-label="Menu"
							onClick={this.handleMenuModal}
						>
							<MenuIcon />
						</IconButton>
						<div className={classes.root}>
							<Hidden smDown>
								<Typography variant="title" color="secondary">
									TecnoReciclaje
								</Typography>
							</Hidden>
						</div>

						{data && data.ok ? (
							<IsLoggedIn
								openUser={openUser}
								handleMenuUser={this.handleMenuUser}
								handleClose={this.handleClose}
								name={data.me.name}
							/>
						) : (
							<IsNotLoggedIn handleClose={this.handleClose} />
						)}
					</Toolbar>
				</AppBar>
				<Drawer open={open} onClose={this.handleMenuModal}>
					<div tabIndex={0} role="button" onKeyDown={this.handleMenuModal}>
						<div className={classes.header}>
							<IconButton onClick={this.handleMenuModal}>
								<MenuIcon />
							</IconButton>
							<div style={{ margin: "0 auto", height: "100%" }}>image</div>
						</div>
						<div className={classes.list}>
							<List>
								<Home onHandleClose={this.handleMenuModal} />
							</List>
						</div>
					</div>
				</Drawer>
			</div>
		);
	}
}

export default withStyles(styles)(index);
