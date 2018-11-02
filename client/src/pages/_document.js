import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

class MyDocument extends Document {
	render() {
		const { pageContext } = this.props;

		return (
			<html lang="es" dir="ltr">
				<Head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
					<meta
						name="theme-color"
						content={pageContext.theme.palette.primary.main}
					/>
					<meta
						name="description"
						content="Herramienta para la gestión estratégica organizacional para el sector productivo de la ciudad de Girardot."
					/>
					<link rel="manifest" href="static/manifest.json" />
					<link rel="shortcut icon" href="static/favicon.ico" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content={pageContext.theme.palette.primary.main}
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="apple-mobile-web-app-title" content="SEMontoya" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="static/img/apple-touch-icon.png"
					/>
					<link
						rel="mask-icon"
						href="static/img/safari-pinned-tab.svg"
						color={pageContext.theme.palette.primary.main}
					/>
					<meta
						name="msapplication-TileColor"
						content={pageContext.theme.palette.primary.main}
					/>
					<meta
						name="msapplication-TileImage"
						content="static/icons/icon-192x192.png"
					/>
					<meta
						property="og:title"
						content="Herramienta para la gestión estratégica organizacional para el sector productivo de la ciudad de Girardot."
					/>
					<meta property="og:locale" content="es_CO" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="icons/icon-128x128.png" />
					<meta property="og:site_name" content="SEMontoya" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
					<link rel="stylesheet" href="static/css/nprogress.css" />
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
