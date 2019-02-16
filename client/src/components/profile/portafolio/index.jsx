import React from "react";
import { Form, withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import meQuery from "../../../graphql/queries/me";
import Loading from "../../shared/loading";
import { portafolioQuery } from "../../../graphql/queries/account";
import InputPortafolio from "./inputPortafolio";
import Carousel from "../../shared/carousel";
import linkify from "../../shared/linkify";

const portafolioMutation = gql`
  mutation PortafolioMutation(
    $id: ID!
    $multimedia: [Upload!]
    $description: String!
  ) {
    portafolio(id: $id, multimedia: $multimedia, description: $description)
  }
`;

const index = ({
  id,
  handleSubmit,
  isSubmitting,
  values,
  setFieldValue,
  loadingPortafolio,
  loadingMe,
  dataPortafolio,
  dataMe
}) => {
  if (loadingMe && loadingPortafolio) {
    return <Loading />;
  }

  return (
    <div className="container">
      {dataMe.id === id && (
        <Form
          method="POST"
          onSubmit={handleSubmit}
          style={{ padding: ".75rem" }}
        >
          <div className="container">
            <InputPortafolio
              isSubmitting={isSubmitting}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
        </Form>
      )}

      {dataPortafolio && dataPortafolio.length ? (
        <div className="columns is-multiline">
          {dataPortafolio.map(portafolio => (
            <div className="column is-6" key={portafolio.id}>
              <div className="card">
                <Carousel>
                  {portafolio.multimedia.map((multimedia, i) => (
                    <div className="card-image">
                      {multimedia.split(".").pop() !== "mp4" ? (
                        <img
                          key={i}
                          src={`${process.env.API_HOST}/${multimedia}`}
                          alt="uploaded"
                        />
                      ) : (
                        <video key={i} controls>
                          <source
                            src={`${process.env.API_HOST}/${multimedia}`}
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                  ))}
                </Carousel>

                <div className="card-content">
                  <div
                    className="control has-icons-right"
                    style={{ top: "none" }}
                  >
                    <span
                      className="icon is-medium"
                      style={{ left: "94%", bottom: 1 }}
                    >
                      <i
                        className="fas fa-ellipsis-v is-medium"
                        style={{ color: "gray" }}
                        aria-hidden="true"
                      />
                    </span>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{
                        __html: linkify(portafolio.description)
                      }}
                    />
                  </div>
                </div>

                {dataMe.id === id && (
                  <footer className="card-footer">
                    <a className="card-footer-item">Editar</a>
                    <a className="card-footer-item">Eliminar</a>
                  </footer>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2
          className="subtitle is-3"
          style={{ textAlign: "center", padding: 20 }}
        >
          No se ha encontrado información al respecto.
        </h2>
      )}
    </div>
  );
};

export default compose(
  graphql(portafolioQuery, {
    options: ({ id }) => ({ variables: { userId: id } }),
    props: ({ data }) => ({
      loadingPortafolio: data.loading,
      dataPortafolio: data.portafolio
    })
  }),
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  }),
  graphql(portafolioMutation, { name: "PORTAFOLIO_MUTATION" }),
  withFormik({
    mapPropsToValues: () => ({ multimedia: [], description: "" }),
    handleSubmit: async (
      values,
      { props: { id, PORTAFOLIO_MUTATION }, setSubmitting, resetForm }
    ) => {
      await PORTAFOLIO_MUTATION({
        variables: { id, ...values },
        refetchQueries: [{ query: portafolioQuery, variables: { userId: id } }]
      });

      setSubmitting(false);
      resetForm();
    }
  })
)(index);
