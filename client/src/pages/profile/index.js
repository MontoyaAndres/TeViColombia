import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import { compose, graphql } from "react-apollo";

import Loading from "../../components/shared/loading";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import {
  informationQuery,
  countNecessityQuery
} from "../../graphql/queries/account";

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
      },
      loadingInformation,
      loadingCountNecessity,
      dataInformation,
      dataCountNecessity
    } = this.props;

    if (loadingInformation && loadingCountNecessity) {
      return <Loading />;
    }

    if (!dataInformation) {
      return <Error statusCode={404} />;
    }

    return (
      <>
        {dataInformation.routeCover ? (
          <div className="background-cover">
            <img
              src={`http://localhost:4000/${dataInformation.routeCover}`}
              alt="user cover"
            />
          </div>
        ) : (
          <div className="background-cover" />
        )}

        <div
          style={{
            display: "block",
            position: "relative",
            width: 200,
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          <figure className="avatar-profile">
            <img
              style={{ width: 200, height: 200 }}
              src={`http://localhost:4000/${dataInformation.routePhoto}`}
              alt="profile"
            />
          </figure>
        </div>

        <h3 className="title" style={{ textAlign: "center" }}>
          {dataInformation.name} {dataInformation.lastname}
        </h3>
        <h3 className="subtitle" style={{ textAlign: "center" }}>
          {dataInformation.description}
        </h3>
        <div className="tabs is-medium is-centered">
          <ul>
            <li
              className={value === 1 ? "is-active" : ""}
              onClick={() => this.handleValue(1)}
            >
              <a>Información general</a>
            </li>
            {dataInformation.study.length && dataInformation.work.length ? (
              <li
                className={value === 2 ? "is-active" : ""}
                onClick={() => this.handleValue(2)}
              >
                <a>Formación y empleo</a>
              </li>
            ) : null}
            <li
              className={value === 3 ? "is-active" : ""}
              onClick={() => this.handleValue(3)}
            >
              <a>Feedback</a>
            </li>
            <li
              className={value === 4 ? "is-active" : ""}
              onClick={() => this.handleValue(4)}
            >
              <a>Mi negocio</a>
            </li>
            <li
              className={value === 5 ? "is-active" : ""}
              onClick={() => this.handleValue(5)}
            >
              <a>
                Necesidades
                <span className="tag is-primary">{dataCountNecessity}</span>
              </a>
            </li>
          </ul>
        </div>

        {value === 1 && (
          <DynamicGeneralInformation information={dataInformation} />
        )}
        {value === 2 && (
          <DynamicTrainingEmployment information={dataInformation} />
        )}
        {value === 3 && <DynamicFeedback id={id} />}
        {value === 4 && (
          <DynameicCommercialEstablishment information={dataInformation} />
        )}
        {value === 5 && <DynamicNecessity id={id} />}
      </>
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

export default compose(
  withRouter,
  graphql(informationQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { id } }),
    props: ({ data }) => ({
      loadingInformation: data.loading,
      dataInformation: data.information
    })
  }),
  graphql(countNecessityQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { userId: id } }),
    props: ({ data }) => ({
      loadingCountNecessity: data.loading,
      dataCountNecessity: data.countNecessity
    })
  })
)(profile);
