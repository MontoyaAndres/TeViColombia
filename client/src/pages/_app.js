import React from "react";
import NProgress from "nprogress";
import Head from "next/head";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";

import withApollo from "../lib/withApollo";
import { Router } from "../routes";
import Layout from "../components/layout";

// Loading route config
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <Head>
          <title>Te vi EPE</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
