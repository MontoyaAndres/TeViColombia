import React from "react";
import { gql } from "apollo-boost";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";

import AskModal from "../../shared/askModal";
import { feedbackQuery } from "../../../graphql/queries/account";

const deleteFeedbackMutation = gql`
  mutation DeleteFeedbackMutation($id: ID!) {
    deleteFeedback(id: $id)
  }
`;

const deleteFeedbackModal = ({
  deleteFeedback,
  handleAskDeleteFeedback,
  handleSubmit,
  isSubmitting
}) => (
  <AskModal
    title="Eliminar feedback"
    active={deleteFeedback}
    handleAskFunction={handleAskDeleteFeedback}
    mutation={handleSubmit}
    isSubmitting={isSubmitting}
  >
    Si da clic en Guardar cambios, este campo será eliminado.
  </AskModal>
);

export default compose(
  graphql(deleteFeedbackMutation, { name: "DELETE_FEEDBACK_MUTATION" }),
  withFormik({
    handleSubmit: async (
      _,
      {
        props: {
          id,
          idFeedback,
          handleAskDeleteFeedback,
          DELETE_FEEDBACK_MUTATION
        },
        setSubmitting
      }
    ) => {
      if (idFeedback) {
        await DELETE_FEEDBACK_MUTATION({
          variables: { id: idFeedback },
          refetchQueries: [{ query: feedbackQuery, variables: { userId: id } }]
        });
      }

      setSubmitting(false);
      handleAskDeleteFeedback();
    }
  })
)(deleteFeedbackModal);
