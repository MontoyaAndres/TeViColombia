import React from "react";
import { withRouter } from "next/router";
import { compose, graphql } from "react-apollo";
import Error from "next/error";
import dynamic from "next/dynamic";

import { informationBusinessQuery } from "../../../graphql/queries/account";
import ProfileContainer from "../../../containers/profile";
import Loading from "../../../components/shared/loading";
import GeneralInformation from "../../../components/business/generalInformation";
import Member from "../../../components/member";
import Employ from "../../../components/business/employ";
import Feedback from "../../../components/feedback";

const DynamicPortfolio = dynamic(
  () => import("../../../components/portfolio"),
  { loading: () => <Loading />, ssr: false }
);

const business = ({
  router: {
    query: { id }
  },
  loadingInformationBusiness,
  dataInformationBusiness
}) => {
  if (loadingInformationBusiness) {
    return <Loading />;
  }

  if (!dataInformationBusiness) {
    return <Error statusCode={404} />;
  }

  return (
    <ProfileContainer
      routeCover={dataInformationBusiness.routeCover}
      routePhoto={dataInformationBusiness.routePhoto}
      name={dataInformationBusiness.name}
      description={dataInformationBusiness.description}
      id={id}
    >
      {({ value, setValue }) => (
        <>
          <div className="tabs is-medium is-centered">
            <ul>
              <li
                className={value === 1 ? "is-active" : ""}
                onClick={() => setValue(1)}
              >
                <a>Información general</a>
              </li>
              <li
                className={value === 2 ? "is-active" : ""}
                onClick={() => setValue(2)}
              >
                <a>Empleo</a>
              </li>
              <li
                className={value === 3 ? "is-active" : ""}
                onClick={() => setValue(3)}
              >
                <a>Integrantes</a>
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
                <a>Portafolio</a>
              </li>
            </ul>
          </div>

          {value === 1 && (
            <GeneralInformation information={dataInformationBusiness} />
          )}
          {value === 2 && <Employ id={id} />}
          {value === 3 && (
            <Member information={dataInformationBusiness.member} />
          )}
          {value === 4 && <Feedback id={id} />}
          {value === 5 && <DynamicPortfolio id={id} />}
        </>
      )}
    </ProfileContainer>
  );
};

export default compose(
  withRouter,
  graphql(informationBusinessQuery, {
    options: ({
      router: {
        query: { id }
      }
    }) => ({ variables: { id } }),
    props: ({ data }) => ({
      loadingInformationBusiness: data.loading,
      dataInformationBusiness: data.informationBusiness
    })
  })
)(business);
