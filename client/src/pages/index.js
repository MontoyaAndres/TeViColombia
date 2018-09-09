import React from "react";

import withAuth from "../utils/withAuth";

const index = ({ data }) => <h1>Hola</h1>;

export default withAuth(index);
