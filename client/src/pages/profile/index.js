import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import { Query } from "react-apollo";

import Loading from "../../components/shared/loading";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import { informationQuery } from "../../graphql/queries/account";

const DynamicGeneralInformation = dynamic(
  () => import("../../components/profile/generalInformation"),
  {
    loading: () => <Loading />
  }
);
const DynamicTrainingEmployment = dynamic(
  () => import("../../components/profile/trainingEmployment"),
  { loading: () => <Loading /> }
);
const DynamicFeedback = dynamic(
  () => import("../../components/profile/feedback"),
  {
    loading: () => <Loading />
  }
);
const DynameicCommercialEstablishment = dynamic(
  () => import("../../components/profile/commercialEstablishment"),
  { loading: () => <Loading /> }
);
const DynamicNecessity = dynamic(
  () => import("../../components/profile/necessity"),
  { loading: () => <Loading /> }
);

class profile extends PureComponent {
  state = {
    value: 1
  };

  componentDidUpdate(prevProps) {
    // If the user changes to other profile, reset value.
    if (prevProps.router.query !== this.props.router.query) {
      this.handleValue(1);
    }
  }

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
      <Query query={informationQuery} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) {
            return <Loading />;
          }

          if (!data.information) {
            return <Error statusCode={404} />;
          }

          return (
            <>
              {data.information.routeCover ? (
                <div className="background-cover">
                  <img
                    alt="user cover"
                    src={`http://localhost:4000/${data.information.routeCover}`}
                  />
                </div>
              ) : (
                <div className="background-cover" />
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
                <h3 className="subtitle" style={{ textAlign: "center" }}>
                  {data.information.description}
                </h3>
                <div className="tabs is-medium is-centered">
                  <ul>
                    <li
                      className={`${value === 1 ? "is-active" : ""}`}
                      onClick={() => this.handleValue(1)}
                    >
                      <a>Información general</a>
                    </li>
                    {data.information.study.length &&
                    data.information.work.length ? (
                      <li
                        className={`${value === 2 ? "is-active" : ""}`}
                        onClick={() => this.handleValue(2)}
                      >
                        <a>Formación y empleo</a>
                      </li>
                    ) : null}
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
                      <a>Necesidades</a>
                    </li>
                  </ul>
                </div>
              </div>

              {value === 1 && (
                <DynamicGeneralInformation information={data.information} />
              )}
              {value === 2 && (
                <DynamicTrainingEmployment information={data.information} />
              )}
              {value === 3 && <DynamicFeedback id={id} />}
              {value === 4 && (
                <DynameicCommercialEstablishment
                  information={data.information}
                />
              )}
              {value === 5 && <DynamicNecessity id={id} />}
            </>
          );
        }}
      </Query>
    );
  }
}

profile.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default withRouter(profile);
