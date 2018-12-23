import React, { PureComponent, Fragment } from "react";
import dynamic from "next/dynamic";
import { Query } from "react-apollo";

import meQuery from "../graphql/queries/me";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const DynamicGeneralInformation = dynamic(
  () => import("../components/perfil/generalInformation"),
  {
    loading: () => <p>Loading...</p>
  }
);
const DynamicTrainingEmployment = dynamic(
  () => import("../components/perfil/trainingEmployment"),
  { loading: () => <p>Loading...</p> }
);
const DynamicFeedback = dynamic(() => import("../components/perfil/feedback"), {
  loading: () => <p>Loading...</p>
});
const DynameicCommercialEstablishment = dynamic(
  () => import("../components/perfil/commercialEstablishment"),
  { loading: () => <p>Loading...</p> }
);
const DynamicNecessity = dynamic(
  () => import("../components/perfil/necessity"),
  { loading: () => <p>Loading...</p> }
);

class perfil extends PureComponent {
  state = {
    value: 1
  };

  handleValue = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Query query={meQuery}>
        {({ loading, data: { me } }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          return (
            <Fragment>
              {me.routeCover ? (
                <div style={{ height: 300 }}>
                  <img
                    alt="user cover"
                    src={`http://localhost:4000/${me.routeCover}`}
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
                    src={`http://localhost:4000/${me.routePhoto}`}
                    alt="profile"
                  />
                </figure>
                <h3 className="title" style={{ textAlign: "center" }}>
                  {me.name} {me.lastname}
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

              {value === 1 && <DynamicGeneralInformation />}
              {value === 2 && <DynamicTrainingEmployment />}
              {value === 3 && <DynamicFeedback />}
              {value === 4 && <DynameicCommercialEstablishment />}
              {value === 5 && <DynamicNecessity />}
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

export default perfil;
