import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";

import AskModal from "../../shared/askModal";
import { portfolioQuery } from "../../../graphql/queries/account";

const deletePortfolioMutation = gql`
  mutation DeletePortfolioMutation($idPortfolio: ID!) {
    deletePortfolio(idPortfolio: $idPortfolio)
  }
`;

const deletePortfolioModal = ({
  deletePortfolio,
  handleAskDeletePortfolio,
  handleSubmit,
  isSubmitting
}) => (
  <AskModal
    title="Eliminar portafolio"
    active={deletePortfolio}
    handleAskFunction={handleAskDeletePortfolio}
    mutation={handleSubmit}
    isSubmitting={isSubmitting}
  >
    Si da clic en Guardar cambios, este campo será eliminado.
  </AskModal>
);

export default compose(
  graphql(deletePortfolioMutation, { name: "DELETE_PORTFOLIO_MUTATION" }),
  withFormik({
    handleSubmit: async (
      _,
      {
        props: {
          id,
          idPortfolio,
          handleAskDeletePortfolio,
          DELETE_PORTFOLIO_MUTATION
        },
        setSubmitting
      }
    ) => {
      if (idPortfolio) {
        await DELETE_PORTFOLIO_MUTATION({
          variables: { idPortfolio },
          refetchQueries: [{ query: portfolioQuery, variables: { id } }]
        });
      }

      setSubmitting(false);
      handleAskDeletePortfolio();
    }
  })
)(deletePortfolioModal);
