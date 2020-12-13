import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import socketIOClient from "socket.io-client";
// import socket from '../SocketClient';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import StarBorder from '@material-ui/icons/StarBorder';
// import Collapse from '@material-ui/core/Collapse';
// import Checkbox from '@material-ui/core/Checkbox';
// import { Route } from 'react-router';
// import ChatPanel from '../Components/ChatPanel';
import { Paper } from '@material-ui/core';
import EventsContext from '../EventsContext';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import EventsContext from '../EventsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '25%',
        height: '93%',
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '86%'
        },
    },
    root2: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: '100%',
        width: '100%',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ChatPage(props) {
    // const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const classes = useStyles();
    const { allEvents } = React.useContext(EventsContext);
    const [teams,setTeams] = React.useState([]);
    // const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([0]);
    const regEvents = allEvents.filter((val) => {
        return val.registered === true;
    });

    React.useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + '/api/user/get_all_teams', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            // console.log(response);
            if (response.status === 200) {
                response.json().then(value => {
                    
                    setTeams(value);
                    console.log(value);
                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
                // setAuthorized(false);
            }

        })
    },[token])
    const handleToggle = (value, userid) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // setOpen(!open);
        props.setChatType('event')
        props.setChatId(value);
        props.setAdminId(userid);
        setChecked(newChecked);
    };

    const handleToggle2 = (value, userid) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // setOpen(!open);
        props.setChatType('team')
        props.setChatId(value);
        props.setAdminId(userid);
        setChecked(newChecked);
    };

    // const handleClick = (v) => () => {
    //     console.log(v);
    //     // history.push('/chat/1')
    // };


    return (
        // <div>
        //     <div className={classes.root}>
        //            {/* <Typography>Chat</Typography> */}
        //            {/* <Typography>Chat</Typography>     */}
        //     </div>

        // </div>
        <div>
            <div className={classes.root}>
                <Paper className={classes.root}>
                    <List className={classes.root2}>
                        {regEvents.map((value) => {
                            const labelId = `checkbox-list-label-${value._id}`;
                            return (
                                <React.Fragment>
                                    <ListItem key={value._id} role={undefined} dense button
                                        selected={checked.indexOf(value) !== -1}
                                        onClick={handleToggle(value, value.user_id)}>
                                        <ListItemIcon>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar n°${value + 1}`}
                                                    src={process.env.REACT_APP_API_URL + `/api/image?id=${value.poster_url}`}
                                                />
                                            </ListItemAvatar>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.name} />
                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                        {/* {checked.indexOf(value._id) !== -1 ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItem>
                                    {/* <Collapse in={checked.indexOf(value._id) !== -1} timeout="auto" unmountOnExit> */}
                                    {/* <List component="div" disablePadding>
                                            <ListItem key={value} className={classes.nested} button onClick={handleClick(value)}>
                                                <ListItemText primary="Not Registered" />
                                                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                                            </ListItem>
                                        </List>
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested}>
                                                <ListItemText primary="Registered" />
                                                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                                            </ListItem>
                                        </List> */}
                                    {/* </Collapse> */}
                                </React.Fragment>
                            );
                        })}
                        {teams.map((value) => {
                            const labelId = `checkbox-list-label-${value._id}`;
                            return (
                                <React.Fragment>
                                    <ListItem key={value._id} role={undefined} dense button
                                        selected={checked.indexOf(value) !== -1}
                                        onClick={handleToggle2(value, value.user_id)}>
                                        <ListItemIcon>
                                            <ListItemAvatar>
                                                <Avatar
                                                    // alt={`Avatar n°${value + 1}`}
                                                    src={process.env.REACT_APP_API_URL + `/api/image?id=${value.posterUrl}`}
                                                />
                                            </ListItemAvatar>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.team_name} />
                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                        {/* {checked.indexOf(value._id) !== -1 ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Paper>
            </div>
        </div>
    );
}

export default ChatPage;
