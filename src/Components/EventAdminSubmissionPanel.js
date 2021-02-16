import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Box, } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import TeamMemberListItem from './TeamMemberListItem';
import EventSubmissionDialog from './EventSubmissionDialog';
import SubmissionShareDialog from './SubmissionShareDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        backgroundColor: theme.palette.secondary.main,
        marginBottom: theme.spacing(2),
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
    grid: {
        borderRadius: theme.spacing(3),
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        maxWidth: '99%'

    },
    roundButton: {
        borderRadius: theme.spacing(3),
        margin: theme.spacing(1)
    },
    progress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

function EventAdminSubmissionPanel(props) {
    const classes = useStyles();
    const event = props.event;
    const token = localStorage.getItem('token');
    const [registrations, setRegistrations] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const [showMembers, setShowMembers] = React.useState(false);
    const [teamIndex, setTeamIndex] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [viewSubmissionDialog, setViewSubmissionDialog] = React.useState(false);
    const [selectedSubmission, setSelectedSubmission] = React.useState(null);
    const [selectedTeam, setSelectedTeam] = React.useState(null);
    const [shareDialogOpen,setShareDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (event.isTeamed) {
            getTeamData();
        }
        else {
            getIndividualsData();
        }
        // eslint-disable-next-line
    }, [event])

    const getIndividualsData = () => {
        setLoading(true);
        try {
            fetch(process.env.REACT_APP_API_URL + `/api/event/registeredEvents?id=${event._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                response.json().then(value => {
                    // console.log(value);
                    setRegistrations(value);
                    setLoading(false);
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    const getTeamData = () => {
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
                    // console.log(value);
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
                    setTeamIndex(v);
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

    const handleRoundClickButton = (sub, t) => () => {
        setSelectedSubmission(sub);
        setSelectedTeam(t);
        setViewSubmissionDialog(true);
    }

    const handleAccessButton = (is_teamed, user_id, title,team_id) => () => {
        setLoading(true);
        var data = new FormData()
        var payload ;
        if(is_teamed){
            payload = {
                is_teamed: is_teamed,
                event_id: event._id,
                user_id: user_id,
                round_title: title,
                team_id: team_id
            }
        }
        else{
            payload = {
                is_teamed: is_teamed,
                event_id: event._id,
                user_id: user_id,
                round_title: title
            }
        }
        
        data = JSON.stringify(payload);
        // console.log(data);
        fetch(process.env.REACT_APP_API_URL + `/api/event/give_access_round`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: data
        }).then(res => {
            if (res.status === 200) {
                res.json().then(value => {
                    setLoading(false);
                    if (event.isTeamed) {
                        getTeamData();
                    }
                    else {
                        getIndividualsData();
                    }

                })

            }
        })
    }

    const handleShareButtonClick = (v) => () => {
        setSelectedTeam(v);
        setShareDialogOpen(true)
    }

    return (
        <div>
            <div className={classes.progress}>
                <Fade
                    in={loading}
                    unmountOnExit>
                    <CircularProgress />
                </Fade>
            </div>
            <Typography>All Submissions</Typography>
            {
                teams.map(v => {
                    return <Grid container component="main" className={classes.grid} >
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
                                            {
                                                showMembers && v === teamIndex && <div>
                                                    <Typography color="textSecondary" variant="body2">Submissions</Typography>
                                                    {v.submissions.map((value, index) => {
                                                        return <React.Fragment>
                                                            <Button onClick={handleRoundClickButton(value, v)} variant="outlined" className={classes.roundButton}>
                                                                {value.title}
                                                            </Button>
                                                            {!value.submission_access && <Button onClick={handleAccessButton(true, v.user_id, value.title,v._id)}>Give Access</Button>}
                                                            <br></br>
                                                        </React.Fragment>
                                                    })}
                                                </div>
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" justifyContent="flex-end">
                            <Button disabled={loading} onClick={handleViewMembersClick(v)}>{(showMembers && v === teamIndex) ? "Hide" : "View"}</Button>
                                <Button disabled={loading} onClick={handleShareButtonClick(v)}>Share</Button>
                            </Box>
                            <Box>
                                {showMembers && v === teamIndex && <div>
                                    <Typography color="textSecondary" variant="body2">Members</Typography>
                                    {
                                        v.members.map((value, index) => {
                                            return <TeamMemberListItem admin={false} event={props.event} id={v} user_id={value}></TeamMemberListItem>
                                        })
                                    }
                                </div>}
                            </Box>
                        </Grid>
                    </Grid>
                })
            }
            {
                registrations.map((v, index) => {
                    return <Grid container component="main" className={classes.grid} >
                        <Grid item xs={12} md={6}>
                            <Box className={classes.root0}>
                                <Box className={classes.adminDetails}>
                                    <Box>
                                        <Avatar className={classes.avatar} alt={v.data.Name}>{v.data.Name[0]}</Avatar>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography variant="h5">{v.data.Name}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color="textSecondary" variant="body2"> </Typography>
                                            {
                                                showMembers && v === teamIndex && <div>
                                                    <Typography color="textSecondary" variant="body2">Submissions</Typography>
                                                    {v.submissions.map((value, index) => {
                                                    
                                                        return <React.Fragment>
                                                            <Button onClick={handleRoundClickButton(value, v)} variant="outlined" className={classes.roundButton}>
                                                                {value.title}
                                                            </Button>
                                                            {!value.submission_access && <Button onClick={handleAccessButton(false, v.user_id, value.title)}>Give Access</Button>}
                                                            <br></br>
                                                        </React.Fragment>
                                                    })}
                                                </div>
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button disabled={loading} onClick={handleViewMembersClick(v)}>{(showMembers && v === teamIndex) ? "Hide" : "View"}</Button>
                                <Button disabled={loading} onClick={handleShareButtonClick(v)}>Share</Button>
                            </Box>
                        </Grid>
                    </Grid>
                })
            }
            {viewSubmissionDialog && event.isTeamed && <EventSubmissionDialog
                event={event}
                reg={selectedTeam}
                name={selectedTeam && selectedTeam.team_name}
                submission={selectedSubmission}
                open={viewSubmissionDialog}
                setOpen={setViewSubmissionDialog}>

            </EventSubmissionDialog>}
            {viewSubmissionDialog && !event.isTeamed && <EventSubmissionDialog
                event={event} reg={selectedTeam}
                name={selectedTeam && selectedTeam.data.Name}
                submission={selectedSubmission}
                open={viewSubmissionDialog}
                setOpen={setViewSubmissionDialog}>

            </EventSubmissionDialog>}
            {
                <SubmissionShareDialog open={shareDialogOpen} setOpen={setShareDialogOpen} reg={selectedTeam}></SubmissionShareDialog>
            }
        </div>
    );
}
export default EventAdminSubmissionPanel;