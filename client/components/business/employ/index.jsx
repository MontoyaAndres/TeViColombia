import React, { useState } from "react";
import { graphql, compose, Query } from "react-apollo";
import Link from "next/link";

import { employsQuery, employQuery } from "../../../graphql/queries/account";
import meQuery from "../../../graphql/queries/me";
import Loading from "../../shared/loading";
import Linkify from "../../shared/linkify";
import DropdownIcon from "../../shared/dropdrownIcon";
import CreateEmployModal from "./createEmployModal";
import DeleteEmployModal from "./deleteEmployModal";
import UpdateEmployModal from "./updateEmployModal";

const index = ({ loadingEmploys, loadingMe, dataEmploys, dataMe, id }) => {
  const [state, setState] = useState({
    idEmploy: null,
    createEmploy: false,
    updateEmploy: false,
    deleteEmploy: false
  });

  function handleAskCreateEmploy() {
    setState({ createEmploy: !state.createEmploy });
  }

  function handleAskUpdateEmploy(idEmploy = null) {
    setState({ idEmploy, updateEmploy: !state.updateEmploy });
  }

  function handleAskDeleteEmploy(idEmploy = null) {
    setState({ idEmploy, deleteEmploy: !state.deleteEmploy });
  }

  if (loadingEmploys || loadingMe) {
    return <Loading />;
  }

  return (
    <div className="container">
      {dataMe.id === id && (
        <div className="buttons has-addons is-centered">
          <button
            type="button"
            className="button is-block is-primary is-large"
            onClick={handleAskCreateEmploy}
          >
            Agregar nuevo empleo
          </button>
        </div>
      )}

      {state.createEmploy && (
        <CreateEmployModal
          id={id}
          createEmploy={state.createEmploy}
          handleAskCreateEmploy={handleAskCreateEmploy}
        />
      )}

      {state.updateEmploy && (
        <Query query={employQuery} variables={{ employId: state.idEmploy }}>
          {({ loading, data }) => {
            if (loading) {
              return null;
            }

            return (
              <UpdateEmployModal
                id={id}
                dataEmploy={data.employ}
                updateEmploy={state.updateEmploy}
                handleAskUpdateEmploy={handleAskUpdateEmploy}
              />
            );
          }}
        </Query>
      )}

      {state.deleteEmploy && (
        <DeleteEmployModal
          id={id}
          idEmploy={state.idEmploy}
          deleteEmploy={state.deleteEmploy}
          handleAskDeleteEmploy={handleAskDeleteEmploy}
        />
      )}

      {dataEmploys && dataEmploys.length > 0 ? (
        dataEmploys.map((employ, i) => (
          <div style={{ marginTop: "0.5rem", padding: "0 0.75rem" }} key={i}>
            <div className="card" style={{ borderRadius: 6 }}>
              <header className="card-header" style={{ borderRadius: 6 }}>
                <div className="card-header-title">
                  <div className="media">
                    <div className="media-content">
                      <div className="content">
                        <Link
                          href={{
                            pathname: "/profile/business/employ",
                            query: { id, employId: employ.id }
                          }}
                        >
                          <a>
                            <Linkify
                              decoraction="title"
                              text={employ.position}
                              length={80}
                            />
                          </a>
                        </Link>

                        <p className="subtitle">
                          {employ.country} - {employ.departament} -{" "}
                          {employ.town && employ.town}
                        </p>

                        <p className="subtitle">
                          <span style={{ fontWeight: "bold" }}>
                            Tipo de contrato:{" "}
                          </span>
                          {employ.contract}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {dataMe.id === id && (
                  <DropdownIcon i={i}>
                    <div className="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        <a
                          className="dropdown-item"
                          onClick={() => handleAskUpdateEmploy(employ.id)}
                        >
                          Editar
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleAskDeleteEmploy(employ.id)}
                        >
                          Eliminar
                        </a>
                      </div>
                    </div>
                  </DropdownIcon>
                )}
              </header>
            </div>
          </div>
        ))
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
  graphql(employsQuery, {
    options: ({ id }) => ({ variables: { businessId: id } }),
    props: ({ data }) => ({
      loadingEmploys: data.loading,
      dataEmploys: data.employs
    })
  }),
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  })
)(index);
