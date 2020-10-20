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
import Dashboard from '../Components/Images/dashboard.png';
import Profile from '../Components/Images/profile.png';
import AdminDashboard from '../Components/Images/AdminDashboard.png';
import Certificate from '../Components/Images/certificate.png';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'All your College events at single place',
        imgPath: Dashboard,
    },
    {
        label: 'Post your events and manage them easily',
        imgPath: Profile,
    },
    {
        label: 'Feature Rich dashboard for Admins',
        imgPath: AdminDashboard,
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
        minHeight: 200,
        paddingLeft: theme.spacing(0),
        backgroundColor: theme.palette.primary.dark,
    },
    img: {
        padding: theme.spacing(5),
        height: 450,
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
    },
}));

function SwipeableTextMobileStepper() {
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
                    <Paper square elevation={0} className={classes.header}>
                        <Typography variant="h3" color="secondary" align="center">{tutorialSteps[activeStep].label}</Typography>
                    </Paper>
                    <Box style={{margin: '30px'}} display="flex" flexDirection="column" justifyContent="center">
                        <Button variant="contained" color="secondary">Get started</Button>
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