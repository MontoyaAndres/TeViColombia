import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik, Form } from "formik";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import AskModal from "../../shared/askModal";
import { TextAreaField } from "../../shared/globalField";
import { necessityQuery } from "../../../graphql/queries/account";
import normalizeErrors from "../../../utils/normalizeErrors";

const updateNecessityMutation = gql`
  mutation UpdateNecessityMutation(
    $id: ID!
    $finished: Boolean!
    $comment: String!
  ) {
    updateNecessity(id: $id, finished: $finished, comment: $comment) {
      path
      message
    }
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
            onClick={() => setFieldValue("finished", !values.finished)}
          >
            {values.finished ? (
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
          <TextAreaField name="comment" placeholder="Comentario" isRequired />
        </div>
      </div>
    </Form>
  </AskModal>
);

export default compose(
  graphql(updateNecessityMutation, { name: "UPDATE_NECESSITY_MUTATION" }),
  withFormik({
    mapPropsToValues: ({ dataNecessity, idNecessity }) => {
      const updateValues = dataNecessity.response.find(
        necessity => necessity.id === idNecessity
      );

      return updateValues;
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
        setErrors,
        setSubmitting
      }
    ) => {
      if (idNecessity) {
        const { data } = await UPDATE_NECESSITY_MUTATION({
          variables: {
            id: idNecessity,
            finished: values.finished,
            comment: values.comment
          },
          refetchQueries: [{ query: necessityQuery, variables: { userId: id } }]
        });

        // if updateNecessity has data, it has the errors
        if (data.updateNecessity && data.updateNecessity.length) {
          setSubmitting(false);
          setErrors(normalizeErrors(data.updateNecessity));
          const node = document.querySelector(
            `[name="${data.updateNecessity[0].path}"]`
          );
          scrollIntoView(node);
        } else {
          setSubmitting(false);
          handleAskUpdateNecessity();
        }
      }
    }
  })
)(updateNecessityModal);
