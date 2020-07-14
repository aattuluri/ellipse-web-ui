import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import EventPostDetails1 from '../Components/EventPostDetails1';
import EventPostDetails2 from '../Components/EventPostDetails2';
import AuthContext from '../AuthContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    backgroundColor:theme.palette.secondary.main,
  },
  stepper: {
    padding: theme.spacing(3, 8, 2),
    backgroundColor:theme.palette.secondary.main,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));



export default function Checkout({history}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // const [loading, setLoading] = React.useState(false);
  // const [state, setState] = React.useState({
  //   open: false,
  //   vertical: 'top',
  //   horizontal: 'center',
  //   message: 'success',
  //   type: 'error'
  // });
  const [eventName,setEventName] = React.useState(null);
  const [shortDesc,setShortDesc] = React.useState(null);
  const [eventMode,setEventMode] = React.useState(null);
  const [about,setAbout] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setendDate] = React.useState(null);
  const [regEndDate, setRegEndDate] = React.useState(null);
  const [eventType, setEventType] = React.useState(null);
  const [feeType,setFeeType] = React.useState("Free");



  const [regLink,setRegLink] = React.useState(null);
  const [fees,setFees] = React.useState(null);
  const [eventThemes, setEventThemes] = React.useState(null);
  const [selectedrequirements, setSelectedRequirements] = React.useState(null);
  const [image, setImage] = React.useState(null);
  // const [imageName, setImageName] = React.useState("");
  // const [addressType,setAddressType] = React.useState("");
  const [collegeName,setCollegeName] = React.useState(null);
  const [building,setBuildingAdress] = React.useState(null);
  // const { vertical, horizontal, open, message, type } = state;

  // const u = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  // const user = JSON.parse(u);
  const user = React.useContext(AuthContext);
  // const handleStartDateChange = (date) => {
  //   setStartDate(date);
  // };
  // const handleendDateChange = (date) => {
  //   setendDate(date);
  // };
  // const handleRegEndDateChange = (date) => {
  //   setRegEndDate(date)
  // };

  const steps = ['About', 'More Details'];
console.log(feeType);
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
      setName={setEventName} 
      setDesc={setShortDesc} 
      setStartDate={setStartDate} 
      setEndDate={setendDate} 
      setRegEndDate={setRegEndDate} 
      setEventMode={setEventMode} 
      setEventType={setEventType} 
      setAbout={setAbout} handleNext={handleNext} setFeeType={setFeeType} />);
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
        requirements={selectedrequirements}
        college={collegeName}
        building={building}
        setThemes={setEventThemes} 
        setPoster={setImage} 
        setRegLink={setRegLink} 
        setFees={setFees}
        setRequirements={setSelectedRequirements}
        // setOrganizer={setOrganizer}
        // setAddressType={setAddressType}
        setCollegeName={setCollegeName} 
        setBuilding={setBuildingAdress}/>
      ) ;
    default:
      throw new Error('Unknown step');
  }
}

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result.split(',')[0],reader.result.split(',')[1])
    };
    // console.log(reader.type);
    // console.log(reader.result.split(',')[1])
    //         console.log(reader.result.split(',')[0])
    //         console.log(reader.result)
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  // const handleClose = async (event, reason) => {
  //   if (message === "Signedup successfully") {
  //     // history.replace("/otpverification")
  //   }
  //   // setState({ ...state, open: false });
  // };

 

  

  async function handleEventPost(event) {
    event.preventDefault();
    // setLoading(true);
    // const { eventName, shortdesc, eventMode,regLink,regFees,organizer,about } = event.target.elements;
    try {
      getBase64(image, (type,image_data) => {
        var data = new FormData();
        const payload = {
          user_id: user._id,
          name: eventName,
          description: shortDesc,
          start_time: startDate,
          finish_time: endDate,
          registrationEndTime: regEndDate,
          eventMode: eventMode,
          eventType: eventType,
          tags: eventThemes,
          // poster: result,
          image_data: image_data,
          type: type,
          regLink: regLink,
          fees: fees,
          about: about,
          // organizer: or,
          feesType:feeType,
          requirements: selectedrequirements,
          college: collegeName
        };
        data = JSON.stringify(payload);
        console.log(data);
        fetch('http://localhost:4000/api/events', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: data
        }).then(result => {
          if (result.status === 200) {
            result.json().then(value => {
              console.log(value);
              history.replace("/home")
            })
          }
          else {
            result.json().then(value => {
              console.log(value);
            })
          }
        })

      })
    }
    catch (error) {
      // setLoading(false);
      // setState({
      //   open: true,
      //   vertical: 'top',
      //   horizontal: 'center',
      //   message: error.message,
      //   type: "error"
      // })
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
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
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}