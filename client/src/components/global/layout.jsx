import React, { Fragment } from "react";
import NProgress from "nprogress";
import Router from "next/router";

import Menu from "./menu";

// Loading route config
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const layout = ({ children, data }) => (
	<Fragment>
		{console.log("layout", data)}
		<Menu data={data} />
		{children}
	</Fragment>
);

export default layout;
