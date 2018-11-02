import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import App, { Container } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";

import getPageContext from "../utils/getPageContext";
import Layout from "../components/global/layout";
import { Provider } from "../components/shared/ContextApi";

// Loading route config
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
	constructor(props) {
		super(props);
		this.pageContext = getPageContext();
	}

	pageContext = null;

	async componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<Head>
					<title>SEMontoya</title>
				</Head>
				<JssProvider
					registry={this.pageContext.sheetsRegistry}
					generateClassName={this.pageContext.generateClassName}
				>
					<MuiThemeProvider
						theme={this.pageContext.theme}
						sheetsManager={this.pageContext.sheetsManager}
					>
						<CssBaseline />
						<Provider>
							<Layout>
								<Component pageContext={this.pageContext} {...pageProps} />
							</Layout>
						</Provider>
					</MuiThemeProvider>
				</JssProvider>
			</Container>
		);
	}
}

export default MyApp;
