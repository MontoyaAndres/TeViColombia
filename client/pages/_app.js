import React from "react";
import NProgress from "nprogress";
import Head from "next/head";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import Router from "next/router";
import { register, unregister } from "next-offline/runtime";

import withApollo from "../lib/withApollo";
import Layout from "../components/layout";

// Loading route config
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  componentDidMount() {
    register();
  }

  componentWillUnmount() {
    unregister();
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <Head>
          <title>Te vi Colombia</title>
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
