import React from 'react';

//Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

//Components imports
import EventPostDetails1 from '../Components/EventPostDetails1';
import EventPostDetails2 from '../Components/EventPostDetails2';
import EventPostDetails3 from '../Components/EventPostDetails3';
import SuccessPanel from '../Components/SuccessPanel';
import AuthContext from '../AuthContext';

//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//function for copy right
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ellipseapp.com/">
        ellipseapp.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3),
    },
    backgroundColor: theme.palette.secondary.main,
  },
  stepper: {
    padding: theme.spacing(3, 8, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(12),
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  hidden: {
    display: 'none'
  }
}));



export default function Checkout({ history }) {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const { currentUser } = React.useContext(AuthContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState(['About','Event Details', 'More Details']);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error',
    autoHide: 300
  });
  const [loading, setLoading] = React.useState(false);
  const { vertical, horizontal, open, message, type, autoHide } = state;

  const [eventName, setEventName] = React.useState(null);
  const [shortDesc, setShortDesc] = React.useState(null);
  const [eventMode, setEventMode] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setendDate] = React.useState(null);
  const [regEndDate, setRegEndDate] = React.useState(null);
  const [eventType, setEventType] = React.useState(null);
  const [feeType, setFeeType] = React.useState("Free");
  const [registrationMode, setRegistrationMode] = React.useState(null);



  const [regLink, setRegLink] = React.useState(null);
  const [fees, setFees] = React.useState(null);
  const [eventThemes, setEventThemes] = React.useState([]);
  const [selectedrequirements, setSelectedRequirements] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [addressType, setAddressType] = React.useState(null);
  const [collegeName, setCollegeName] = React.useState(currentUser.college_name);
  const [collegeId, setCollegeId] = React.useState(currentUser.college_id)
  const [building, setBuildingAdress] = React.useState(null);
  const [organizer, setOrganizer] = React.useState(currentUser.name + "," + currentUser.college_name);
  const [venueCollege, setVenueCollege] = React.useState(null);
  const [participantsType, setParticipantsType] = React.useState("open");
  const [fields, setFields] = React.useState([]);
  const [platformDetails, setPlatformDetails] = React.useState('');
  const [imageName, setImageName] = React.useState(null);
  const [isTeam, setIsTeam] = React.useState(false);
  const [minTeamSize, setMinTeamSize] = React.useState(1);
  const [maxTeamSize, setMaxTeamSize] = React.useState(1);
  const [rounds, setRounds] = React.useState([]);
  const [rules, setRules] = React.useState(null);
  const [prizes, setPrizes] = React.useState([]);
  const [themes, setThemes] = React.useState(null);
  const [showSuccessPanel, setShowSuccessPanel] = React.useState(false);






  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <EventPostDetails1
            name={eventName}
            desc={shortDesc}
            startDate={startDate}
            endDate={endDate}
            regEndDate={regEndDate}
            eventMode={eventMode}
            eventType={eventType}
            about={about}
            feeType={feeType}
            registrationMode={registrationMode}
            setName={setEventName}
            setDesc={setShortDesc}
            setStartDate={setStartDate}
            setEndDate={setendDate}
            setRegEndDate={setRegEndDate}
            setEventMode={setEventMode}
            setEventType={setEventType}
            setRegistrationMode={setRegistrationMode}
            setAbout={setAbout}
            handleNext={handleNext}
            setFeeType={setFeeType}
            steps={steps}
            setSteps={setSteps} />);
      case 1:
        return (
          <EventPostDetails2
            handleBack={handleBack}
            handleEventPost={handleEventPost}
            eventMode={eventMode}
            feeType={feeType}
            eventThemes={eventThemes}
            eventPoster={image}
            regLink={regLink}
            regFees={fees}
            about={about}
            requirements={selectedrequirements}
            college={collegeName}
            building={building}
            organizer={organizer}
            registrationMode={registrationMode}
            venueCollege={venueCollege}
            participantsType={participantsType}
            platformDetails={platformDetails}
            poster={image}
            isTeam={isTeam}
            minTeamSize={minTeamSize}
            maxTeamSize={maxTeamSize}
            setIsTeam={setIsTeam}
            setMinTeamSize={setMinTeamSize}
            setMaxTeamSize={setMaxTeamSize}
            imageName={imageName}
            setImageName={setImageName}
            setPlatformDetails={setPlatformDetails}
            setThemes={setEventThemes}
            setPoster={setImage}
            setRegLink={setRegLink}
            setFees={setFees}
            setRequirements={setSelectedRequirements}
            setOrganizer={setOrganizer}
            setAddressType={setAddressType}
            setCollegeName={setCollegeName}
            setCollegeId={setCollegeId}
            setBuilding={setBuildingAdress}
            setVenueCollege={setVenueCollege}
            setAbout={setAbout}
            setParticipantsType={setParticipantsType}
            handleNext={handleNext} />
        );
      case 2:
        return (
          <EventPostDetails3
            handleBack={handleBack}
            fields={fields}
            setFields={setRegFields}
            rounds={rounds}
            setRounds={setRounds}
            rules={rules}
            setRules={setRules}
            prizes={prizes}
            setPrizes={setPrizes}
            themes={themes}
            setThemes={setThemes}
            regMode={registrationMode}
            handlePost={handleEventPost}>
          </EventPostDetails3>);
      default:
        throw new Error('Unknown step');
    }
  }

  const handleEventPost = (allFields) => {
    var oAllowed = false;
    if (participantsType === "open") {
      oAllowed = true
    }
    // console.log(themes)
    setLoading(true);
    try {
      var data = new FormData();
      const payload = {
        user_id: currentUser.user_id,
        name: eventName,
        description: shortDesc,
        start_time: startDate,
        finish_time: endDate,
        registration_end_time: regEndDate,
        event_mode: eventMode,
        event_type: eventType,
        tags: eventThemes,
        reg_link: regLink,
        fee: fees,
        about: about,
        // organizer: organizer,
        fee_type: feeType,
        requirements: selectedrequirements,
        college_name: collegeName,
        college_id: collegeId,
        venue_type: addressType,
        venue: building,
        reg_fields: allFields,
        reg_mode: registrationMode,
        o_allowed: oAllowed,
        platform_details: platformDetails,
        isTeamed: isTeam,
        team_size: { min_team_size: minTeamSize, max_team_size: maxTeamSize },
        rounds: rounds,
        rules: rules,
        prizes: prizes,
        themes: themes
      };
      data = JSON.stringify(payload);
      fetch(process.env.REACT_APP_API_URL + '/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data,
      }).then(result => {
        if (result.status === 200) {
          result.json().then(value => {
            var data2 = new FormData();
            data2.append("image", image);
            fetch(process.env.REACT_APP_API_URL + `/api/event/uploadimage?id=${value.eventId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              method: 'POST',
              body: data2,
            }).then(response => {
              if (response.status === 200) {
                response.json().then(val => {
                  setLoading(false);
                  setShowSuccessPanel(true)
                  setState({
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    message: "Event added successfully.Manage your posted events from your profile page",
                    type: "success",
                    autoHide: "4000"
                  })
                })
              }
              else {
                setLoading(false);
                setShowSuccessPanel(true);
                setState({
                  open: true,
                  vertical: 'top',
                  horizontal: 'center',
                  message: "Poster upload is not successfull try again in edit event in your events",
                  type: "error",
                  autoHide: '3000',
                })
              }
            })

          })
        }
        else {
          result.json().then(value => {
            setLoading(false);
            // console.log(value);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: "Something went wrong try again",
              type: "errors",
              autoHide: "4000"
            })
          })
        }
      })


    }
    catch (error) {
      setLoading(false);
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error.message,
        type: "error",
        autoHide: '5000',
      })
    }
  }
  // setLoading(false);
  function setRegFields(f) {
    setFields(f);
  }

  function handlePostwithoutregFileds() {
    handleEventPost(null);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    // setIsTeam(false)
  };

  function handleCloseButton() {
    history.goBack();
  }

  const handleClose = async (event, reason) => {
    if (message === "Event added successfully.Manage your posted events from your profile page") {
      history.replace("/home");
    }
    setState({ ...state, open: false });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHide}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
      {<Backdrop open={loading} className={classes.backdrop}><CircularProgress></CircularProgress></Backdrop>}
      <main className={classes.layout}>

        <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseButton}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Paper className={classes.paper}>
          <SuccessPanel type="eventSuccess" showSuccessPanel={showSuccessPanel}></SuccessPanel>
          <div className={showSuccessPanel && classes.hidden}>
            <Typography component="h1" variant="h4" align="center">
              Post your Event
          </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you.
                </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                  </React.Fragment>
                )}
            </React.Fragment>
          </div>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
