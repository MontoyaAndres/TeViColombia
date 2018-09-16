import React, { PureComponent } from "react";

import { login, logout } from "../../api/auth";
import { me } from "../../api/user";

const Context = React.createContext();

export class Provider extends PureComponent {
	state = {
		response: {}
	};

	async componentWillMount() {
		const { response } = this.state;

		if (!Object.keys(response).length) {
			await this.getMeUser();
		}
	}

	getMeUser = async () => {
		const response = await me();

		this.setState({ response });
	};

	loginUser = async credentials => {
		const response = await login(credentials);

		if (response.ok) {
			this.getMeUser();
		} else {
			this.setState({ response });
		}
	};

	logoutUser = async () => {
		const response = await logout();

		if (response.ok) {
			this.getMeUser();
		} else {
			this.setState({ response });
		}
	};

	render() {
		return (
			<Context.Provider
				value={{
					response: this.state.response,
					actions: {
						loginUser: this.loginUser,
						logoutUser: this.logoutUser
					}
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
