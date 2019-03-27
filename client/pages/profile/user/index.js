import React from "react";
import { withRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import { compose, graphql } from "react-apollo";

import Loading from "../../../components/shared/loading";
import checkLoggedIn from "../../../lib/checkLoggedIn";
import redirect from "../../../lib/redirect";
import {
  informationQuery,
  necessityQuery as countNecessityQuery
} from "../../../graphql/queries/account";
import ProfileContainer from "../../../containers/profile";
import GeneralInformation from "../../../components/user/generalInformation";
import TrainingEmployment from "../../../components/user/trainingEmployment";
import Feedback from "../../../components/feedback";
import Member from "../../../components/member";
import Necessity from "../../../components/user/necessity";

const DynamicPortfolio = dynamic(
  () => import("../../../components/portfolio"),
  { loading: () => <Loading />, ssr: false }
);

const user = ({
  router: {
    query: { id }
  },
  loadingInformation,
  loadingCountNecessity,
  dataInformation,
  dataCountNecessity
}) => {
  if (loadingCountNecessity || loadingInformation) {
    return (
      <div className="dynamic-height">
        <Loading />
      </div>
    );
  }

  if (!dataInformation) {
    return <Error statusCode={404} />;
  }

  return (
    <ProfileContainer
      routeCover={dataInformation.routeCover}
      routePhoto={dataInformation.routePhoto}
      name={dataInformation.name}
      lastname={dataInformation.lastname}
      description={dataInformation.description}
      id={id}
    >
      {({ value, setValue }) => (
        <>
          <div className="tabs is-medium is-centered is-boxed">
            <ul>
              <li
                className={value === 1 ? "is-active" : ""}
                onClick={() => setValue(1)}
              >
                <a>Información general</a>
              </li>
              {dataInformation.study.length ||
              dataInformation.work.length ||
              dataInformation.cv.length ? (
                <li
                  className={value === 2 ? "is-active" : ""}
                  onClick={() => setValue(2)}
                >
                  <a>Formación y empleo</a>
                </li>
              ) : null}
              <li
                className={value === 3 ? "is-active" : ""}
                onClick={() => setValue(3)}
              >
                <a>Empresa</a>
              </li>
              <li
                className={value === 4 ? "is-active" : ""}
                onClick={() => setValue(4)}
              >
                <a>Feedback</a>
              </li>
              <li
                className={value === 5 ? "is-active" : ""}
                onClick={() => setValue(5)}
              >
                <a>
                  Necesidades
                  <span className="tag is-primary" style={{ fontSize: 15 }}>
                    {dataCountNecessity && dataCountNecessity.count}
                  </span>
                </a>
              </li>
              <li
                className={value === 6 ? "is-active" : ""}
                onClick={() => setValue(6)}
              >
                <a>Portafolio</a>
              </li>
            </ul>
          </div>

          {value === 1 && <GeneralInformation information={dataInformation} />}
          {value === 2 && <TrainingEmployment information={dataInformation} />}
          {value === 3 && <Member information={dataInformation.member} />}
          {value === 4 && <Feedback id={id} type="User" />}
          {value === 5 && <Necessity id={id} />}
          {value === 6 && <DynamicPortfolio id={id} />}
        </>
      )}
    </ProfileContainer>
  );
};

user.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default compose(
  withRouter,
  graphql(countNecessityQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { userId: id } }),
    props: ({ data }) => ({
      loadingCountNecessity: data.loading,
      dataCountNecessity: data.necessity
    })
  }),
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
  })
)(user);
