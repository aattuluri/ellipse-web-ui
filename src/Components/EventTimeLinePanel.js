import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import HotelIcon from '@material-ui/icons/Hotel';
// import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import TimerIcon from '@material-ui/icons/Timer';
const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    // backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    alignContent: "center"

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
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  tab: {
    flexGrow: 1,
    // maxWidth: 800,
    background: theme.palette.secondary.main,
    alignItems: 'center',
  },
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function AboutEventPanel(props) {
  const classes = useStyles();
  const { children, value, url, index, ...other } = props;
  // const user = JSON.parse(localStorage.getItem('user'));
  // const token = localStorage.getItem('token');
  const event = props.event;
  const startDate = new Date(event.start_time);
  const endDate = new Date(event.finish_time);
  const regEndDate = new Date(event.registrationEndTime);
  // const event = props.event;
  // const tags = event.tags;
  // const calculateTimeLeft = () => {
  //   const difference = +new Date(event.registrationEndTime) - +new Date();
  //   let timeLeft = {};

  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60)
  //     };
  //   }

  //   return timeLeft;
  // };

  // const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  // });

  // const timerComponents = [];
  // Object.keys(timeLeft).forEach(interval => {
  //   if (!timeLeft[interval]) {
  //     return;
  //   }

  //   timerComponents.push(
  //     <span>
  //       {timeLeft[interval]} {interval}{" "}
  //     </span>
  //   );
  // });
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <div className={classes.root}>
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {regEndDate.toDateString()}{" "+regEndDate.toLocaleTimeString()}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                <TimerIcon></TimerIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Registration Ends
                  </Typography>
                  <Typography>Your oppurtunity to participate came to an end</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                {startDate.toDateString()}{" "+startDate.toLocaleTimeString()}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined"> 
                <TimerIcon></TimerIcon>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Starts
                  </Typography>
                  <Typography>Party begins</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                {endDate.toDateString()}{" "+endDate.toLocaleTimeString()}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <TimerIcon></TimerIcon>
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Ends
                  </Typography>
                  <Typography>Chill,event came to an end</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            {/* <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <RepeatIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Repeat
            </Typography>
                  <Typography>Because this is the life you love!</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem> */}
          </Timeline>
        </div>
      )}
    </div>
  );
}

export default AboutEventPanel;