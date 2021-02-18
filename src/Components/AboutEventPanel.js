import React from 'react';
import { cleanup } from '@testing-library/react';

//Material ui imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

//other component imports
import ImageDialog from '../Components/ImageDialog';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        alignContent: "center"

    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(1)
    },
    adminDetails: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: theme.spacing(2)
    },
    boxItem: {
        display: "flex",
        justifyContent: "center",
        minWidth: "20%"
    },
    gridMain: {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        marginTop: theme.spacing(1)

    },
    gridItem: {
        padding: theme.spacing(1),
        elevation: "5"

    },
    divider: {
        backgroundColor: theme.palette.primary.main,
        height: "1px",
        margin: theme.spacing(1),
        opacity: "0.2"
    },
    overFlowText: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "100px"
    }
}));

function AboutEventPanel(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const { children, value, url, index, ...other } = props;
    const event = props.event;
    const tags = event.tags;

    const [requirements, setRequirements] = React.useState([])
    const [timeLabel, setTimeLabel] = React.useState("Registration Ends in");
    const [adminDetails, setAdminDetails] = React.useState({});
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    const [notRegistered, setNotRegistered] = React.useState(false);
    const [rulesHeight, setRulesHeight] = React.useState(true);


    React.useEffect(() => {
        if (props.notRegistered) {
            setNotRegistered(true)
        }
        else {
            setNotRegistered(false)
        }
    }, [props])


    React.useEffect(() => {
        if (event.requirements !== undefined) {
            setRequirements(event.requirements);
        }
        if (event._id !== undefined && event.user_id !== undefined) {
            fetch(process.env.REACT_APP_API_URL + `/api/event/get_organizer_details?eventId=${event._id}&userId=${event.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET',
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(value => {
                        setAdminDetails(value);
                    })
                }
            })
        }
    }, [event, token])

    // code for timer
    const calculateTimeLeft = () => {

        var difference = +new Date(event.registration_end_time) - +new Date();
        let timeLeft = {};
        if (difference < 0) {
            difference = +new Date(event.start_time) - +new Date();
        }
        if (difference < 0) {
            difference = +new Date(event.finish_time) - +new Date();
        }
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const getTimeLabel = () => {
        var difference = +new Date(event.registration_end_time) - +new Date();
        let label = "Registration ends in"
        if (difference < 0) {
            label = "Starts in"
            difference = +new Date(event.start_time) - +new Date();
        }
        if (difference < 0) {
            label = "Ends in"
            difference = +new Date(event.finish_time) - +new Date();
        }
        return label;
    }

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        const x = setTimeout(() => {
            setTimeLabel(getTimeLabel());
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            cleanup();
            clearTimeout(x);
        }
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    const handleImageDialogClose = () => {
        setImageDialogOpen(false);
    }
    const handleImageDialogOpen = () => {
        setImageDialogOpen(true);
    }

    const handleRulesViewMoreButton = () => {
        setRulesHeight((height) => { return !height })
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                    <Grid container component="main">
                        <Grid item xs={12} sm={12} md={4} lg={4} >
                            <img
                                onClick={handleImageDialogOpen}
                                style={{ width: '240px', height: '180px' }}
                                alt="event poster"
                                src={process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}></img>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Typography>{event.description} </Typography>
                            <Typography
                                style={{ marginTop: "20px", marginBottom: '20' }}>
                                {timeLabel}
                            </Typography>
                            <Typography
                                variant="h5">
                                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
                            </Typography>
                            <div style={{ marginTop: '10px' }}>
                                <Chip
                                    variant="outlined"
                                    color="inherit"
                                    label={event.event_type}></Chip>
                                <Chip
                                    style={{ marginLeft: '5px' }}
                                    variant="outlined"
                                    color="inherit"
                                    label={event.fee_type}></Chip>
                                <Chip style={{ marginLeft: '5px' }}
                                    variant="outlined"
                                    color="inherit"
                                    label={event.event_mode}></Chip>
                                {event.isTeamed && <Chip
                                    style={{ marginLeft: '5px' }}
                                    variant="outlined"
                                    color="inherit"
                                    label={<Box display="flex">
                                        <Box><GroupIcon></GroupIcon></Box>
                                        <Box
                                            marginTop={0.7}
                                            marginLeft={0.5}>
                                            {"  " + event.team_size.min_team_size + "-" + event.team_size.max_team_size}
                                        </Box>
                                    </Box>}></Chip>}
                                {!event.isTeamed && <Chip
                                    style={{ marginLeft: '5px' }}
                                    variant="outlined"
                                    color="inherit"
                                    label={
                                        <Box display="flex">
                                            <Box><PersonIcon></PersonIcon></Box>
                                            <Box marginTop={0.7}>Individual</Box>
                                        </Box>}></Chip>}
                                {tags != null && tags.map(val => {
                                    return <Chip
                                        key={val}
                                        style={{ marginLeft: '5px' }}
                                        variant="outlined"
                                        color="inherit"
                                        label={val}></Chip>
                                })}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Grid container component="main" className={classes.gridMain}>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <Box className={classes.boxItem}>
                                            <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h4">About</Typography>
                                        </Box>
                                        <Box className={classes.boxItem}>
                                            <Typography color="textSecondary" variant="body1">
                                                {
                                                    event.about
                                                }
                                            </Typography>
                                        </Box>
                                        <Divider flexItem className={classes.divider}></Divider>
                                    </Grid>
                                    {requirements !== null && requirements.length !== 0 && <Grid item xs={12} md={6} className={classes.gridItem}>
                                        <Box className={classes.boxItem}>
                                            {requirements !== null && requirements.length !== 0 && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Requirements</Typography>}
                                        </Box>
                                        <Box className={classes.boxItem}>
                                            {
                                                requirements.length !== 0 && requirements.map(val => {
                                                    return <Chip key={val} variant="outlined" color="inherit" label={val}></Chip>
                                                })
                                            }
                                        </Box>
                                    </Grid>}

                                    {event.event_mode === "Offline" && <Grid item xs={12} md={6} className={classes.gridItem}>
                                        <Box className={classes.boxItem}>
                                            {event.event_mode === "Offline" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Venue Details</Typography>}
                                        </Box>
                                        <Box className={classes.boxItem}>
                                            {event.event_mode === "Offline" && <Typography color="textSecondary" variant="body2">{event.venue}</Typography>}
                                        </Box>
                                        <Box className={classes.boxItem}>
                                            {event.event_mode === "Offline" && <Typography color="textSecondary" variant="body2">{event.venue_college}</Typography>}
                                        </Box>
                                    </Grid>}
                                    {event.fee_type === "Paid" && <Grid item xs={12} md={6} className={classes.gridItem}>
                                        <Box className={classes.boxItem}>
                                            {event.fee_type === "Paid" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Fee Details</Typography>}
                                        </Box>
                                        <Box className={classes.boxItem}>
                                            {event.fee_type === "Paid" && <Typography color="textSecondary" variant="body2">{"Rs " + event.fee}</Typography>}
                                        </Box>
                                    </Grid>}
                                    {event.event_mode === "Online" && event.platform_details !== null && event.platform_details !== "" && <Grid itam xs={12} md={6} className={classes.gridItem}>
                                        <Box className={classes.boxItem}>
                                            {event.event_mode === "Online" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Platform Details</Typography>}
                                        </Box>
                                        <Box className={classes.boxItem}>
                                            {event.event_mode === "Online" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="body2">{event.platform_details}</Typography>}
                                        </Box>
                                    </Grid>}
                                </Grid>


                                {event.rounds !== undefined && event.rounds.length > 0 && <Grid container component="main" className={classes.gridMain}>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="flex-start">
                                            <Box className={classes.boxItem} margin={2}>
                                                {event.rounds !== undefined && event.rounds.length > 0 && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Rounds Details</Typography>}
                                            </Box>
                                            <Box>
                                                <Divider orientation="vertical"></Divider>
                                            </Box>
                                            <Box flexGrow={1}></Box>
                                            <Box className={classes.boxItem} margin={2}>
                                                {event.rounds !== undefined && event.rounds.length > 0 && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">
                                                    {
                                                        event.rounds.map((val, index) => {
                                                            return <Typography>{val.title + " - " + val.description}</Typography>
                                                        })
                                                    }
                                                </Typography>}
                                            </Box>
                                            <Box flexGrow={1}></Box>
                                        </Box>

                                    </Grid>
                                </Grid>}


                                {event.prizes !== undefined && event.prizes !== null && event.prizes.length > 0 && <Grid container component="main" className={classes.gridMain}>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="flex-start">
                                            <Box style={{ marginLeft: "30px" }}>
                                                {event.prizes !== undefined && event.prizes.length > 0 && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Prizes</Typography>}
                                            </Box>

                                        </Box>
                                        {event.prizes !== undefined && event.prizes.length > 0 && <Box display="flex" justifyContent="center" flexWrap="wrap" style={{ marginTop: "20px", marginBottom: '20' }}>
                                            {
                                                event.prizes.map((val, index) => {
                                                    return <Box padding={1} justifyContent="center" style={{ maxWidth: "500px" }}>
                                                        <Box display="flex" justifyContent="center"><EmojiEventsIcon fontSize="large" color="primary"></EmojiEventsIcon></Box>
                                                        <Box display="flex" justifyContent="center"><Typography>{val.title}</Typography></Box>
                                                        <Box display="flex" justifyContent="center"><Typography variant="h5">{val.prize}</Typography></Box>
                                                        <Box display="flex" justifyContent="center"><Typography color="textSecondary">{val.desc}</Typography></Box>
                                                    </Box>
                                                })
                                            }
                                        </Box>}
                                    </Grid>
                                </Grid>}
                                <Grid container component="main" className={classes.gridMain} >


                                    {event.themes !== undefined && event.themes !== null && event.themes !== "" &&
                                        <Grid item xs={12} md={6} className={classes.gridItem}>
                                            <Box style={{ marginLeft: "30px" }}>
                                                <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Themes</Typography>
                                            </Box>
                                            <div style={{marginTop:"5px"}} whiteSpace="normal">
                                            {event.themes.split("\n").map((val, index) => {
                                                if (val === "") {
                                                    return <br></br>
                                                }
                                                return <Box style={{ marginLeft: "45px" }} whiteSpace="normal">
                                                    <Typography color="textSecondary" variant="body2" whiteSpace="normal">
                                                        {val}
                                                    </Typography>
                                                </Box>
                                            })}
                                            </div>
                                        </Grid>}
                                    {event.rules !== undefined && event.rules !== null && event.rules !== "" &&
                                        <Grid item xs={12} md={6} className={classes.gridItem} >
                                            <Box style={{ marginLeft: "30px" }}>
                                                <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Rules</Typography>
                                            </Box>
                                            <div className={rulesHeight && classes.overFlowText} style={{marginTop:"5px"}} whiteSpace="normal">
                                                {event.rules.split("\n").map((val, index) => {
                                                    if (val === "") {
                                                        return <br></br>
                                                    }
                                                    return <Box style={{ marginLeft: "45px" }} whiteSpace="normal">
                                                        <Typography color="textSecondary" variant="body2" whiteSpace="normal">
                                                            {val}
                                                        </Typography>
                                                    </Box>
                                                })}

                                            </div>
                                            <Button onClick={handleRulesViewMoreButton} style={{ marginLeft: "45px" }} color="primary">{rulesHeight ? "View More" : "hide"}</Button>

                                        </Grid>}
                                </Grid>

                                {!notRegistered && <Box className={classes.boxItem}>
                                    <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Organised By</Typography>
                                </Box>}
                                {!notRegistered && <Box className={classes.boxItem}>
                                    <Box className={classes.adminDetails}>
                                        <Box>
                                            <Avatar className={classes.avatar} alt={adminDetails.name} src={adminDetails.profile_pic !== null && process.env.REACT_APP_API_URL + `/api/image?id=${adminDetails.profile_pic}`} />
                                        </Box>
                                        <Box>
                                            <Box>
                                                <Typography variant="h5">{adminDetails.name}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography color="textSecondary" variant="body2">{adminDetails.college_name}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>}
                            </Box>
                        </Grid>
                    </Grid>
                    <ImageDialog
                        event={event}
                        open={imageDialogOpen}
                        handleClose={handleImageDialogClose}>
                    </ImageDialog>
                </div>
            )}
        </div>
    );
}

export default AboutEventPanel;

// This impressive paella is a perfect party dish and a fun meal
//  to cook together with your guests. Add 1 cup of frozen peas along with 
// the mussels, if you like.