import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import App, { Container } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../utils/getPageContext";

import Layout from "../components/global/layout";
import { me } from "../api/user";

// Loading route config
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
	constructor(props) {
		super(props);
		this.pageContext = getPageContext();
		this.state = {
			response: {}
		};
	}

	pageContext = null;

	async componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}

		const response = await me();
		this.setState({ response });
	}

	render() {
		const { Component, pageProps } = this.props;
		const { response } = this.state;

		return (
			<Container>
				<JssProvider
					registry={this.pageContext.sheetsRegistry}
					generateClassName={this.pageContext.generateClassName}
				>
					<MuiThemeProvider
						theme={this.pageContext.theme}
						sheetsManager={this.pageContext.sheetsManager}
					>
						<CssBaseline />
						<Layout data={response}>
							<Component pageContext={this.pageContext} {...pageProps} />
						</Layout>
					</MuiThemeProvider>
				</JssProvider>
			</Container>
		);
	}
}

export default MyApp;
