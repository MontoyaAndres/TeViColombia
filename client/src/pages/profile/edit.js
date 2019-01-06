import React from "react";
import { Formik, Form } from "formik";
import { withRouter } from "next/router";
import Error from "next/error";
import { Query } from "react-apollo";

import Loading from "../../components/shared/loading";
import checkLoggedIn from "../../lib/checkLoggedIn";
import redirect from "../../lib/redirect";
import { information } from "../../graphql/queries/information";
import { TextField } from "../../components/shared/globalField";

const edit = ({
  router: {
    query: { id }
  }
}) => (
  <Query query={information} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return <Loading />;
      }

      if (!data.information) {
        return <Error statusCode={404} />;
      }

      return (
        <Formik
          initialValues={{
            name: data.information.name,
            lastname: data.information.lastname
          }}
          onSubmit={async values => {
            console.log(values);
          }}
          render={({ isSubmitting }) => (
            <Form method="POST">
              {data.information.routeCover ? (
                <div style={{ height: 300 }}>
                  <img
                    alt="user cover"
                    src={`http://localhost:4000/${data.information.routeCover}`}
                  />
                </div>
              ) : (
                <div style={{ height: 300, backgroundColor: "#00ffd9" }} />
              )}

              <div className="container is-fullhd">
                <figure
                  className="avatar-profile"
                  style={{ textAlign: "center" }}
                >
                  <img
                    style={{ width: 200 }}
                    src={`http://localhost:4000/${data.information.routePhoto}`}
                    alt="profile"
                  />
                </figure>
              </div>

              <div className="container">
                <div className="columns">
                  <div className="column" style={{ padding: "0 .75rem" }}>
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Nombre de usuario"
                      isRequired
                    />
                  </div>
                  <div className="column" style={{ padding: "0 .75rem" }}>
                    <TextField
                      type="text"
                      name="lastname"
                      placeholder="Apellido de usuario"
                      isRequired
                    />
                  </div>
                </div>

                <div className="buttons has-addons is-centered">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`button is-primary is-large ${
                      isSubmitting ? "is-loading" : ""
                    }`}
                    style={{ width: 200 }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </Form>
          )}
        />
      );
    }}
  </Query>
);

edit.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/login");
  }

  return {};
};

export default withRouter(edit);
