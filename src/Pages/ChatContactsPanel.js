import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import socketIOClient from "socket.io-client";
// import socket from '../SocketClient';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
// import Checkbox from '@material-ui/core/Checkbox';
// import { Route } from 'react-router';
// import ChatPanel from '../Components/ChatPanel';
import { Paper } from '@material-ui/core';
import EventsContext from '../EventsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width:'25%',
        height:'93%',
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            width:'100%',
            height:'86%'
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
    // const token = localStorage.getItem('token');
    const classes = useStyles();
    // useEffect(() => {
    //     socket.emit('initialdata');
    // }, [])
    const allEvents = React.useContext(EventsContext);
    // const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([0]);
    const handleToggle = (value,userid) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // setOpen(!open);
        props.setChatId(value);
        props.setAdminId(userid);
        setChecked(newChecked);
    };

    const handleClick = (v) => () => {
        console.log(v);
        // history.push('/chat/1')
    };
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
                {allEvents.map((value) => {
                    const labelId = `checkbox-list-label-${value._id}`;

                    return (
                        <React.Fragment>
                            <ListItem key={value._id} role={undefined} dense button selected={checked.indexOf(value._id) !== -1} onClick={handleToggle(value._id,value.user_id)}>
                                <ListItemIcon>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${value + 1}`}
                                            src={process.env.REACT_APP_API_URL+`/api/image?id=${value.posterUrl}`}
                                        />
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.name} />
                                {checked.indexOf(value._id) !== -1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={checked.indexOf(value._id) !== -1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem key={value} className={classes.nested} button onClick={handleClick(value)}>
                                        {/* <ListItemIcon>
                                                        <StarBorder />
                                                    </ListItemIcon> */}
                                        <ListItemText primary="Not Registered" />
                                        <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                                    </ListItem>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        {/* <ListItemIcon>
                                                        <StarBorder />
                                                    </ListItemIcon> */}
                                        <ListItemText primary="Registered" />
                                        <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                                    </ListItem>
                                </List>
                            </Collapse>
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
