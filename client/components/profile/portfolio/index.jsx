import React, { useState } from "react";
import { Form, withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import meQuery from "../../../graphql/queries/me";
import Loading from "../../shared/loading";
import { portfolioQuery } from "../../../graphql/queries/account";
import InputPortfolio from "./inputPortfolio";
import Carousel from "../../shared/carousel";
import Linkify from "../../shared/linkify";
import UpdatePortfolioModal from "./updatePortfolioModal";
import DeletePortfolioModal from "./deletePortfolioModal";
import normalizeErrors from "../../../utils/normalizeErrors";

const portfolioMutation = gql`
  mutation PortfolioMutation(
    $id: ID!
    $multimedia: [Upload!]
    $description: String!
  ) {
    portfolio(id: $id, multimedia: $multimedia, description: $description) {
      path
      message
    }
  }
`;

const index = ({
  id,
  handleSubmit,
  isSubmitting,
  values,
  setFieldValue,
  loadingPortfolio,
  loadingMe,
  dataPortfolio,
  dataMe
}) => {
  const [state, setState] = useState({
    deletePortfolio: false,
    updatePortfolio: false,
    idPortfolio: null
  });

  function handleAskDeletePortfolio(idPortfolio = null) {
    setState({ deletePortfolio: !state.deletePortfolio, idPortfolio });
  }

  function handleAskUpdatePortfolio(idPortfolio = null) {
    setState({ updatePortfolio: !state.updatePortfolio, idPortfolio });
  }

  if (loadingMe && loadingPortfolio) {
    return <Loading />;
  }

  return (
    <div className="container">
      {dataMe.id === id && (
        <Form
          method="POST"
          onSubmit={handleSubmit}
          style={{ padding: ".75rem" }}
        >
          <div className="box" style={{ marginTop: "0.5rem" }}>
            <InputPortfolio
              values={values}
              setFieldValue={setFieldValue}
              maxLength="200"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`button is-block is-primary is-large ${
                isSubmitting ? "is-loading" : ""
              }`}
            >
              Enviar
            </button>
          </div>
        </Form>
      )}

      {state.updatePortfolio && (
        <UpdatePortfolioModal
          id={id}
          dataPortfolio={dataPortfolio}
          idPortfolio={state.idPortfolio}
          updatePortfolio={state.updatePortfolio}
          handleAskUpdatePortfolio={handleAskUpdatePortfolio}
        />
      )}

      {state.deletePortfolio && (
        <DeletePortfolioModal
          id={id}
          idPortfolio={state.idPortfolio}
          deletePortfolio={state.deletePortfolio}
          handleAskDeletePortfolio={handleAskDeletePortfolio}
        />
      )}

      {dataPortfolio && dataPortfolio.length ? (
        <div className="columns is-multiline">
          {dataPortfolio.map(portfolio => (
            <div className="column is-6" key={portfolio.id}>
              <div className="card">
                <Carousel>
                  {portfolio.multimedia.map((multimedia, i) => (
                    <div className="card-image" key={i}>
                      {multimedia.split(".").pop() !== "mp4" ? (
                        <img
                          src={`${process.env.API_HOST}/${multimedia}`}
                          alt="uploaded"
                        />
                      ) : (
                        <video controls>
                          <source
                            src={`${process.env.API_HOST}/${multimedia}`}
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                  ))}
                </Carousel>

                <div className="card-content">
                  <div className="content">
                    <Linkify text={portfolio.description} length={80} />
                  </div>
                </div>

                {dataMe.id === id && (
                  <footer className="card-footer">
                    <a
                      className="card-footer-item"
                      onClick={() => handleAskUpdatePortfolio(portfolio.id)}
                    >
                      Editar
                    </a>
                    <a
                      className="card-footer-item"
                      onClick={() => handleAskDeletePortfolio(portfolio.id)}
                    >
                      Eliminar
                    </a>
                  </footer>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2
          className="subtitle is-3"
          style={{ textAlign: "center", padding: 20 }}
        >
          No se ha encontrado información al respecto.
        </h2>
      )}
    </div>
  );
};

export default compose(
  graphql(portfolioQuery, {
    options: ({ id }) => ({ variables: { id, type: "User" } }),
    props: ({ data }) => ({
      loadingPortfolio: data.loading,
      dataPortfolio: data.portfolio
    })
  }),
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  }),
  graphql(portfolioMutation, { name: "PORTFOLIO_MUTATION" }),
  withFormik({
    mapPropsToValues: () => ({ multimedia: [], description: "" }),
    handleSubmit: async (
      values,
      { props: { id, PORTFOLIO_MUTATION }, setSubmitting, resetForm, setErrors }
    ) => {
      const response = await PORTFOLIO_MUTATION({
        variables: { id, ...values },
        refetchQueries: [
          { query: portfolioQuery, variables: { id, type: "User" } }
        ]
      });

      const { data } = response;
      // if portafolio has data, it has the errors
      if (data.portfolio && data.portfolio.length) {
        setSubmitting(false);
        setErrors(normalizeErrors(data.portfolio));
      } else {
        setSubmitting(false);
        resetForm();
      }
    }
  })
)(index);
