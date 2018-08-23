import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/apple-logo.png"
              title="Apple, Inc."
            />
            <CardContent>
              <Typography type="headline" component="h2">
                Apple
              </Typography>
              <Typography type="body2">
                Software Engineering Intern
              </Typography>
              <Typography component="p">
                Working on Radar for iOS Systems in Summer 2018.
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary" href="https://bugreport.apple.com/web/" target="_blank">
                Website
              </Button>
              <Button dense color="primary" href="https://developer.apple.com/bug-reporting/" target="_blank">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/EECS-logo.png"
              title="EECS Department"
            />
            <CardContent>
              <Typography type="headline" component="h2">
                UC Berkeley
              </Typography>
              <Typography type="body2">
                Undergraduate Student Instructor
              </Typography>
              <Typography component="p">
                Taught weekly lab and discussions for CS 61A.
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary" href="https://inst.eecs.berkeley.edu/~cs61a/fa17/" target="_blank">
                Website
              </Button>
              <Button dense color="primary" href="https://inst.eecs.berkeley.edu/~cs61a/fa17/articles/about.html" target="_blank">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/vd-logo.png"
              title="Venture Dojo"
            />
            <CardContent>
              <Typography type="headline" component="h2">
                Venture Dojo
              </Typography>
              <Typography type="body2">
                Chief Technology Officer
              </Typography>
              <Typography component="p">
                Launching in Mexico, Brazil, Malaysia, and the Philippines.
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense color="primary" href="https://venturedojo.com/" target="_blank">
                Website
              </Button>
              <Button dense color="primary" href="https://venturedojo.com/about-us/" target="_blank">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
