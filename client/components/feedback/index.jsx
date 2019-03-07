import React, { useState } from "react";
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
  mutation FeedbackMutation($toId: ID!, $stars: Int!, $comment: String!) {
    feedback(toId: $toId, stars: $stars, comment: $comment) {
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
    <div className="box" style={{ marginTop: "0.5rem" }}>
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
  id,
  values,
  handleSubmit,
  isSubmitting,
  setFieldValue
}) => {
  const [state, setState] = useState({
    deleteFeedback: false,
    idFeedback: null
  });

  function handleAskDeleteFeedback(idFeedback = null) {
    setState({ deleteFeedback: !state.deleteFeedback, idFeedback });
  }

  if (loadingFeedback || loadingMe) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div style={{ padding: ".75rem" }}>
        {dataMe.id !== id && (
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

        {dataMe.id === id && (
          <div className="notification is-info">
            {dataFeedback && dataFeedback.count > 0 ? (
              <p className="subtitle" style={{ textAlign: "center" }}>
                Tienes la cantidad de{" "}
                {dataFeedback.count === 1
                  ? `${dataFeedback.count} estrella`
                  : `${dataFeedback.count} estrellas`}{" "}
                <span role="img" aria-label="happy">
                  🤗🥳🤩.
                </span>
              </p>
            ) : (
              <p className="subtitle" style={{ textAlign: "center" }}>
                Tienes la cantidad de 0 estrellas{" "}
                <span role="img" aria-label="sad">
                  🥺🙁
                </span>
                . Busca personas para que te den Feedback y crezcas en Te vi
                Colombia!
              </p>
            )}
          </div>
        )}

        {dataFeedback && dataFeedback.response.length > 0
          ? dataFeedback.response.map(feed => (
              <div style={{ marginTop: "1.1rem" }} key={feed.id}>
                <div className="control has-icons-right">
                  {dataMe.id === id && (
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
                        <Linkify text={feed.comment} length={80} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default compose(
  graphql(feedbackQuery, {
    options: ({ id }) => ({ variables: { id } }),
    props: ({ data }) => ({
      loadingFeedback: data.loading,
      dataFeedback: data.feedback
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
      { props: { id, FEEDBACK_MUTATION }, setSubmitting, setErrors, resetForm }
    ) => {
      const { data } = await FEEDBACK_MUTATION({
        variables: { toId: id, ...values },
        refetchQueries: [{ query: feedbackQuery, variables: { id } }]
      });

      // if feedback has data, it has the errors
      if (data.feedback && data.feedback.length) {
        setSubmitting(false);
        setErrors(normalizeErrors(data.feedback));
      } else {
        setSubmitting(false);
        resetForm();
      }
    }
  })
)(index);
