import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import App, { Container } from "next/app";

import Layout from "../components/layout";

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
        <Layout>
          <Component />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
