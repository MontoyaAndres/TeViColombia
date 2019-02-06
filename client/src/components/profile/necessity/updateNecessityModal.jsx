import React from "react";
import { gql } from "apollo-boost";
import { compose, graphql } from "react-apollo";
import { withFormik, Form } from "formik";

import AskModal from "../../shared/askModal";
import { TextAreaField } from "../../shared/globalField";
import {
  necessityQuery,
  countNecessityQuery
} from "../../../graphql/queries/account";

const updateNecessityMutation = gql`
  mutation UpdateNecessityMutation(
    $id: ID!
    $finished: Boolean!
    $comment: String!
  ) {
    updateNecessity(id: $id, finished: $finished, comment: $comment)
  }
`;

const updateNecessityModal = ({
  updateNecessity,
  handleAskUpdateNecessity,
  handleSubmit,
  values,
  setFieldValue,
  isSubmitting
}) => (
  <AskModal
    title="Editar necesidad"
    active={updateNecessity}
    handleAskFunction={handleAskUpdateNecessity}
    mutation={handleSubmit}
    isSubmitting={isSubmitting}
  >
    <Form method="POST">
      <div className="media">
        <div className="media-left">
          <div
            className="update-finished"
            onClick={() =>
              setFieldValue("updateFinished", !values.updateFinished)
            }
          >
            {values.updateFinished ? (
              <i
                className="fas fa-2x fa-check is-medium"
                style={{ color: "lightgreen" }}
                aria-hidden="true"
              />
            ) : (
              <i
                className="fas fa-2x fa-clock is-medium"
                style={{ color: "gray" }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        <div className="media-content">
          <TextAreaField
            name="updateComment"
            placeholder="Comentario"
            isRequired
          />
        </div>
      </div>
    </Form>
  </AskModal>
);

export default compose(
  graphql(updateNecessityMutation, { name: "UPDATE_NECESSITY_MUTATION" }),
  withFormik({
    mapPropsToValues: ({ dataNecessity, idNecessity }) => {
      const updateValues = dataNecessity.find(
        necessity => necessity.id === idNecessity
      );

      return {
        updateFinished: updateValues.finished,
        updateComment: updateValues.comment
      };
    },
    handleSubmit: async (
      values,
      {
        props: {
          id,
          idNecessity,
          handleAskUpdateNecessity,
          UPDATE_NECESSITY_MUTATION
        },
        setSubmitting
      }
    ) => {
      if (idNecessity) {
        await UPDATE_NECESSITY_MUTATION({
          variables: {
            id: idNecessity,
            finished: values.updateFinished,
            comment: values.updateComment
          },
          refetchQueries: [
            { query: necessityQuery, variables: { userId: id } },
            { query: countNecessityQuery, variables: { userId: id } }
          ]
        });
      }

      setSubmitting(false);
      handleAskUpdateNecessity();
    }
  })
)(updateNecessityModal);
