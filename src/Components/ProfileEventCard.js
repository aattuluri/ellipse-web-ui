import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
    }
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const event = props.event;
  // const [image, setImage] = React.useState(null);
  // const token = localStorage.getItem('token');
  function handleViewButtonClick(){
    props.handleViewClick(props.event);
  }


  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          height="180"
          image={`http://139.59.16.53:4000/api/image?id=${event.posterUrl}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
        </CardContent>

      <CardActions>
        <Button  size="small" color="primary">
          Share
        </Button>
        <Button onClick={handleViewButtonClick} size="small" color="primary">
        <Link to={{pathname:`/event/${event._id}`,state:{event: props.event}}}   style={{textDecoration:'none',color:'#ffffff'}}>View</Link>
        </Button>
      </CardActions>
    </Card>
  );
}