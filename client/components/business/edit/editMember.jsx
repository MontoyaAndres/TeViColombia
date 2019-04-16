import React, { useState, useEffect, memo } from "react";
import debounce from "lodash.debounce";
import Downshift from "downshift";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const searchMemberQuery = gql`
  query SearchMemberQuery($value: String) {
    searchMember(value: $value) {
      id
      email
    }
  }
`;

const editMember = ({ values, setFieldValue }) => {
  const [value, setValue] = useState("");

  const handleValueChange = debounce(
    ({ inputValue }) => {
      if (typeof inputValue !== "undefined" && inputValue !== "") {
        setValue(inputValue);
      }
    },
    500,
    { maxWait: 500 }
  );

  useEffect(() => () => {
    handleValueChange.cancel();
  });

  function handleAddElement(item) {
    if (item !== "") {
      setFieldValue("memberUser", [...values, item]);
    }
  }

  function handleDeleteElement(index) {
    setFieldValue("memberUser", [
      ...values.slice(0, index),
      ...values.slice(index + 1)
    ]);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">Integrante o socio de empresa</div>
      </div>

      <div className="card-content">
        <div className="notification is-warning">
          <p className="subtitle">
            Ingrese el correo electrónico principal de los usuarios a añadir.
          </p>
        </div>

        <div className="content">
          <Downshift
            onStateChange={handleValueChange}
            onSelect={handleAddElement}
            itemToString={x => (x ? x.email : "")}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              selectedItem,
              highlightedIndex,
              isOpen
            }) => (
              <div>
                <label className="label" {...getLabelProps()}>
                  Ingresar integrantes
                </label>
                <div
                  className="dropdown is-active"
                  style={{ display: "block" }}
                >
                  <div className="field is-grouped">
                    <div className="control is-expanded">
                      <input
                        className="input is-hovered is-medium"
                        {...getInputProps({
                          onKeyPress: event => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              event.nativeEvent.preventDownshiftDefault = true;
                            }
                          }
                        })}
                      />
                    </div>

                    <div className="control">
                      <a
                        type="button"
                        className="button is-info is-medium"
                        onClick={() => handleAddElement(selectedItem)}
                      >
                        <span className="icon">
                          <i className="fas fa-plus" aria-hidden="true" />
                        </span>
                      </a>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="dropdown-menu" style={{ width: "95%" }}>
                      <div className="dropdown-content">
                        <Query query={searchMemberQuery} variables={{ value }}>
                          {({ data, loading }) => {
                            if (
                              data &&
                              data.searchMember &&
                              !data.searchMember.length &&
                              !loading
                            ) {
                              return (
                                <div style={{ padding: 20, fontSize: 24 }}>
                                  No hay resultados.
                                </div>
                              );
                            }

                            return data && data.searchMember
                              ? data.searchMember.map((item, index) => (
                                  <div
                                    className="dropdown-item"
                                    {...getItemProps({
                                      item,
                                      index,
                                      key: item.email,
                                      style: {
                                        backgroundColor:
                                          highlightedIndex === index
                                            ? "#d9d9d9"
                                            : undefined,
                                        fontWeight:
                                          selectedItem === item
                                            ? "bold"
                                            : "normal",
                                        fontSize: 24
                                      }
                                    })}
                                  >
                                    {item.email}
                                  </div>
                                ))
                              : null;
                          }}
                        </Query>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Downshift>

          {values && values.length > 0 ? (
            <div style={{ marginTop: ".75rem" }}>
              {values.map((val, i) => (
                <span
                  key={i}
                  className="tag is-info is-large"
                  style={{ margin: 5 }}
                >
                  {val.email}
                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDeleteElement(i)}
                  />
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(editMember);
