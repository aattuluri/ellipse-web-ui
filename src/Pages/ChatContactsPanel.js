import React from 'react';

//materialui imports
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';

//other component imports
import AuthContext from '../AuthContext';
import EventsContext from '../EventsContext';

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
    subRoot: {
        position: 'relative',
        overflow: 'auto',
        maxHeight: '100%',
        width: '100%',
    },
    divider: {
        backgroundColor: theme.palette.primary.main,

    }
}));

const ChatContactsPanel = (props) => {
    const token = localStorage.getItem('token');
    const theme = useTheme();
    const classes = useStyles();

    const [teams, setTeams] = React.useState([]);
    const [checked, setChecked] = React.useState([0]);
    const [chatValue, setChatValue] = React.useState(0);

    const { currentUser } = React.useContext(AuthContext);
    const { allEvents } = React.useContext(EventsContext);


    const regEvents = allEvents.filter((val) => {
        return val.registered === true || val.user_id === currentUser.user_id;
    });

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/api/user/get_all_teams', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                response.json().then(value => {
                    setTeams(value);
                })
            }
            else if (response.status === 401) {
                localStorage.removeItem('token');
            }
        })
    }, [token])

    const handleToggle = (value, userid) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        props.setChatType('event')
        props.setChatId(value);
        props.setAdminId(userid);
        if (theme.breakpoints.width('md') >= window.innerWidth) {
            props.openDialog(true);
        }
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
        props.setChatType('team')
        props.setChatId(value);
        props.setAdminId(userid);
        setChecked(newChecked);
        if (theme.breakpoints.width('md') >= window.innerWidth) {
            props.openDialog(true);
        }
    };

    const handleChatChange = (value) => () => {
        setChatValue(value)
    }


    return (
        <div>
            <div className={classes.root}>
                <Paper className={classes.root}>
                    <Box display="flex" justifyContent="center">
                        <Box paddingRight={1} paddingLeft={1}>
                            <IconButton onClick={handleChatChange(0)}>
                                <Box style={{ width: "100px" }}>
                                    <Box>
                                        <EventIcon color={chatValue === 0 ? "primary" : "default"}></EventIcon>
                                    </Box>
                                    <Box >
                                        <Divider className={chatValue === 0 && classes.divider}></Divider>
                                    </Box>
                                </Box>
                            </IconButton>
                        </Box>
                        <Box paddingRight={1} paddingLeft={1}>
                            <IconButton onClick={handleChatChange(1)}>
                                <Box style={{ width: "100px" }}>
                                    <Box>
                                        <GroupIcon color={chatValue === 1 ? "primary" : "default"}></GroupIcon>
                                    </Box>
                                    <Box>
                                        <Divider className={chatValue === 1 && classes.divider}></Divider>
                                    </Box>
                                </Box>
                            </IconButton>
                        </Box>
                    </Box>
                    <List className={classes.subRoot}>
                        {chatValue === 0 && regEvents.map((value) => {
                            const labelId = `checkbox-list-label-${value._id}`;
                            return (
                                <React.Fragment>
                                    <ListItem key={value._id} role={undefined} dense button
                                        selected={checked.indexOf(value) !== -1}
                                        onClick={handleToggle(value, value.user_id)}>
                                        <ListItemIcon>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`user avatar n°${value + 1}`}
                                                    src={process.env.REACT_APP_API_URL + `/api/image?id=${value.poster_url}`}
                                                />
                                            </ListItemAvatar>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.name} />
                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                        {
                            chatValue === 0 && regEvents.length === 0 && <Typography>No Events Found, Register or host event to join one</Typography>
                        }
                        {chatValue === 1 && teams.map((value) => {
                            const labelId = `checkbox-list-label-${value._id}`;
                            return (
                                <React.Fragment>
                                    <ListItem key={value._id} role={undefined} dense button
                                        selected={checked.indexOf(value) !== -1}
                                        onClick={handleToggle2(value, value.user_id)}>
                                        <ListItemIcon>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={value.team_name}
                                                    src="abc.jpg"
                                                />
                                            </ListItemAvatar>
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.team_name} />
                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                    </ListItem>
                                </React.Fragment>
                            );
                        })}
                        {
                            chatValue === 1 && teams.length === 0 && <Typography>No Teams found</Typography>
                        }
                    </List>
                </Paper>
            </div>
        </div>
    );
}

export default ChatContactsPanel
