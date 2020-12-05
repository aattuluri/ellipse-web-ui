import React from 'react';
// import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import HotelIcon from '@material-ui/icons/Hotel';
// import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SubPanel1 from './EventsTeamSubPanel1';
import SubPanel2 from './EventsTeamSubPanel2';
import SubPanel3 from './EventsTeamSubPanel3';

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
    root2: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        // marginBottom: theme.spacing(2),
        // padding: theme.spacing(1)

    },
}));

function AboutEventPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    // const token = localStorage.getItem('token');
    // const event = props.event;
    const [subIndexValue, setSubIndexValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSubIndexValue(newValue);
    };


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <Paper className={classes.root2}>
                        <Tabs
                            value={subIndexValue}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab label="Submissions" />
                            <Tab label="Your Team" />
                            <Tab label="Create Team" />
                            <Tab label="Join Team" />
                        </Tabs>
                    </Paper>
                    <SubPanel1 value={subIndexValue} index={1} event={props.event}></SubPanel1>
                    <SubPanel2 value={subIndexValue} index={2} event={props.event}></SubPanel2>
                    <SubPanel3 value={subIndexValue} index={3} event={props.event}></SubPanel3>
                </div>
            )}
        </div>
    );
}

export default AboutEventPanel;
