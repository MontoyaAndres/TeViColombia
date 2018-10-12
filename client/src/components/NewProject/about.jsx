import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import MatricesList from "./MatricesList";

const styles = {
	appBar: {
		position: "relative"
	},
	flex: {
		flex: 1
	}
};

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

const About = ({ classes, closeWindow, open, name }) => (
	<div>
		<Dialog
			fullScreen
			open={open}
			onClose={() => closeWindow()}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						onClick={() => closeWindow()}
						aria-label="Close"
					>
						<CloseIcon />
					</IconButton>
					<Typography
						component="h6"
						variant="title"
						color="inherit"
						className={classes.flex}
					>
						{name}
					</Typography>
				</Toolbar>
			</AppBar>
			<List>
				{MatricesList.list.map(
					(matrice, key) =>
						matrice.name === name && (
							<Fragment key={key}>
								<div style={{ padding: 20 }}>
									<Typography component="h4" variant="display1">
										Concepto
									</Typography>
								</div>
								<Divider />
								<div style={{ padding: 20 }}>
									<Typography
										component="h6"
										variant="title"
										style={{ fontWeight: 400 }}
									>
										{matrice.about.concept}
									</Typography>
								</div>

								<div style={{ padding: 20 }}>
									<Typography component="h4" variant="display1">
										Procedimiento para su elaboración
									</Typography>
								</div>
								<Divider />
								<div style={{ padding: 20 }}>
									<Typography
										component="h6"
										variant="title"
										style={{ fontWeight: 400 }}
									>
										{matrice.about.elaboration.map((step, index) => (
											<ul key={index} style={{ paddingTop: 10 }}>
												<li>{step}</li>
											</ul>
										))}
									</Typography>
								</div>

								<div style={{ padding: 20 }}>
									<Typography component="h4" variant="display1">
										Criterios de decisión
									</Typography>
								</div>
								<Divider />
								<div style={{ padding: 20 }}>
									<Typography
										component="h6"
										variant="title"
										style={{ fontWeight: 400 }}
									>
										{matrice.about.criteria.split("\n").map((item, index) => (
											<Fragment key={index}>
												{item}
												<br />
											</Fragment>
										))}
									</Typography>
								</div>
							</Fragment>
						)
				)}
			</List>
		</Dialog>
	</div>
);

export default withStyles(styles)(About);
