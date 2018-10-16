import React, { Fragment, PureComponent } from "react";
import Router from "next/router";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Build from "@material-ui/icons/Build";
import Check from "@material-ui/icons/Check";

import { logout } from "../../../../api/auth";
import { Consumer } from "../../../shared/ContextApi";

const randomColor =
	"#" +
	Math.random()
		.toString(16)
		.substr(-6);

class IsLoggedIn extends PureComponent {
	logoutUser = async () => {
		const { handleClose, state } = this.props;
		const response = await logout();

		handleClose();
		if (response.ok) {
			// Getting current user
			await state.actions.getMeUser();
			Router.push("/login");
		}
	};

	redirect = url => {
		const { handleClose } = this.props;
		handleClose();
		Router.push(url);
	};

	render() {
		const { name, openUser, handleMenuUser, handleClose } = this.props;
		return (
			<Fragment>
				<IconButton
					aria-owns={openUser ? "menu-appbar" : null}
					aria-haspopup="true"
					onClick={handleMenuUser}
					color="secondary"
				>
					<Avatar style={{ color: "#fff", backgroundColor: randomColor }}>
						{name.charAt(0)}
					</Avatar>
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
					onClose={handleClose}
				>
					<MenuItem onClick={() => this.redirect("/configuration")}>
						<Build style={{ paddingRight: 10 }} /> Configuración
					</MenuItem>
					<MenuItem onClick={() => this.logoutUser()}>
						<Check style={{ paddingRight: 10 }} /> Salir
					</MenuItem>
				</Menu>
			</Fragment>
		);
	}
}

const wrapperLoggedIn = React.forwardRef((props, ref) => (
	<Consumer>
		{state => <IsLoggedIn {...props} state={state} ref={ref} />}
	</Consumer>
));

export default wrapperLoggedIn;
