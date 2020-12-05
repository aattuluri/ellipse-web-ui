import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && (
        <div className={classes.root}>
        <Typography>Join Team</Typography>
            
        </div>
      )}
    </div>
  );
}

export default AboutEventPanel;
