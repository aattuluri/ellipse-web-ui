import React from 'react';
import { cleanup } from '@testing-library/react';

//Materail imports
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
// import AuthContext from '../AuthContext';
import ImageDialog from '../Components/ImageDialog';



const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        alignContent: "center"

    },
    media: {

    },

    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(1)
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
    adminDetails: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: theme.spacing(2)
    },
    root0: {
        display: "flex",
        justifyContent: "center",
    }
}));

function AboutEventPanel(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    const { children, value, url, index, ...other } = props;
    const event = props.event;
    const tags = event.tags;
    // const requirements = event.requirements;
    const [requirements, setRequirements] = React.useState([])
    const [timeLabel, setTimeLabel] = React.useState("Registration Ends in");
    const [adminDetails, setAdminDetails] = React.useState({});
    const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
    const [notRegistered,setNotRegistered] = React.useState(false);
    React.useEffect(()=>{
        if(props.notRegistered){
            setNotRegistered(true)
        }
        else {
            setNotRegistered(false)
        }
    },[props])

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
                response.json().then(value => {
                    setAdminDetails(value);
                })
            })
        }
    }, [event, token])
    // console.log(event)
    // console.log(requirements);

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

    function handleImageDialogClose() {
        setImageDialogOpen(false);
    }
    function handleImageDialogOpen(event) {
        // console.log(image);
        // setSelectedEvent(event);
        setImageDialogOpen(true);
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
                            <img onClick={handleImageDialogOpen} style={{ width: '200px',height: '180px' }} alt="event poster" src={event.poster_url !== 'undefined' && process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`}  ></img>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Typography>{event.description} </Typography>
                            <Typography style={{ marginTop: "20px", marginBottom: '20' }}>{timeLabel}</Typography>
                            <Typography variant="h5">{timerComponents.length ? timerComponents : <span>Time's up!</span>}</Typography>
                            {/* <Typography>Starts at {event.start_time}</Typography>
                        <Typography>Ends at {event.finish_time}</Typography> */}
                            <div style={{ marginTop: '10px' }}>
                                <Chip variant="outlined" color="inherit" label={event.event_type}></Chip>

                                <Chip style={{ marginLeft: '5px' }} variant="outlined" color="inherit" label={event.fee_type}></Chip>
                                <Chip style={{ marginLeft: '5px' }} variant="outlined" color="inherit" label={event.event_mode}></Chip>
                                {tags != null && tags.map(val => {
                                    return <Chip key={val} style={{ marginLeft: '5px' }} variant="outlined" color="inherit" label={val}></Chip>
                                })}
                            </div>

                        </Grid>
                        <Grid item xs={12}>

                            <Box>
                                <Box className={classes.root0}>
                                    <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h4">About</Typography>
                                </Box>
                                <Box className={classes.root0}>
                                    <Typography color="textSecondary" variant="body2">
                                        {
                                            event.about
                                        }
                                    </Typography>
                                </Box>
                                <Box className={classes.root0}>
                                    {requirements !== null && requirements.length !== 0 && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Requirements</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {
                                        requirements.length !== 0 && requirements.map(val => {
                                            return <Chip key={val} variant="outlined" color="inherit" label={val}></Chip>
                                        })
                                    }
                                </Box>
                                <Box className={classes.root0}>
                                    {event.event_mode === "Offline" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Venue Details</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {event.event_mode === "Offline" && <Typography color="textSecondary" variant="body2">{event.venue}</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {event.event_mode === "Offline" && <Typography color="textSecondary" variant="body2">{event.venue_college}</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {event.fee_type === "Paid" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Fee Details</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {event.fee_type === "Paid" && <Typography color="textSecondary" variant="body2">{"Rs " + event.fee}</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {event.event_mode === "Online" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Platform Details</Typography>}
                                </Box>
                                <Box className={classes.root0}>
                                    {event.event_mode === "Online" && <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="body2">{event.platform_details}</Typography>}
                                </Box>
                                {!notRegistered && <Box className={classes.root0}>
                                    <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h5">Organised By</Typography>
                                </Box>}
                                {!notRegistered && <Box className={classes.root0}>
                                    <Box className={classes.adminDetails}>
                                        <Box>
                                            <Avatar className={classes.avatar} alt={adminDetails.name} src={adminDetails.profile_pic !== 'undefined' && process.env.REACT_APP_API_URL + `/api/image?id=${adminDetails.profile_pic}`} />
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
                        <Grid item xs={12}>
                        </Grid>
                        <Grid>
                        </Grid>
                    </Grid>
                    <ImageDialog
                        // image={selectedImage}
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