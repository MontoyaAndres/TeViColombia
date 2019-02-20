import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";

import AskModal from "../../shared/askModal";
import { portfolioQuery } from "../../../graphql/queries/account";
import InputPortfolio from "./inputPortfolio";

const updatePortfolioMutation = gql`
  mutation UpdatePortfolioMutation(
    $id: ID!
    $idPortfolio: ID!
    $multimedia: [Upload!]
    $description: String!
  ) {
    updatePortfolio(
      idPortfolio: $idPortfolio
      id: $id
      multimedia: $multimedia
      description: $description
    )
  }
`;

const updatePortfolioModal = ({
  updatePortfolio,
  handleAskUpdatePortfolio,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  values
}) => (
  <AskModal
    title="Editar portafolio"
    active={updatePortfolio}
    handleAskFunction={handleAskUpdatePortfolio}
    mutation={handleSubmit}
    isSubmitting={isSubmitting}
  >
    <InputPortfolio setFieldValue={setFieldValue} values={values} />
  </AskModal>
);

export default compose(
  graphql(updatePortfolioMutation, { name: "UPDATE_PORTFOLIO_MUTATION" }),
  withFormik({
    mapPropsToValues: ({ dataPortfolio, idPortfolio }) => {
      const updateValues = dataPortfolio.find(
        portfolio => portfolio.id === idPortfolio
      );

      return {
        multimedia: updateValues.multimedia,
        description: updateValues.description
      };
    },
    handleSubmit: async (
      values,
      {
        props: {
          id,
          idPortfolio,
          handleAskUpdatePortfolio,
          UPDATE_PORTFOLIO_MUTATION
        },
        setSubmitting
      }
    ) => {
      if (idPortfolio) {
        await UPDATE_PORTFOLIO_MUTATION({
          variables: {
            id,
            idPortfolio,
            multimedia: values.multimedia,
            description: values.description
          },
          refetchQueries: [
            { query: portfolioQuery, variables: { id, type: "User" } }
          ]
        });
      }

      setSubmitting(false);
      handleAskUpdatePortfolio();
    }
  })
)(updatePortfolioModal);
