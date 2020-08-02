import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    // marginLeft: theme.spacing(5),
    width: '100%'

  },
  paper: {
    padding: '6px 16px',
    // display: 'flex',
    // alignItems: 'left',
    // justifyContent: 'left',
    // backgroundColor: theme.palette.secondary.main,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timiline: {
    // display:'flex',
    // alignItems: 'flex-start',

    // backgroundColor: theme.palette.primary.dark
  },
  root3:{
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  root5:{
    display: "flex",
        justifyContent: "flex-end",
  }
}));

export default function CustomizedTimeline(props) {
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const { children, value, url, index, ...other } = props;
  const event = props.event;
  const [announcements, setAnnouncements] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://139.59.16.53:4000/api/event/get_announcements?id=${event._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        console.log(value);
        setAnnouncements(value);
      })
    })
  }, [])

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <div>
          {
            announcements.map((a, index) => {
              const date = new Date(a.time)

              return <Box m={1} p={1} key={index} className={classes.root3}>

                <Box className={classes.root2} whiteSpace="normal">
                  <Typography className={classes.title}>
                    {a.title}
                  </Typography>
                  <Typography className={classes.pos}>
                    {a.description}
                  </Typography>
                </Box>
                <Box className={classes.root5}>
                  <Typography variant="body2" >
                  {date.toDateString()}{" "+date.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            })
          }
        </div>


      )}
    </div>
  );
}