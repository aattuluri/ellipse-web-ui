import React from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';



import EventShareDialog from './EventShareDialog';


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
  },
  morePopup: {
    zIndex: '5'
  }
}));




function Eventcard(props) {
  const classes = useStyles();
  const event = props.event;
//   const t = localStorage.getItem('theme');
  const startDate = new Date(event.start_time);
  const endDate = new Date(event.finish_time);
  const regEndDate = new Date(event.registration_end_time);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  
  
  function handleShareClose() {
    setShareDialogOpen(false);
  }
  function handleShareClick() {
    setShareDialogOpen(true);
  }


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <React.Fragment>
            <img
              style={{ display: imageLoaded ? 'block' : 'none' }}
            //   onClick={handleImageClick}
              onLoad={() => setImageLoaded(true)}
              alt="Event Poster" height="160" width="150"
              src={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}>

            </img>
            {!imageLoaded && <div
              style={{
                height: "160px",
                width: "150px"
              }}>
              <CameraAltOutlinedIcon color="disabled" style={{ height: "160px", width: "150px" }} />
            </div>}
          </React.Fragment>

        }
        action={
          <div>
            <IconButton ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}>
              <MoreVertIcon />
            </IconButton>
            <Popper className={classes.morePopup} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleShareClick}>Share</MenuItem>
                        {/* <MenuItem onClick={handleReportClick}>Report</MenuItem> */}
                        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        }
        title={
          <Typography variant="h5" color="textPrimary" component="p">
            {event.name}
          </Typography>
        }
        subheader={
          <Typography variant="body1" color="textSecondary" component="p">
            {event.description}
        </Typography>
        }
      />
      <CardContent>
        
        <EventShareDialog
          event={event}
          open={shareDialogOpen}
          handleClose={handleShareClose}></EventShareDialog>
        {/* <Typography variant="body2" color="textPrimary" component="p">
          Details
        </Typography> */}
        <Chip variant="outlined" color="inherit" size="small" label={event.event_mode}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="inherit" size="small" label={event.fee_type}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="inherit" size="small" label={event.event_type}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="inherit" size="small" label={"Reg ends on " + regEndDate.toDateString()}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="inherit" size="small" label={"Starts on " + startDate.toDateString()}></Chip>
        <Chip style={{ marginLeft: "4px" }} variant="outlined" color="inherit" size="small" label={"Ends on " + endDate.toDateString()}></Chip>
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
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <MailIcon></MailIcon>
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <div className={classes.buttonDiv}>
          <Button size="small" color="primary" variant="outlined" className={classes.button} onClick={props.onClick}>
            See More
        </Button>
          {
            <Button disabled={event.registered ? true : false} size="small" color="primary" variant="contained" className={classes.button} onClick={props.onClick}>
              Register
            </Button>
          }
        </div>
        

      </CardActions>
    </Card>);
}

export default Eventcard;

