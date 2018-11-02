import React, { memo } from "react";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Add from "@material-ui/icons/Add";

const NewProject = ({ onHandleClose }) => (
	<div>
		<Link href="/" prefetch passHref>
			<ListItem button onClick={onHandleClose}>
				<ListItemIcon>
					<Add />
				</ListItemIcon>
				<ListItemText inset primary="Nuevo proyecto" />
			</ListItem>
		</Link>
	</div>
);

export default memo(NewProject);
