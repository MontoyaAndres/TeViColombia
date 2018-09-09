import React, { PureComponent } from "react";
import Router from "next/router";

import { me } from "../api/user";
import Loading from "../components/global/loading";

export default function withAuth(AuthComponent) {
	return class Authenticated extends PureComponent {
		state = {
			isLoading: true
		};

		async componentDidMount() {
			const response = await me();
			if (response.ok) {
				Router.replace("/");
			}
			this.setState({ isLoading: false });
		}

		render() {
			const { isLoading } = this.state;
			return (
				<div>{isLoading ? <Loading /> : <AuthComponent {...this.props} />}</div>
			);
		}
	};
}
