import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { withFormik, Form } from "formik";

import {
  necessityQuery,
  countNecessityQuery
} from "../../../graphql/queries/account";
import Loading from "../../shared/loading";
import meQuery from "../../../graphql/queries/me";
import { TextAreaField } from "../../shared/globalField";
import UpdateNecessityModal from "./updateNecessityModal";
import DeleteNecessityModal from "./deleteNecessityModal";
import Linkify from "../../shared/linkify";

const necessityMutation = gql`
  mutation NecessityMutation($finished: Boolean!, $comment: String!) {
    necessity(finished: $finished, comment: $comment)
  }
`;

const InputNecessity = ({ isSubmitting, handleSubmit }) => (
  <Form method="POST" onSubmit={handleSubmit}>
    <div style={{ padding: ".75rem" }}>
      <div className="box" style={{ marginTop: "0.5rem" }}>
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

class index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dropdown = [];
    this.state = {
      deleteNecessity: false,
      updateNecessity: false,
      idNecessity: null
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsideToClose);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutsideToClose);
  }

  handleClickOutsideToClose = e => {
    let toClose = true;

    this.dropdown.forEach(dropdown => {
      if (dropdown !== null && dropdown.contains(e.target)) {
        toClose = false;
      }
    });

    if (toClose) {
      this.handleCloseAll();
    }
  };

  handleCloseAll = () => {
    this.dropdown.forEach(dropdown => {
      if (dropdown !== null) {
        dropdown.classList.remove("is-active");
      }
    });
  };

  handleOpenDropdown = indexDropdown => {
    this.dropdown.forEach(dropdown => {
      if (dropdown !== null) {
        if (dropdown === this.dropdown[indexDropdown]) {
          dropdown.classList.toggle("is-active");
        } else {
          dropdown.classList.remove("is-active");
        }
      }
    });
  };

  handleAskDeleteNecessity = (idNecessity = null) => {
    const { deleteNecessity } = this.state;
    this.setState({ deleteNecessity: !deleteNecessity, idNecessity });
  };

  handleAskUpdateNecessity = (idNecessity = null) => {
    const { updateNecessity } = this.state;
    this.setState({ updateNecessity: !updateNecessity, idNecessity });
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
    const { deleteNecessity, idNecessity, updateNecessity } = this.state;

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

        {/* Delete necessity modal */}
        {deleteNecessity && (
          <DeleteNecessityModal
            id={id}
            idNecessity={idNecessity}
            deleteNecessity={deleteNecessity}
            handleAskDeleteNecessity={this.handleAskDeleteNecessity}
          />
        )}

        {/* Update necessity modal */}
        {updateNecessity && (
          <UpdateNecessityModal
            id={id}
            dataNecessity={dataNecessity}
            idNecessity={idNecessity}
            updateNecessity={updateNecessity}
            handleAskUpdateNecessity={this.handleAskUpdateNecessity}
          />
        )}

        {dataNecessity && dataNecessity.length ? (
          <div className="columns is-multiline">
            {dataNecessity.map((neces, i) => (
              <div className="column is-6" key={i}>
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
                            <div className="content">
                              <Linkify text={neces.comment} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {dataMe.id === id && (
                        <span className="card-header-icon">
                          <div
                            className="dropdown is-right"
                            ref={dropdown => {
                              this.dropdown[i] = dropdown;
                            }}
                            onClick={() => this.handleOpenDropdown(i)}
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
                                <a
                                  className="dropdown-item"
                                  onClick={() =>
                                    this.handleAskUpdateNecessity(neces.id)
                                  }
                                >
                                  Editar
                                </a>
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
  withFormik({
    mapPropsToValues: () => ({ finished: false, comment: "" }),
    handleSubmit: async (
      values,
      { props: { id, NECESSITY_MUTATION }, setSubmitting, resetForm }
    ) => {
      await NECESSITY_MUTATION({
        variables: values,
        refetchQueries: [
          { query: necessityQuery, variables: { userId: id } },
          { query: countNecessityQuery, variables: { userId: id } }
        ]
      });

      setSubmitting(false);
      resetForm();
    }
  })
)(index);
