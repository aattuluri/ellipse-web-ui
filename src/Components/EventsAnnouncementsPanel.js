import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%'

  },
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timiline: {

  },
  root3: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  root5: {
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
    fetch(process.env.REACT_APP_API_URL+`/api/event/get_announcements?id=${event._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        setAnnouncements(value);
      })
    })
  }, [token, event._id])

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
                    {date.toDateString()}{" " + date.toLocaleTimeString()}
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