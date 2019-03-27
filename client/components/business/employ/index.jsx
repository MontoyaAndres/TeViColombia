import React, { useState, useEffect } from "react";
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

const index = ({
  loadingEmploys,
  loadingMe,
  dataEmploys,
  dataMe,
  fetchEmploys,
  id
}) => {
  const [state, setState] = useState({
    idEmploy: null,
    createEmploy: false,
    updateEmploy: false,
    deleteEmploy: false,
    hasMoreItems: true
  });

  useEffect(() => {
    if (dataEmploys && dataEmploys.length < 10) {
      setState({
        createEmploy: state.createEmploy,
        updateEmploy: state.updateEmploy,
        deleteEmploy: state.deleteEmploy,
        idEmploy: state.idEmploy,
        hasMoreItems: false
      });
    }

    return () => {
      if (dataEmploys && dataEmploys.length >= 10) {
        setState({
          createEmploy: state.createEmploy,
          updateEmploy: state.updateEmploy,
          deleteEmploy: state.deleteEmploy,
          idEmploy: state.idEmploy,
          hasMoreItems: true
        });
      }
    };
  }, [dataEmploys]);

  function handleAskCreateEmploy() {
    setState({
      createEmploy: !state.createEmploy,
      updateEmploy: state.updateEmploy,
      deleteEmploy: state.deleteEmploy
    });
  }

  function handleAskUpdateEmploy(idEmploy = null) {
    setState({
      idEmploy,
      createEmploy: state.createEmploy,
      updateEmploy: !state.updateEmploy,
      deleteEmploy: state.deleteEmploy
    });
  }

  function handleAskDeleteEmploy(idEmploy = null) {
    setState({
      idEmploy,
      createEmploy: state.createEmploy,
      updateEmploy: state.updateEmploy,
      deleteEmploy: !state.deleteEmploy
    });
  }

  function handleLoadMore() {
    fetchEmploys({
      variables: {
        id,
        limit: dataEmploys.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        if (fetchMoreResult.employs.length < 10) {
          setState({
            createEmploy: state.createEmploy,
            updateEmploy: state.updateEmploy,
            deleteEmploy: state.deleteEmploy,
            idEmploy: state.idEmploy,
            hasMoreItems: false
          });
        }

        return Object.assign({}, prev, {
          employs: [...prev.employs, ...fetchMoreResult.employs]
        });
      }
    });
  }

  if (loadingEmploys || loadingMe) {
    return <Loading />;
  }

  return (
    <div className="container" style={{ padding: "0.75rem" }}>
      {dataMe && dataMe.id === id && (
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
        <>
          {dataEmploys.map((employ, i) => (
            <div style={{ marginBottom: "1.1rem" }} key={i}>
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
                              <span
                                className="title"
                                style={{ color: "#4a4a4a" }}
                              >
                                {employ.position}
                              </span>
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

                  {dataMe && dataMe.id === id && (
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
          ))}

          {state.hasMoreItems && (
            <div className="column is-12">
              <div className="buttons has-addons is-centered">
                <button
                  type="button"
                  className="button is-block is-primary is-large"
                  onClick={handleLoadMore}
                >
                  Ver más
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <h2
          className="subtitle is-3"
          style={{ textAlign: "center", padding: 20 }}
        >
          No se ha encontrado información.
        </h2>
      )}
    </div>
  );
};

export default compose(
  graphql(employsQuery, {
    options: ({ id }) => ({
      variables: { businessId: id },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => ({
      loadingEmploys: data.loading,
      dataEmploys: data.employs,
      fetchEmploys: data.fetchMore
    })
  }),
  graphql(meQuery, {
    props: ({ data }) => ({
      loadingMe: data.loading,
      dataMe: data.me
    })
  })
)(index);
