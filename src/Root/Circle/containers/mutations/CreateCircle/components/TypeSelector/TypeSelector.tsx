import * as React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';

interface Props {
  updateType: (type: string) => void;
  classes: {
    container: string;
    media: string;
    card: string;
  };
}

const styles = theme =>
  createStyles({
    container: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      height: 390,
    },
    media: {
      objectFit: 'cover',
    },
    card: {
      maxWidth: 345,
    },
  });

const TypeSelector: React.SFC<Props> = ({ updateType, classes }) => {
  const types = [
    {
      id: 'type1',
      type: '',
    },
  ];
  return (
    <div className={classes.container}>
      <Grid container spacing={24}>
        {types.map(type => {
          return (
            <Grid key={type.id} item xs={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // alt="Contemplative Reptile"
                    className={classes.media}
                    // height="140"
                    image="https://cdn2.bigcommerce.com/n-zfvgw8/a8bv6/products/418/images/627/Notepad_Pen__81380.1416860234.375.513.jpg?c=2"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Lizard
                    </Typography>
                    <Typography>
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Paper>
            <Button onClick={() => updateType('STRING')}>Select</Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TypeSelector);
