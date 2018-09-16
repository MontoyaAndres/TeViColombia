import React, { Fragment } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const isNotLoggedIn = ({ handleClose }) => (
	<Fragment>
		<Link href="/login" prefetch passHref>
			<div>
				<Button color="secondary" onClick={handleClose}>
					Entrar
				</Button>
			</div>
		</Link>

		<Link href="/register" prefetch passHref>
			<div>
				<Button color="secondary" onClick={handleClose}>
					Registrarse
				</Button>
			</div>
		</Link>
	</Fragment>
);

export default isNotLoggedIn;
