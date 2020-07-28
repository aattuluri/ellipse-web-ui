import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
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
    timiline:{
        // display:'flex',
        // alignItems: 'flex-start',

        // backgroundColor: theme.palette.primary.dark
    }
}));

export default function CustomizedTimeline(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;

    return (
        <div
        
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (

               <Card className={classes.root}>
               <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        {/* <Typography variant="h5" component="h2"> */}
          {/* be{bull}nev{bull}o{bull}lent */}
        {/* </Typography> */}
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
               </Card>

            )}
        </div>
    );
}