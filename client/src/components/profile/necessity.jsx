import React from "react";
import { gql } from "apollo-boost";
import { compose, graphql } from "react-apollo";
import { withFormik, Form } from "formik";

import { necessityQuery } from "../../graphql/queries/account";
import Loading from "../shared/loading";
import meQuery from "../../graphql/queries/me";
import { TextAreaField } from "../shared/globalField";
import AskModal from "../shared/askModal";

const necessityMutation = gql`
  mutation NecessityMutation($finished: Boolean!, $comment: String!) {
    necessity(finished: $finished, comment: $comment)
  }
`;

const deleteNecessityMutation = gql`
  mutation DeleteNecessityMutation($id: ID!) {
    deleteNecessity(id: $id)
  }
`;

const InputNecessity = ({ isSubmitting, handleSubmit }) => (
  <Form method="POST" onSubmit={handleSubmit}>
    <div style={{ padding: ".75rem" }}>
      <div className="box" style={{ marginTop: "0.8rem" }}>
        <label className="label">Escribe qué es lo que necesitas.</label>
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
    </div>
  </Form>
);

class necessity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropdown = [];
    this.state = {
      deleteNecessity: false,
      idNecessity: null
    };
  }

  handleOpenDropdown = async idNeces => {
    this.dropdown[idNeces].classList.toggle("is-active");
  };

  handleAskDeleteNecessity = (idNecessity = null) => {
    const { deleteNecessity } = this.state;
    this.setState({ deleteNecessity: !deleteNecessity, idNecessity });
  };

  handleDeleteNecessityMutation = async () => {
    const { DELETE_NECESSITY_MUTATION, id } = this.props;
    const { idNecessity } = this.state;

    if (idNecessity) {
      await DELETE_NECESSITY_MUTATION({
        variables: { id: idNecessity },
        refetchQueries: [{ query: necessityQuery, variables: { userId: id } }]
      });
    }

    this.handleAskDeleteNecessity();
  };

  render() {
    const {
      loadingNecessity,
      loadingMe,
      dataNecessity,
      dataMe,
      id,
      isSubmitting,
      handleSubmit
    } = this.props;
    const { deleteNecessity } = this.state;

    if (loadingNecessity && loadingMe) {
      return <Loading />;
    }

    return (
      <div className="container">
        {dataMe.id === id && (
          <InputNecessity
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        )}

        <AskModal
          title="Eliminar necesidad"
          active={deleteNecessity}
          mutation={this.handleDeleteNecessityMutation}
          handleAskFunction={this.handleAskDeleteNecessity}
        >
          <section className="modal-card-body">
            Si da clic en Guardar cambios, este campo será eliminado.
          </section>
        </AskModal>

        {dataNecessity && dataNecessity.length ? (
          <div className="columns is-multiline">
            {dataNecessity.map(neces => (
              <div className="column is-6" key={neces.id}>
                <div style={{ marginTop: "0.5rem" }}>
                  <div className="card" style={{ borderRadius: 6 }}>
                    <header className="card-header" style={{ borderRadius: 6 }}>
                      <div className="card-header-title">
                        <div className="media">
                          <div className="media-left">
                            <div>
                              {neces.finished ? (
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
                            <p className="subtitle">{neces.comment}</p>
                          </div>
                        </div>
                      </div>

                      {dataMe.id === id && (
                        <span className="card-header-icon">
                          <div
                            className="dropdown is-right"
                            ref={dropdown => {
                              this.dropdown[neces.id] = dropdown;
                            }}
                            onClick={() => this.handleOpenDropdown(neces.id)}
                          >
                            <div className="dropdown-trigger">
                              <span className="icon is-medium">
                                <i
                                  className="fas fa-ellipsis-v is-medium"
                                  style={{ color: "gray" }}
                                  aria-hidden="true"
                                />
                              </span>
                            </div>

                            <div className="dropdown-menu" role="menu">
                              <div className="dropdown-content">
                                <a className="dropdown-item">Editar</a>
                                <a
                                  className="dropdown-item"
                                  onClick={() =>
                                    this.handleAskDeleteNecessity(neces.id)
                                  }
                                >
                                  Eliminar
                                </a>
                              </div>
                            </div>
                          </div>
                        </span>
                      )}
                    </header>
                  </div>
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
  }
}

export default compose(
  graphql(necessityQuery, {
    options: ({ id }) => ({ variables: { userId: id } }),
    props: ({ data }) => ({
      loadingNecessity: data.loading,
      dataNecessity: data.necessity
    })
  }),
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  }),
  graphql(necessityMutation, { name: "NECESSITY_MUTATION" }),
  graphql(deleteNecessityMutation, { name: "DELETE_NECESSITY_MUTATION" }),
  withFormik({
    mapPropsToValues: () => ({ finished: false, comment: "" }),
    handleSubmit: async (
      values,
      { props: { id, NECESSITY_MUTATION }, setSubmitting, resetForm }
    ) => {
      await NECESSITY_MUTATION({
        variables: values,
        refetchQueries: [{ query: necessityQuery, variables: { userId: id } }]
      });

      setSubmitting(false);
      resetForm();
    }
  })
)(necessity);
