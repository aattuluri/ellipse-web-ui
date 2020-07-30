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
import EventPostDetails3 from '../Components/EventPostDetails3';
import AuthContext from '../AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


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
  }
}));



export default function Checkout({ history }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const token = localStorage.getItem('token');
  // const user = JSON.parse(u);
  const user = React.useContext(AuthContext);
  // const [loading, setLoading] = React.useState(false);
  // const [state, setState] = React.useState({
  //   open: false,
  //   vertical: 'top',
  //   horizontal: 'center',
  //   message: 'success',
  //   type: 'error'
  // });
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
  const [eventThemes, setEventThemes] = React.useState(null);
  const [selectedrequirements, setSelectedRequirements] = React.useState(null);
  const [image, setImage] = React.useState(null);
  // const [imageType, setImageType] = React.useState(null);
  // const [imageName, setImageName] = React.useState("");
  const [addressType, setAddressType] = React.useState("college");
  const [collegeName, setCollegeName] = React.useState(user.collegeName);
  const [building, setBuildingAdress] = React.useState(null);
  const [organizer, setOrganizer] = React.useState(user.name + "," + user.collegeName);
  const [venueCollege,setVenueCollege] = React.useState(null);
  const [participantsType,setParticipantsType] = React.useState("open");
  // const { vertical, horizontal, open, message, type } = state;

  const [fields,setFields] = React.useState([]);

  function setRegFields(f){
    console.log(f);
    setFields(f);
  }

  function handlePostwithoutregFileds(e){
    e.preventDefault();
    handleEventPost(null);
  }

  const [steps, setSteps] = React.useState(['About', 'More Details'])
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
            venueCollege ={venueCollege}
            participantsType={participantsType}
            setThemes={setEventThemes}
            setPoster={setImage}
            setRegLink={setRegLink}
            setFees={setFees}
            setRequirements={setSelectedRequirements}
            // setPosterType={setImageType}
            setOrganizer={setOrganizer}
            setAddressType={setAddressType}
            setCollegeName={setCollegeName}
            setBuilding={setBuildingAdress}
            setVenueCollege={setVenueCollege}
            setAbout={setAbout}
            setParticipantsType={setParticipantsType}
            handleNext={registrationMode === "ellipse" ? handleNext : handlePostwithoutregFileds} />
        );
      case 2:
        return (
          <EventPostDetails3
            handleBack={handleBack} 
            fields={fields} 
            setFields={setRegFields} handlePost={handleEventPost}>

          </EventPostDetails3>);
      default:
        throw new Error('Unknown step');
    }
  }


  // console.log(fields);
  // function getBase64(file, cb) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     cb(reader.result.split(',')[0], reader.result.split(',')[1])
  //   };
  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  // }
  // console.log(steps);
  // const handleClose = async (event, reason) => {
  //   if (message === "Signedup successfully") {
  //     // history.replace("/otpverification")
  //   }
  //   // setState({ ...state, open: false });
  // };



console.log(fields);

  const handleEventPost =  (allFields)=> {
    console.log(allFields);
    // event.preventDefault();
    // setLoading(true);
    // const { eventName, shortdesc, eventMode,regLink,regFees,organizer,about } = event.target.elements;
    try {
      var data = new FormData();
      const payload = {
        user_id: user.userid,
        name: eventName,
        description: shortDesc,
        start_time: startDate,
        finish_time: endDate,
        registrationEndTime: regEndDate,
        eventMode: eventMode,
        eventType: eventType,
        tags: eventThemes,
        regLink: regLink,
        fees: fees,
        about: about,
        organizer: organizer,
        feesType: feeType,
        requirements: selectedrequirements,
        college: collegeName,
        addressType: addressType,
        building: building,
        regFields: allFields,
        regMode: registrationMode,
        participantsType: participantsType
      };
      console.log(payload);
      data = JSON.stringify(payload);
      // data.append("image",image);
      console.log(data);
      fetch('http://139.59.16.53:4000/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: data,
      }).then(result => {
        console.log(result);
        if (result.status === 200) {
          result.json().then(value => {
            console.log(value);
            var data2 = new FormData();
            console.log(value);
            data2.append("image", image);
            // data2.append('eventId', value.eventId);
            fetch(`http://139.59.16.53:4000/api/event/uploadimage?id=${value.eventId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              method: 'POST',
              body: data2,
            }).then(response => {
              if (response.status === 200) {
                response.json().then(val => {
                  history.replace("/home")
                })
              }
            })

          })
        }
        else {
          result.json().then(value => {
            console.log(value);
          })
        }
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

  function handleCloseButton(){
    history.goBack();
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseButton}>
          <CloseIcon fontSize="large" />
      </IconButton>
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