import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";

import AskModal from "../../shared/askModal";
import { necessityQuery } from "../../../graphql/queries/account";

const deleteNecessityMutation = gql`
  mutation DeleteNecessityMutation($id: ID!) {
    deleteNecessity(id: $id)
  }
`;

const deleteNecessityModal = ({
  deleteNecessity,
  handleAskDeleteNecessity,
  handleSubmit,
  isSubmitting
}) => (
  <AskModal
    title="Eliminar necesidad"
    active={deleteNecessity}
    handleAskFunction={handleAskDeleteNecessity}
    mutation={handleSubmit}
    isSubmitting={isSubmitting}
  >
    Si da clic en Guardar cambios, este campo será eliminado.
  </AskModal>
);

export default compose(
  graphql(deleteNecessityMutation, { name: "DELETE_NECESSITY_MUTATION" }),
  withFormik({
    handleSubmit: async (
      _,
      {
        props: {
          id,
          idNecessity,
          handleAskDeleteNecessity,
          DELETE_NECESSITY_MUTATION
        },
        setSubmitting
      }
    ) => {
      if (idNecessity) {
        await DELETE_NECESSITY_MUTATION({
          variables: { id: idNecessity },
          refetchQueries: [{ query: necessityQuery, variables: { userId: id } }]
        });
      }

      setSubmitting(false);
      handleAskDeleteNecessity();
    }
  })
)(deleteNecessityModal);
