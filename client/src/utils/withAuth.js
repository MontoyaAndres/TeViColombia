import React, { PureComponent } from "react";
import Router from "next/router";

import Loading from "../components/global/loading";
import { me } from "../api/user";

export default function withAuth(AuthComponent) {
	return class Authenticated extends PureComponent {
		state = {
			isLoading: true,
			data: ""
		};

		async componentDidMount() {
			try {
				const response = await me();
				this.setState({ isLoading: false, data: response });
			} catch (err) {
				Router.push("/login");
			}
		}

		render() {
			return (
				<div>
					{this.state.isLoading ? (
						<Loading />
					) : (
						<AuthComponent data={this.state.data} {...this.props} />
					)}
				</div>
			);
		}
	};
}
