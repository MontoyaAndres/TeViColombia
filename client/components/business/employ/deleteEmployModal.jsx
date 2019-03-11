import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";

import AskModal from "../../shared/askModal";
import { employsQuery } from "../../../graphql/queries/account";

const deleteEmployMutation = gql`
  mutation DeleteEmployMutation($employId: ID!) {
    deleteEmploy(employId: $employId)
  }
`;

const deleteEmployModal = ({
  deleteEmploy,
  handleAskDeleteEmploy,
  handleSubmit,
  isSubmitting
}) => (
  <AskModal
    title="Eliminar empleo"
    active={deleteEmploy}
    handleAskFunction={handleAskDeleteEmploy}
    mutation={handleSubmit}
    isSubmitting={isSubmitting}
  >
    Si da clic en Guardar cambios, este campo será eliminado.
  </AskModal>
);

export default compose(
  graphql(deleteEmployMutation, { name: "DELETE_EMPLOY_MUTATION" }),
  withFormik({
    handleSubmit: async (
      _,
      {
        props: { id, idEmploy, handleAskDeleteEmploy, DELETE_EMPLOY_MUTATION },
        setSubmitting
      }
    ) => {
      if (idEmploy) {
        await DELETE_EMPLOY_MUTATION({
          variables: { employId: idEmploy },
          refetchQueries: [
            { query: employsQuery, variables: { businessId: id } }
          ]
        });
      }

      setSubmitting(false);
      handleAskDeleteEmploy();
    }
  })
)(deleteEmployModal);
