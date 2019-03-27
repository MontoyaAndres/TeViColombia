import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Link from "next/link";

import { TextField } from "../components/shared/globalField";
import { LoginValidation } from "../utils/validation";
import normalizeErrors from "../utils/normalizeErrors";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import meQuery from "../graphql/queries/me";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      path
      message
    }
  }
`;

const login = () => {
  const [light, setLight] = useState(true);

  return (
    <div className="container has-text-centered static-height">
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Entrar a Te Vi Colombia</h3>
        <div className="box animated bounceInLeft">
          <figure className="avatar">
            <img
              className="logo"
              src={
                light ? "/static/img/lightOn.svg" : "/static/img/lightOff.svg"
              }
              onClick={() => setLight(!light)}
              alt="login"
            />
          </figure>

          <Mutation mutation={loginMutation}>
            {mutate => (
              <Formik
                initialValues={{
                  email: "",
                  password: ""
                }}
                validationSchema={LoginValidation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const { data } = await mutate({
                    variables: values,
                    refetchQueries: [{ query: meQuery }]
                  });

                  // if login has data, it has the errors
                  if (data.login && data.login.length) {
                    setSubmitting(false);
                    setErrors(normalizeErrors(data.login));
                    document
                      .querySelector(`[name="${data.login[0].path}"]`)
                      .focus();
                  } else {
                    setSubmitting(false);
                    Router.push("/");
                  }
                }}
                render={({ isSubmitting }) => (
                  <Form method="POST">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      isRequired
                    />

                    <TextField
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      isRequired
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`button is-block is-primary is-large is-fullwidth ${
                        isSubmitting ? "is-loading" : ""
                      }`}
                    >
                      Entrar
                    </button>

                    <div style={{ padding: 10 }}>
                      <Link href="/password" prefetch>
                        <a>¿Ha olvidado la contraseña?</a>
                      </Link>
                    </div>
                  </Form>
                )}
              />
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
};

login.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.me) {
    redirect(context, "/");
  }

  return {};
};

export default withApollo(login);
