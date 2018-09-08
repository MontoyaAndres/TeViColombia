import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Build from "@material-ui/icons/Build";
import Check from "@material-ui/icons/Check";

import Home from "./List/Home";

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
		const { classes } = this.props;
		const { open, openUser } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
							onClick={this.handleMenuModal}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="title"
							color="inherit"
							className={classes.root}
						>
							TecnoReciclaje
						</Typography>

						<IconButton
							aria-owns={openUser ? "menu-appbar" : null}
							aria-haspopup="true"
							onClick={this.handleMenuUser}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={openUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={!!openUser}
							onClose={this.handleClose}
						>
							<MenuItem>
								<Build style={{ paddingRight: 10 }} /> Configuración
							</MenuItem>
							<MenuItem>
								<Check style={{ paddingRight: 10 }} /> Salir
							</MenuItem>
						</Menu>
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
