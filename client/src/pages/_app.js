import React from "react";
import NProgress from "nprogress";
import Head from "next/head";
import App, { Container } from "next/app";

import { Router } from "../routes";
import Layout from "../components/layout";
import { Provider } from "../components/shared/contextApi";

// Loading route config
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Head>
          <title>Te vi EPE</title>
        </Head>
        <Provider>
          <Layout>
            <Component />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default MyApp;
