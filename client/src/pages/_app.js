import React from "react";
import App, { Container } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../utils/getPageContext";

import Layout from "../components/global/layout";
import { me } from "../api/user";

class MyApp extends App {
	constructor(props) {
		super(props);
		this.pageContext = getPageContext();
	}

	pageContext = null;

	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	static async getInitialProps() {
		const response = await me();
		console.log("app", response);

		if (response.ok) {
			return { response };
		}

		return {};
	}

	render() {
		const { Component, pageProps, response } = this.props;
		console.log("app2", response);

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
							<Component
								pageContext={this.pageContext}
								data={response}
								{...pageProps}
							/>
						</Layout>
					</MuiThemeProvider>
				</JssProvider>
			</Container>
		);
	}
}

export default MyApp;
