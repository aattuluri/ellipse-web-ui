import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import Dashboard from '../Components/Images/dashboard.png';
// import Profile from '../Components/Images/profile.png';
// import AdminDashboard from '../Components/Images/AdminDashboard.png';
import Certificate from '../Components/Images/certificate.png';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DeviceDesign from '../Components/Images/un.svg';
import GoogleBadge from '../Components/Images/google-play-badge.png'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'All your College events at single Application',
        imgPath: DeviceDesign,
    },
    {
        label: 'Post your events and manage them easily',
        imgPath: DeviceDesign,
    },
    {
        label: 'Feature Rich dashboard for Admins',
        imgPath: DeviceDesign,
    },
    {
        label: 'Generate and send certificates easily to participants',
        imgPath: Certificate,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
        padding: theme.spacing(0),
        margin: theme.spacing(0),
        backgroundColor: theme.palette.primary.dark,
        borderRadius: theme.spacing(0),
        // alignContent: 'center'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 300,
        [theme.breakpoints.down('md')]: {
            minHeight: 200,
        },
        paddingLeft: theme.spacing(0),
        backgroundColor: theme.palette.primary.dark,
    },
    img: {
        padding: theme.spacing(0),
        maxHeight: 550,
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0),
        },
    },
    paperLeft: {
        margin: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            //   margin: theme.spacing(3, 1),
        },

    },
}));

function SwipeableTextMobileStepper(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <Grid container component="main" justify="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {tutorialSteps.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} className={classes.header}>
                        <Typography variant="h3" color="secondary" align="center">{tutorialSteps[activeStep].label}</Typography>
                    </Paper>
                    <Box className={classes.paperLeft} >
                        <Button onClick={props.handleSignin} variant="contained" color="secondary">Get started</Button>
                        <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.guna0027.ellipse" target="_blank">
                            <img className={classes.hidden} src={GoogleBadge} alt="playstore"></img><br></br>
                        </a>
                    </Box>

                </Grid>
            </Grid>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );
}

export default SwipeableTextMobileStepper;