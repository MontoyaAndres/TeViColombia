import React from "react";
import { compose, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import Link from "next/link";
import { withFormik, Form, ErrorMessage } from "formik";

import { feedbackQuery } from "../../graphql/queries/account";
import meQuery from "../../graphql/queries/me";
import Loading from "../shared/loading";
import StaticStars from "../shared/staticStars";
import normalizeErrors from "../../utils/normalizeErrors";
import { TextAreaField } from "../shared/globalField";
import ChangeStars from "../shared/changeStars";
import AskModal from "../shared/askModal";

const feedbackMutation = gql`
  mutation FeedbackMutation($id: ID!, $stars: Int!, $comment: String!) {
    feedback(id: $id, stars: $stars, comment: $comment) {
      path
      message
    }
  }
`;

const feedbackDeleteMutation = gql`
  mutation FeedbackDeleteMutation($id: ID!) {
    deleteFeedback(id: $id)
  }
`;

const GiveFeedbackBox = ({
  stars,
  handleSubmit,
  isSubmitting,
  setFieldValue
}) => (
  <Form method="POST" onSubmit={handleSubmit}>
    <div className="box" style={{ marginTop: "0.8rem" }}>
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

class feedback extends React.PureComponent {
  state = {
    deleteFeedback: false,
    idFeedback: null
  };

  handleAskDeleteFeedback = (idFeedback = null) => {
    const { deleteFeedback } = this.state;
    this.setState({ deleteFeedback: !deleteFeedback, idFeedback });
  };

  handleMutationDeleteFeedback = async () => {
    const { FEEDBACK_DELETE_MUTATION, id } = this.props;
    const { idFeedback } = this.state;

    if (idFeedback) {
      await FEEDBACK_DELETE_MUTATION({
        variables: { id: idFeedback },
        refetchQueries: [{ query: feedbackQuery, variables: { userId: id } }]
      });
    }

    this.handleAskDeleteFeedback();
  };

  render() {
    const {
      loadingFeedback,
      loadingMe,
      dataFeedback,
      dataMe,
      id,
      values,
      handleSubmit,
      isSubmitting,
      setFieldValue
    } = this.props;
    const { deleteFeedback } = this.state;

    if (loadingFeedback && loadingMe) {
      return <Loading />;
    }

    return (
      <div className="container">
        <div style={{ padding: ".75rem" }}>
          {dataMe.id !== id && (
            <GiveFeedbackBox
              stars={values.stars}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
            />
          )}

          <AskModal
            title="Eliminar feedback"
            active={deleteFeedback}
            mutation={this.handleMutationDeleteFeedback}
            handleAskFunction={this.handleAskDeleteFeedback}
          >
            <section className="modal-card-body">
              Si da clic en Guardar cambios, este campo será eliminado.
            </section>
          </AskModal>

          {dataFeedback && dataFeedback.length ? (
            dataFeedback.map(feed => (
              <div style={{ marginTop: "1.1rem" }} key={feed.id}>
                <div className="control has-icons-right">
                  {dataMe.id === id && (
                    <span
                      className="icon is-medium is-right"
                      onClick={() => this.handleAskDeleteFeedback(feed.id)}
                    >
                      <i className="delete is-medium" aria-hidden="true" />
                    </span>
                  )}

                  <div className="card" style={{ borderRadius: 6 }}>
                    <div className="card-content" style={{ borderRadius: 6 }}>
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img
                              src={`http://localhost:4000/${
                                feed.user.routePhoto
                              }`}
                              alt="profile"
                            />
                          </figure>
                        </div>

                        <div className="media-content">
                          <Link
                            href={{
                              pathname: "/profile",
                              query: { id: feed.user.id }
                            }}
                            prefetch
                          >
                            <a className="title is-4">
                              {feed.user.name} {feed.user.lastname}
                            </a>
                          </Link>
                          <StaticStars stars={feed.stars} />
                        </div>
                      </div>

                      <div className="content">{feed.comment}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2
              className="subtitle is-3"
              style={{ textAlign: "center", padding: 20 }}
            >
              No se ha encontrado información al respecto.
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(feedbackQuery, {
    options: ({ id }) => ({ variables: { userId: id } }),
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
  graphql(feedbackDeleteMutation, { name: "FEEDBACK_DELETE_MUTATION" }),
  withFormik({
    mapPropsToValues: () => ({ stars: 1, comment: "" }),
    handleSubmit: async (
      values,
      { props: { id, FEEDBACK_MUTATION }, setSubmitting, setErrors, resetForm }
    ) => {
      const response = await FEEDBACK_MUTATION({
        variables: { id, ...values },
        refetchQueries: [{ query: feedbackQuery, variables: { userId: id } }]
      });

      const { data } = response;
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
)(feedback);
