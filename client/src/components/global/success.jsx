import React, { PureComponent } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class success extends PureComponent {
	state = {
		hide: false
	};

	componentWillReceiveProps(nextProps) {
		this.setState({ hide: nextProps.hide });
	}

	handleHide = () => {
		this.setState({ hide: false });
	};

	render() {
		const { hide } = this.state;
		const { message } = this.props;

		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={hide}
					onClose={this.handleHide}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={<span id="message-id">{message}</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={this.handleHide}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

export default success;
