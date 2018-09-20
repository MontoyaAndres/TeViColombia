import React, { PureComponent } from "react";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import { posts } from "../../api/post";

const styles = {
	card: {
		maxWidth: 345
	},
	media: {
		objectFit: "cover"
	}
};

class cards extends PureComponent {
	state = {
		publications: []
	};

	async componentWillMount() {
		// the pagination is 6 because that is what It'll use.
		const response = await posts(6);

		this.setState({ publications: response.posts });
	}

	sharePublication = publication => {
		if (navigator.share) {
			navigator.share({
				title: publication.title,
				url: `${window.location.hostname}/post/${publication.id}`
			});
		}
	};

	redirect = id => {
		Router.push(`/post/${id}`);
	};

	render() {
		const { classes } = this.props;
		const { publications } = this.state;

		return (
			<Grid container>
				<Grid item xs>
					<Grid container justify="center">
						{publications.map(publication => (
							<Card className={classes.card} key={publication.id}>
								<CardActionArea onClick={() => this.redirect(publication.id)}>
									<CardMedia
										component="img"
										className={classes.media}
										height="140"
										image={publication.image}
										title={publication.title}
									/>
									<CardContent>
										<Typography gutterBottom variant="headline" component="h2">
											{publication.title}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<IconButton
										aria-label="Add to favorites"
										onClick={this.likePublicaction}
									>
										<FavoriteIcon />
									</IconButton>
									<IconButton
										aria-label="Share"
										onClick={() => this.sharePublication(publication)}
									>
										<ShareIcon />
									</IconButton>
								</CardActions>
							</Card>
						))}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(cards);
