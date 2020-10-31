import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NewHomePageCarousel from '../Pages/NewHomePageCarousel';
import Box from '@material-ui/core/Box';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';
import Copyright from "../Components/copyright";
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import DeviceDesign from '../Components/Images/un.svg';
import HomePageEventCard from '../Components/HomePageEventCard';
import GoogleBadge from '../Components/Images/google-play-badge.png'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    body: {
        margin: theme.spacing(0)
    },
    appbar: {
        backgroundColor: theme.palette.secondary.main
    },
    img: {
        padding: theme.spacing(10),
        minHeight: 200,
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },
    footer: {
        backgroundColor: theme.palette.secondary.main,
        marginTop: theme.spacing(3)
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 200,
        // paddingLeft: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main,
        margin: theme.spacing(10),
        borderRadius: theme.spacing(2),
        boxShadow: "3",
        // height: 450,
        // padding: theme.spacing(10),
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: theme.spacing(3)
    },
    title: {
        fontFamily: 'Gugi',
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        flexGrow: 1,
    },
}));

export default function UnregisteredPage(props) {
    // const token = localStorage.getItem('token');
    const classes = useStyles();
    const [activeEvents, setActiveEvents] = React.useState([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/api/get_events', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            // console.log(response)
            if (response.status === 200) {
                response.json().then(value => {
                    // console.log(value);
                    value.sort((a, b) => {
                        return new Date(a.start_time) - new Date(b.start_time);
                    })
                    setActiveEvents(value.filter(e => {
                        const cDate = new Date();
                        const eDate = new Date(e.finish_time);
                        return cDate < eDate && e.status !== "pending"
                    }))
                })
            }

        })
    }, [])


    function handleSigninClick() {
        props.history.push("/signin")
    }
    function handleSignupClick() {
        props.history.push('/signup');
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h5">
                        Ellipse
                    </Typography>
                    <Button className={classes.button} variant="contained" size="large" color="primary" onClick={handleSigninClick}>Login</Button>
                    <Button className={classes.button} variant="outlined" size="large" color="primary" onClick={handleSignupClick}>Signup</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.body}>
                <NewHomePageCarousel handleSignin={handleSigninClick}></NewHomePageCarousel>
            </div>
            <Grid style={{ minHeight: '100px' }} container component="main">
                <Grid item xs={false} md={3} lg={2} style={{ padding: "10px" }} ></Grid>
                <Grid item xs={12} sm={12} md={9} lg={8}>
                    {
                        activeEvents.map((e, index) => {
                            return <HomePageEventCard onClick={handleSigninClick} event={e}></HomePageEventCard>
                        })
                    }
                </Grid>

            </Grid>
            <Box className={classes.footer} height="200px" display="flex" flexDirection="column" justifyContent="center">
                {/* <Box display="flex" justifyContent="center">
                    <Typography>Made with <FavoriteIcon fontSize="inherit" color="primary"></FavoriteIcon> for Students and Organizations</Typography><br></br>
                </Box> */}
                <Box display="flex" justifyContent="center">
                    <Typography>Contact us at <Link href="mailto:support@ellipseapp.com" variant="body2">
                        {"support@ellipseapp.com"}
                    </Link></Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Copyright></Copyright>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Link href="/Privacy_Policy.pdf" variant="body2">
                        {"Privacy Policy"}
                    </Link>
                </Box>
                <Box display="flex" justifyContent="center">
                    <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.ellipse.ellipseapp" target="_blank">
                        <img className={classes.hidden} src={GoogleBadge} alt="playstore"></img><br></br>
                    </a>
                </Box>
            </Box>

        </div>
    );
}