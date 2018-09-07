// CODE FROM: https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js

import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

class MyDocument extends Document {
	render() {
		const { pageContext } = this.props;

		return (
			<html lang="es" dir="ltr">
				<Head>
					<title>My page</title>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
					<meta
						name="theme-color"
						content={pageContext.theme.palette.primary.main}
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

MyDocument.getInitialProps = ctx => {
	// Render app and page and get the context of the page with collected side effects.
	let pageContext;
	const page = ctx.renderPage(Component => {
		const WrappedComponent = props => {
			pageContext = props.pageContext;
			return <Component {...props} />;
		};

		return WrappedComponent;
	});

	return {
		...page,
		pageContext,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: (
			<React.Fragment>
				<style
					id="jss-server-side"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: pageContext.sheetsRegistry.toString()
					}}
				/>
				{flush() || null}
			</React.Fragment>
		)
	};
};

export default MyDocument;
