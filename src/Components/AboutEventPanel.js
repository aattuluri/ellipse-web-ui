import React from 'react';
import { Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import  Chip  from '@material-ui/core/Chip';
// import AuthContext from '../AuthContext';



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
    }
}));

function AboutEventPanel(props) {
    const classes = useStyles();
    const { children, value, url, index, ...other } = props;
    // const user = React.useContext(AuthContext);

    // const token = localStorage.getItem('token');
    const event = props.event;
    const tags = event.tags;
    const [timeLabel,setTimeLabel] = React.useState("Registration Ends in")
    const calculateTimeLeft = () => {
        
        var difference = +new Date(event.registrationEndTime) - +new Date();
        let timeLeft = {};
        // console.log(difference);
        if(difference < 0){
            difference = +new Date(event.start_time) - +new Date();
        }
        if(difference < 0){
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

    const getTimeLabel = () =>{
        var difference = +new Date(event.registrationEndTime) - +new Date();
        let label = "Registration ends in"
        // console.log(difference);
        if(difference < 0){
            label = "Starts in"
            difference = +new Date(event.start_time) - +new Date();
        }
        if(difference < 0){
            label = "Ends in"
            difference = +new Date(event.finish_time) - +new Date();
        }
        return label;
    }

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        
        setTimeout(() => {
            setTimeLabel(getTimeLabel());
            setTimeLeft(calculateTimeLeft());
        }, 1000);
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
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <div className={classes.root}>
                <Grid container component="main">
                    <Grid item xs={12} sm={12} md={4} lg={4} >
                        <img style={{ maxWidth: '250px' }} alt="event poster" src={`http://139.59.16.53:4000/api/image?id=${event.posterUrl}`}  ></img>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Typography>{event.description} This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.</Typography>
                        <Typography style={{  marginTop: "20px", marginBottom: '20' }}>{timeLabel}</Typography>
                        <Typography  variant="h5">{timerComponents.length ? timerComponents : <span>Time's up!</span>}</Typography>
                        {/* <Typography>Starts at {event.start_time}</Typography>
                        <Typography>Ends at {event.finish_time}</Typography> */}
                        <div style={{marginTop:'10px'}}>
                        <Chip variant="outlined" color="primary" label={event.eventType}></Chip>

                        <Chip style={{marginLeft:'5px'}} variant="outlined" color="primary" label={event.feesType}></Chip>
                        <Chip style={{marginLeft:'5px'}} variant="outlined" color="primary" label={event.eventMode}></Chip>
                        {tags != null && tags.map(val => {
                            return <Chip key={val} style={{marginLeft:'5px'}} variant="outlined" color="primary" label={val}></Chip>
                        })}
                        </div>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ marginTop: "20px", marginBottom: '20' }} variant="h4">About</Typography>
                        <Typography color="textSecondary" variant="body2">
                            {[...new Array(5)]
                                .map(
                                    () => `Cras mattis consectetur purus sit amet fermentum. 
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                )
                                .join('\n')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid>
                    </Grid>
                </Grid>
                </div>
            )}
        </div>
    );
}

export default AboutEventPanel;