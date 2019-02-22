import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik } from "formik";

import AskModal from "../../shared/askModal";
import { portfolioQuery } from "../../../graphql/queries/account";
import InputPortfolio from "./inputPortfolio";
import normalizeErrors from "../../../utils/normalizeErrors";

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
    ) {
      path
      message
    }
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
    <InputPortfolio
      setFieldValue={setFieldValue}
      values={values}
      maxLength="200"
    />
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
        setSubmitting,
        setErrors
      }
    ) => {
      if (idPortfolio) {
        const response = await UPDATE_PORTFOLIO_MUTATION({
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

        const { data } = response;
        // if updatePortafolio has data, it has the errors
        if (data.updatePortfolio && data.updatePortfolio.length) {
          setSubmitting(false);
          setErrors(normalizeErrors(data.updatePortfolio));
        } else {
          setSubmitting(false);
          handleAskUpdatePortfolio();
        }
      }
    }
  })
)(updatePortfolioModal);
