import React, { PureComponent, Fragment } from "react";
import { withRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Loading from "../components/shared/loading";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const DynamicGeneralInformation = dynamic(
  () => import("../components/perfil/generalInformation"),
  {
    loading: () => <Loading />
  }
);
const DynamicTrainingEmployment = dynamic(
  () => import("../components/perfil/trainingEmployment"),
  { loading: () => <Loading /> }
);
const DynamicFeedback = dynamic(() => import("../components/perfil/feedback"), {
  loading: () => <Loading />
});
const DynameicCommercialEstablishment = dynamic(
  () => import("../components/perfil/commercialEstablishment"),
  { loading: () => <Loading /> }
);
const DynamicNecessity = dynamic(
  () => import("../components/perfil/necessity"),
  { loading: () => <Loading /> }
);

const information = gql`
  query Information($id: ID!) {
    information(id: $id) {
      routePhoto
      routeCover
      name
      lastname
    }
  }
`;

class perfil extends PureComponent {
  state = {
    value: 1
  };

  handleValue = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const {
      router: {
        query: { id }
      }
    } = this.props;

    return (
      <Query query={information} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }

          if (!data.information) {
            return <Error statusCode={404} />;
          }

          return (
            <Fragment>
              {data.information.routeCover ? (
                <div style={{ height: 300 }}>
                  <img
                    alt="user cover"
                    src={`http://localhost:4000/${data.information.routeCover}`}
                  />
                </div>
              ) : (
                <div style={{ height: 300, backgroundColor: "#00ffd9" }} />
              )}

              <div className="container is-fullhd">
                <figure
                  className="avatar-profile"
                  style={{ textAlign: "center" }}
                >
                  <img
                    style={{ width: 200 }}
                    src={`http://localhost:4000/${data.information.routePhoto}`}
                    alt="profile"
                  />
                </figure>
                <h3 className="title" style={{ textAlign: "center" }}>
                  {data.information.name} {data.information.lastname}
                </h3>
                <div className="tabs is-medium is-centered">
                  <ul>
                    <li
                      className={`${value === 1 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(1)}
                    >
                      <a>Información general</a>
                    </li>
                    <li
                      className={`${value === 2 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(2)}
                    >
                      <a>Formación y empleo</a>
                    </li>
                    <li
                      className={`${value === 3 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(3)}
                    >
                      <a>Feedback</a>
                    </li>
                    <li
                      className={`${value === 4 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(4)}
                    >
                      <a>Mi negocio</a>
                    </li>
                    <li
                      className={`${value === 5 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(5)}
                    >
                      <a>Necesidad</a>
                    </li>
                  </ul>
                </div>
              </div>

              {value === 1 && <DynamicGeneralInformation id={id} />}
              {value === 2 && <DynamicTrainingEmployment id={id} />}
              {value === 3 && <DynamicFeedback id={id} />}
              {value === 4 && <DynameicCommercialEstablishment id={id} />}
              {value === 5 && <DynamicNecessity id={id} />}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

perfil.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default withRouter(perfil);
