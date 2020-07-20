import React, { useEffect } from 'react';
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
// import Timeline from '@material-ui/lab/Timeline';
// import TimelineItem from '@material-ui/lab/TimelineItem';
// import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
// import TimelineConnector from '@material-ui/lab/TimelineConnector';
// import TimelineContent from '@material-ui/lab/TimelineContent';
// import TimelineDot from '@material-ui/lab/TimelineDot';
import Chip from '@material-ui/core/Chip';
// import PublicIcon from '@material-ui/icons/Public';
// import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { Link } from 'react-router-dom';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';


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
  buttonDiv: {
    marginLeft: 'auto',
  },
  button: {
    margin: theme.spacing(0.5),
  }
}));




function Eventcard(props) {
  const classes = useStyles();

  const startDate = new Date(props.startTime);
  const endDate = new Date(props.endTime);
  const regEndDate = new Date(props.regEndTime);
  const [image, setImage] = React.useState(null);
  const event = props.event;
  // console.log(typeof (props.startTime));
  const token = localStorage.getItem('token');
  function handleImageClick() {
    console.log("hello")
    props.imageDialog(image);
  }
  function handleRegClick() {
    props.handleReg(props.eventId);
  }
  function handleMoreButtonClick() {
    console.log("button clicked");
    props.click(props.eventId, image);
  }
  useEffect(() => {
    // fetch(`http://139.59.16.53:4000/api/event/image?id=${event.posterUrl}`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   method: 'GET'
    // }).then(response => {
    //   if (response.status === 200) {
    //     response.json().then(value => {
    //       const img = value.image;
    //       setImage(img.type + "," + img.image_data)
    //     })
    //   }

    // })
  }, [])

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          // image != null ?
            <img onClick={handleImageClick} alt="profile" height="160" width="150" src={`http://139.59.16.53:4000/api/image?id=${event.posterUrl}`}></img>
            // :
            // <div
            //   style={{
            //     height: "160px",
            //     width: "150px"
            //   }}>
            //   <CameraAltOutlinedIcon color="disabled" style={{ height: "160px", width: "150px" }} />
            // </div>

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
        {/* <Typography variant="body2" color="textPrimary" component="p">
          Details
        </Typography> */}
        <Chip variant="outlined" color="textSecondary" size="small" label={props.eventMode}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="textSecondary" size="small" label={props.feeType}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="textSecondary" size="small" label={props.eventType}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="textSecondary" size="small" label={"Reg ends at " + regEndDate.toDateString()}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="textSecondary" size="small" label={"Starts at " + startDate.toDateString()}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="textSecondary" size="small" label={"Ends at  " + endDate.toDateString()}></Chip>
        {/* <Grid container component="main">
          <Grid item xs={6} sm={6} md={6}>
            <Typography variant="h6" component="p">
            <PublicIcon></PublicIcon> {props.eventMode} 
            </Typography>
            <Typography variant="h6" component="p">
            <PublicIcon></PublicIcon> {props.eventType} 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Last Date for Registration:
            </Typography>
            <Typography variant="h5" color="textPrimary" component="p">
              {startDate.toDateString()}
            </Typography>

          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Timeline align='alternate'>
            <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">{startDate.toDateString()}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Starts</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">{startDate.toDateString()}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>Ends</Typography>
          </TimelineContent>
        </TimelineItem>
            </Timeline>
          </Grid>
        </Grid> */}

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
          <Button size="small" color="primary" variant="contained" className={classes.button} onClick={handleRegClick}>
            {/* <Link to={"/event/"+event._id} target="blank">Register</Link> */}
          Register
        </Button>
        </div>

      </CardActions>
    </Card>);
}

export default Eventcard;

