import React, { useState, useEffect, memo } from "react";
import { Form, withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { Carousel } from "react-responsive-carousel";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import meQuery from "../../graphql/queries/me";
import Loading from "../shared/loading";
import { portfolioQuery } from "../../graphql/queries/account";
import InputPortfolio from "./inputPortfolio";
import Linkify from "../shared/linkify";
import UpdatePortfolioModal from "./updatePortfolioModal";
import DeletePortfolioModal from "./deletePortfolioModal";
import normalizeErrors from "../../utils/normalizeErrors";

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
  loadingPortfolio,
  loadingMe,
  dataPortfolio,
  dataMe,
  fetchPortfolio,
  id,
  handleSubmit,
  isSubmitting,
  values,
  setFieldValue
}) => {
  const [state, setState] = useState({
    deletePortfolio: false,
    updatePortfolio: false,
    idPortfolio: null,
    hasMoreItems: true
  });

  useEffect(() => {
    if (dataPortfolio && dataPortfolio.length < 10) {
      setState({
        deletePortfolio: state.deletePortfolio,
        updatePortfolio: state.updatePortfolio,
        idPortfolio: state.idPortfolio,
        hasMoreItems: false
      });
    }

    return () => {
      if (dataPortfolio && dataPortfolio.length >= 10) {
        setState({
          deletePortfolio: state.deletePortfolio,
          updatePortfolio: state.updatePortfolio,
          idPortfolio: state.idPortfolio,
          hasMoreItems: true
        });
      }
    };
  }, [dataPortfolio]);

  function handleAskDeletePortfolio(idPortfolio = null) {
    setState({
      deletePortfolio: !state.deletePortfolio,
      updatePortfolio: state.updatePortfolio,
      idPortfolio,
      hasMoreItems: state.hasMoreItems
    });
  }

  function handleAskUpdatePortfolio(idPortfolio = null) {
    setState({
      deletePortfolio: state.deletePortfolio,
      updatePortfolio: !state.updatePortfolio,
      idPortfolio,
      hasMoreItems: state.hasMoreItems
    });
  }

  function handleLoadMore() {
    fetchPortfolio({
      variables: {
        id,
        limit: dataPortfolio.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult.portfolio.length < 10) {
          setState({
            deletePortfolio: state.deletePortfolio,
            updatePortfolio: state.updatePortfolio,
            idPortfolio: state.idPortfolio,
            hasMoreItems: false
          });
        }

        return Object.assign({}, prev, {
          portfolio: [...prev.portfolio, ...fetchMoreResult.portfolio]
        });
      }
    });
  }

  if (loadingMe || loadingPortfolio) {
    return <Loading />;
  }

  return (
    <div className="container" style={{ padding: ".75rem" }}>
      {dataMe && dataMe.id === id && (
        <Form method="POST" onSubmit={handleSubmit}>
          <div className="box" style={{ marginTop: "0.1rem" }}>
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

      {dataPortfolio && dataPortfolio.length > 0 ? (
        <div className="columns is-multiline">
          {dataPortfolio.map(portfolio => (
            <div className="column is-6" key={portfolio.id}>
              <div className="card">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  stopOnHover={false}
                  showIndicators={false}
                  dynamicHeight
                  emulateTouch
                >
                  {portfolio.multimedia.map((multimedia, i) => (
                    <div className="card-image" key={i}>
                      {multimedia.secure_url.split(".").pop() !== "mp4" ? (
                        <img src={multimedia.secure_url} alt="uploaded" />
                      ) : (
                        <video controls>
                          <source
                            src={multimedia.secure_url}
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                  ))}
                </Carousel>

                <div className="card-content">
                  <div className="content">
                    <Linkify
                      decoraction="subtitle"
                      text={portfolio.description}
                      length={80}
                    />
                  </div>
                </div>

                {dataMe && dataMe.id === id && (
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

          {state.hasMoreItems && (
            <div className="column is-12">
              <div className="buttons has-addons is-centered">
                <button
                  type="button"
                  className="button is-block is-primary is-large"
                  onClick={handleLoadMore}
                >
                  Ver más
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h2
          className="subtitle is-3"
          style={{ textAlign: "center", padding: 20 }}
        >
          No se ha encontrado información.
        </h2>
      )}
    </div>
  );
};

export default compose(
  graphql(portfolioQuery, {
    options: ({ id }) => ({
      variables: { id },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => ({
      loadingPortfolio: data.loading,
      dataPortfolio: data.portfolio,
      fetchPortfolio: data.fetchMore
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
        refetchQueries: [{ query: portfolioQuery, variables: { id } }]
      });

      const { data } = response;
      // if portafolio has data, it has the errors
      if (data.portfolio && data.portfolio.length) {
        setSubmitting(false);
        setErrors(normalizeErrors(data.portfolio));
        const node = document.querySelector(
          `[name="${data.portfolio[0].path}"]`
        );
        scrollIntoView(node);
      } else {
        setSubmitting(false);
        resetForm();
      }
    }
  })
)(memo(index));
