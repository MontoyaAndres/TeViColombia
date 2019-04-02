import React from "react";
import { Form, Formik } from "formik";
import Router from "next/router";
import { Mutation, Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import Error from "next/error";

import { UserConfigurationValidation } from "../../utils/validation";
import { TextField } from "../../components/shared/globalField";
import normalizeErrors from "../../utils/normalizeErrors";
import meQuery from "../../graphql/queries/me";
import Loading from "../../components/shared/loading";
import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import Linkify from "../../components/shared/linkify";

const settingsMutation = gql`
  mutation SettingsMutation(
    $email: String!
    $password: String!
    $newPassword: String!
    $type: String!
  ) {
    settings(
      email: $email
      password: $password
      newPassword: $newPassword
      type: $type
    ) {
      path
      message
    }
  }
`;

const settings = ({ client }) => (
  <div className="hero">
    <div className="hero-body">
      <div className="container">
        <div
          className="notification is-warning animated bounceInLeft"
          style={{ margin: 10 }}
        >
          <Linkify
            decoraction="subtitle"
            text="El correo electrónico principal y la contraseña son muy importantes para Te Vi Colombia, por ello se tiene una sección especial para hacer cualquier cambio. Si el correo electrónico o contraseña es cambiado, todas las secciones en teléfonos y computadoras hechas en Te Vi Colombia van a ser eliminadas."
            length={100}
          />
        </div>

        <Query query={meQuery}>
          {({ loading, data }) => {
            if (loading) {
              return <Loading />;
            }

            if (!data.me) {
              return <Error statusCode={404} />;
            }

            return (
              <Mutation
                mutation={settingsMutation}
                onCompleted={e => {
                  client.cache.reset().then(() => {
                    Router.push("/login");
                  });
                }}
              >
                {mutate => (
                  <Formik
                    initialValues={{
                      email: data.me.email,
                      password: "",
                      newPassword: "",
                      type: data.me.type
                    }}
                    validationSchema={UserConfigurationValidation}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                      const response = await mutate({
                        variables: {
                          email: values.email,
                          password: values.password,
                          newPassword: values.newPassword,
                          type: values.type
                        }
                      });

                      // if settings has data, it has the errors
                      if (
                        response.data.settings &&
                        response.data.settings.length
                      ) {
                        setSubmitting(false);
                        setErrors(normalizeErrors(response.data.settings));
                        document
                          .querySelector(
                            `[name="${response.data.settings[0].path}"]`
                          )
                          .focus();
                      }
                    }}
                    render={({ isSubmitting }) => (
                      <Form method="POST" style={{ padding: "0 10vw" }}>
                        <label className="label">Correo electrónico</label>
                        <TextField
                          type="email"
                          name="email"
                          placeholder="Correo electrónico"
                          isRequired
                        />

                        <label className="label">Contraseña</label>
                        <TextField
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          isRequired
                        />

                        <label className="label">Contraseña nueva</label>
                        <TextField
                          type="password"
                          name="newPassword"
                          placeholder="Contraseña nueva"
                          isRequired
                        />

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`button is-block is-primary is-large ${
                            isSubmitting ? "is-loading" : ""
                          }`}
                        >
                          Enviar
                        </button>
                      </Form>
                    )}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    </div>
  </div>
);

settings.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default withApollo(settings);
