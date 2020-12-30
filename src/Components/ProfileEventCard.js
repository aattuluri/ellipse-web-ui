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
import EventShareDialog from '../Components/EventShareDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const event = props.event;
  const t = localStorage.getItem('theme');
  // const [image, setImage] = React.useState(null);
  // const token = localStorage.getItem('token');
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  // function handleViewButtonClick() {
  //   props.handleViewClick(props.event);
  // }
  function handleShareClose() {
    setShareDialogOpen(false);
  }
  function handleShareClick() {
    setShareDialogOpen(true);
  }

  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        height="180"
        image={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.name}
        </Typography>
        
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={handleShareClick}>
          Share
        </Button>
        <Button  size="small" color="primary">
          {t === 'light' ? <Link to={{ pathname: `/event/${event._id}` }} style={{ textDecoration: 'none', color: '#00bdaa' }}>View</Link> :
            <Link to={{ pathname: `/event/${event._id}`}} style={{ textDecoration: 'none', color: '#00bdaa' }}>View</Link>}
        </Button>
        <Typography align="right" variant="body2" color="textSecondary" component="p">
          {event.status.toUpperCase()}
        </Typography>
      </CardActions>
      <EventShareDialog
        event={event}
        open={shareDialogOpen}
        handleClose={handleShareClose}></EventShareDialog>
    </Card>
  );
}