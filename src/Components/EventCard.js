import React from 'react';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
// import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),

  },
  media: {
    // height: 250,
    // paddingTop: '56.25%', // 16:9
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  buttonDiv:{
    marginLeft: 'auto',
  },
  button: {
    margin: theme.spacing(0.5),
  }
}));




function Eventcard(props) {
  const classes = useStyles();
  function handleMoreButtonClick(){
    console.log("button clicked");
    props.click(props.eventId);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <img alt="profile" height="160" width="150" src={props.url}></img>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h5" color="textPrimary" component="p">
            {props.name}
        </Typography>
        }
        subheader={
          <Typography variant="body1" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          Details
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.eventMode} {props.eventType}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Last Date for Registration: {props.regEndTime}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Start Time: {props.startTime}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          End Time: {props.endTime}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <MailIcon></MailIcon>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div className={classes.buttonDiv}>
        <Button size="small" color="primary" variant="outlined" className={classes.button} onClick={handleMoreButtonClick}>
          Learn More
        </Button>
        <Button size="small" color="primary" variant="contained" className={classes.button}>
          Register
        </Button>
        </div>
        
      </CardActions>
    </Card>);
}

export default Eventcard;

