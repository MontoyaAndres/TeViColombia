import React from "react";
import { withRouter } from "next/router";
import { compose, graphql } from "react-apollo";
import Error from "next/error";
import dynamic from "next/dynamic";

import { informationBusinessQuery } from "../../../graphql/queries/account";
import ProfileContainer from "../../../containers/profile";
import Loading from "../../../components/shared/loading";

const DynamicGeneralInformation = dynamic(
  () => import("../../../components/business/generalInformation"),
  {
    loading: () => <Loading />
  }
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
            <DynamicGeneralInformation information={dataInformationBusiness} />
          )}
          {value === 2 && <h1>2</h1>}
          {value === 3 && <h1>3</h1>}
          {value === 4 && <h1>4</h1>}
          {value === 5 && <h1>5</h1>}
          {value === 6 && <h1>6</h1>}
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
