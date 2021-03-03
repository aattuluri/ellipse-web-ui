import React from 'react';
import { Button, Typography, Box, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import PeopleIcon from '@material-ui/icons/People';
import Grid from '@material-ui/core/Grid';
// import WebSocketContext from '../WebSocketContext';
// import AuthContext from '../AuthContext';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import TeamMemberListItem from './TeamMemberListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(0),
    },

    button: {
        margin: theme.spacing(1),
        borderRadius: theme.spacing(2),
        maxWidth: "260px"
    },
    adminDetails: {
        display: "flex",
        justifyContent: "flex-start",
        // marginTop: theme.spacing(2)
    },
    root0: {
        display: "flex",
        justifyContent: "flex-start",


    },
    root1: {
        display: "flex",
        justifyContent: "flex-start",
        borderRadius: theme.spacing(3),
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: "rgb(0, 189, 170,0.2)",
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(1)
    },
    avatar2: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: theme.spacing(1)
    },
    grid: {
        borderRadius: theme.spacing(3),
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        maxWidth: '99%'

    },
    progress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

function EventDetailsTeamPanel(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 6000,
    });
    const { children, value, url, index, ...other } = props;
    // const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const event = props.event;
    const [teams, setTeams] = React.useState([]);
    // const [sentRequests, setSentRequests] = React.useState([]);
    const [showMembers, setShowMembers] = React.useState(false);
    const [teamIndex, setTeamIndex] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // const { currentUser } = React.useContext(AuthContext);

    // const { webSocketContext } = React.useContext(WebSocketContext);
    const { vertical, horizontal, open, message, type, autoHide } = state;

    React.useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    function handleClose() {
        if (message === "Successful.Stay tunned with notifications and announcements") {
            props.fetchAll();
        }
        setState({ ...state, open: false });
    }

    const getData = () => {
        setLoading(true);
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_all_teams?id=${event._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                response.json().then(value => {
                    setTeams(value);
                    setLoading(false);
                })
            })
        }
        catch (e) {
            console.log(e);
        }

    }

    const handleViewMembersClick = (v) => () => {

        if (showMembers) {
            if (teamIndex !== {}) {
                if (teamIndex === v) {
                    setShowMembers(false);
                    setTeamIndex({});
                }
                else {
                    setTeamIndex(v)
                }
            }
            else {
                setShowMembers(false);
                setTeamIndex({});
            }
        }
        else {
            setShowMembers(true);
            setTeamIndex(v);
        }
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={autoHide}
                        onClose={handleClose}
                        key={vertical + horizontal}
                    >
                        <Alert onClose={handleClose} severity={type}>{message}</Alert>
                    </Snackbar>
                    <div className={classes.progress}>
                        <Fade
                            in={loading}
                            unmountOnExit>
                            <CircularProgress />
                        </Fade>
                    </div>
                    <Typography variant="body2" color="textSecondary">All Teams</Typography>
                    {!loading && teams.length === 0 && <Typography>No Teams Found</Typography>}
                    <div>
                        {
                            teams.map(v => {
                                return <Grid container component="main" className={classes.grid}>
                                    <Grid item xs={12} md={6}>
                                        <Box className={classes.root0}>
                                            <Box className={classes.adminDetails}>
                                                <Box>
                                                    <Avatar className={classes.avatar} alt={v.team_name}>{v.team_name[0]}</Avatar>
                                                </Box>
                                                <Box>
                                                    <Box>
                                                        <Typography variant="h5">{v.team_name}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography color="textSecondary" variant="body2">{v.description}</Typography>
                                                        {showMembers && v === teamIndex && <div>
                                                            {
                                                                v.members.map((value, index) => {
                                                                    return <TeamMemberListItem admin={false} event={props.event} id={v} user_id={value}></TeamMemberListItem>
                                                                })
                                                            }
                                                        </div>}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button disabled={loading} onClick={handleViewMembersClick(v)}>{(showMembers && v === teamIndex) ? "Hide Members" : "View Members"}</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventDetailsTeamPanel;