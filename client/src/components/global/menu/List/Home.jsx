import React from "react";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grade from "@material-ui/icons/Grade";

const Home = ({ onHandleClose }) => (
	<div>
		<Link href="/" prefetch passHref>
			<ListItem button onClick={onHandleClose}>
				<ListItemIcon>
					<Grade />
				</ListItemIcon>
				<ListItemText inset primary="Inicio" />
			</ListItem>
		</Link>
	</div>
);

export default Home;
