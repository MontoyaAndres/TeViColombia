import React from "react";
import Head from "next/head";
import { getDataFromTree } from "react-apollo";

import initApollo from "./initApollo";

function getCookie(req) {
  return req ? (req.headers.cookie ? req.headers.cookie : "") : document.cookie;
}

export default App =>
  class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;
      const apollo = initApollo(
        {},
        {
          getToken: () => getCookie(req)
        }
      );

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => getCookie()
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
