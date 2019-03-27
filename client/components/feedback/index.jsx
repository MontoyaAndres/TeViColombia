import React, { useState, useEffect } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import { withFormik, Form, ErrorMessage } from "formik";
import { SimpleImg } from "react-simple-img";

import { feedbackQuery } from "../../graphql/queries/account";
import meQuery from "../../graphql/queries/me";
import Loading from "../shared/loading";
import StaticStars from "../shared/staticStars";
import normalizeErrors from "../../utils/normalizeErrors";
import { TextAreaField } from "../shared/globalField";
import ChangeStars from "../shared/changeStars";
import DeleteFeedbackModal from "./deleteFeedbackModal";
import Linkify from "../shared/linkify";

const feedbackMutation = gql`
  mutation FeedbackMutation(
    $toId: ID!
    $stars: Int!
    $comment: String!
    $type: String!
  ) {
    feedback(toId: $toId, stars: $stars, comment: $comment, type: $type) {
      path
      message
    }
  }
`;

const InputFeedback = ({
  stars,
  handleSubmit,
  isSubmitting,
  setFieldValue
}) => (
  <Form method="POST" onSubmit={handleSubmit}>
    <div className="box" style={{ marginTop: "0.1rem" }}>
      <span className="label">
        Valoración general
        <ChangeStars stars={stars} setFieldValue={setFieldValue} />
      </span>
      <div className="error">
        <ErrorMessage name="stars" />
      </div>

      <label className="label">Comentario</label>
      <TextAreaField name="comment" placeholder="Comentario" isRequired />

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
);

const index = ({
  loadingFeedback,
  loadingMe,
  dataFeedback,
  dataMe,
  fetchFeedback,
  id,
  values,
  handleSubmit,
  isSubmitting,
  setFieldValue
}) => {
  const [state, setState] = useState({
    deleteFeedback: false,
    idFeedback: null,
    hasMoreItems: true
  });

  useEffect(() => {
    if (dataFeedback.response && dataFeedback.response.length < 10) {
      setState({
        deleteFeedback: state.deleteFeedback,
        idFeedback: state.idFeedback,
        hasMoreItems: false
      });
    }

    return () => {
      if (dataFeedback.response && dataFeedback.response.length >= 10) {
        setState({
          deleteFeedback: state.deleteFeedback,
          idFeedback: state.idFeedback,
          hasMoreItems: true
        });
      }
    };
  }, [dataFeedback.response]);

  function handleAskDeleteFeedback(idFeedback = null) {
    setState({
      deleteFeedback: !state.deleteFeedback,
      idFeedback,
      hasMoreItems: state.hasMoreItems
    });
  }

  function handleLoadMore() {
    fetchFeedback({
      variables: {
        id,
        limit: dataFeedback.response.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult.feedback.response.length < 10) {
          setState({
            deleteFeedback: state.deleteFeedback,
            idFeedback: state.idFeedback,
            hasMoreItems: false
          });
        }

        return Object.assign({}, prev, {
          feedback: {
            ...fetchMoreResult.feedback,
            response: [
              ...prev.feedback.response,
              ...fetchMoreResult.feedback.response
            ]
          }
        });
      }
    });
  }

  if (loadingFeedback || loadingMe) {
    return <Loading />;
  }

  return (
    <div className="container" style={{ padding: "0.75rem" }}>
      {dataMe && dataMe.id !== id && (
        <InputFeedback
          stars={values.stars}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          setFieldValue={setFieldValue}
        />
      )}

      {state.deleteFeedback && (
        <DeleteFeedbackModal
          id={id}
          idFeedback={state.idFeedback}
          deleteFeedback={state.deleteFeedback}
          handleAskDeleteFeedback={handleAskDeleteFeedback}
        />
      )}

      {dataMe && dataMe.id === id && (
        <div className="notification is-info">
          {dataFeedback && Number(dataFeedback.count) > 0 ? (
            <p className="subtitle" style={{ textAlign: "center" }}>
              Tienes la cantidad de{" "}
              {Number(dataFeedback.count) === 1
                ? `${dataFeedback.count} estrella`
                : `${dataFeedback.count} estrellas`}{" "}
              <span role="img" aria-label="happy">
                🤗🥳🤩.
              </span>
            </p>
          ) : (
            <p className="subtitle" style={{ textAlign: "center" }}>
              No tienes estrellas{" "}
              <span role="img" aria-label="sad">
                🥺🙁
              </span>
              . Busca personas o empresas para que te den Feedback y crezcas en
              Te Vi Colombia!
            </p>
          )}
        </div>
      )}

      {dataFeedback && dataFeedback.response.length > 0 ? (
        <>
          {dataFeedback.response.map(feed => (
            <div style={{ margin: "1.1rem 0" }} key={feed.id}>
              <div className="control has-icons-right">
                {dataMe && dataMe.id === id && (
                  <span
                    className="icon is-medium is-right"
                    onClick={() => handleAskDeleteFeedback(feed.id)}
                  >
                    <i className="delete is-medium" aria-hidden="true" />
                  </span>
                )}

                <div className="card" style={{ borderRadius: 6 }}>
                  <div className="card-content" style={{ borderRadius: 6 }}>
                    <div className="media">
                      <div className="media-left">
                        <SimpleImg
                          applyAspectRatio={false}
                          src={`${process.env.API_HOST}/${
                            feed.from.routePhoto
                          }`}
                          height={44}
                          width={48}
                          alt="profile"
                        />
                      </div>

                      <div className="media-content">
                        <Link
                          href={{
                            pathname:
                              feed.from.type === "User"
                                ? "/profile/user"
                                : "/profile/business",
                            query: { id: feed.from.id }
                          }}
                          prefetch
                        >
                          <a className="title is-4">
                            {feed.from.name} {feed.from.lastname}
                          </a>
                        </Link>
                        <StaticStars stars={feed.stars} />
                      </div>
                    </div>

                    <div className="content">
                      <Linkify
                        decoraction="subtitle"
                        text={feed.comment}
                        length={80}
                      />
                    </div>
                  </div>
                </div>
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
        </>
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
  graphql(feedbackQuery, {
    options: ({ id }) => ({
      variables: { id },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => ({
      loadingFeedback: data.loading,
      dataFeedback: data.feedback,
      fetchFeedback: data.fetchMore
    })
  }),
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  }),
  graphql(feedbackMutation, { name: "FEEDBACK_MUTATION" }),
  withFormik({
    mapPropsToValues: () => ({ stars: 1, comment: "" }),
    handleSubmit: async (
      values,
      {
        props: { id, FEEDBACK_MUTATION, type },
        setSubmitting,
        setErrors,
        resetForm
      }
    ) => {
      const { data } = await FEEDBACK_MUTATION({
        variables: { toId: id, type, ...values },
        refetchQueries: [{ query: feedbackQuery, variables: { id } }]
      });

      // if feedback has data, it has the errors
      if (data.feedback && data.feedback.length) {
        setSubmitting(false);
        setErrors(normalizeErrors(data.feedback));
        document.querySelector(`[name="${data.feedback[0].path}"]`).focus();
      } else {
        setSubmitting(false);
        resetForm();
      }
    }
  })
)(index);
