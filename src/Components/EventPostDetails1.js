import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, DateTimePicker, } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(0),
    borderRadius: 30,

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

export default function AddressForm(props) {

  const classes = useStyles();

  // const [startDate, setStartDate] = React.useState(null);
  // const [endDate, setendDate] = React.useState(null);
  // const [regEndDate, setRegEndDate] = React.useState(null);
  // const [eventType, setEventType] = React.useState(null);

  const eventTypes = ["Hackathon", "Coding Contest", "Webinar"];
 



  function handleEventNameChange(event) {
    // console.log(event.target.value);
    props.setName(event.target.value)
  }

  function handleDescChange(event) {
    props.setDesc(event.target.value);
  }

  const handleStartDateChange = (date) => {
    // setStartDate(date);
    props.setStartDate(date);
  };
  const handleendDateChange = (date) => {
    // setendDate(date);
    props.setEndDate(date);
  };
  const handleRegEndDateChange = (date) => {
    // setRegEndDate(date)
    props.setRegEndDate(date);
  };

  function handleEventModeChange(event) {
    props.setEventMode(event.target.value);
  }
  function handleeventTypsChange(event, value) {
    // setEventType(value);
    props.setEventType(value);
  }
  

  function handleNext(event){
    event.preventDefault();
    props.handleNext();
  }
  function handleFeeTypeChange(event,value){
    props.setFeeType(value)
  }
  // const steps = props.steps;
  function handleRegistrationModeChange(event){
    if(event.target.value === "form"){
      props.setSteps((steps) => [...steps,"Registration Form"])
    }
    else if(event.target.value === "link"){
      props.setSteps(['About', 'More Details']);
    }
    props.setRegistrationMode(event.target.value);
  }
  

  return (
    <form className={classes.form} onSubmit={handleNext}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            autoComplete='off'
            required
            id="eventName"
            name="eventName"
            label="Name"
            fullWidth
            value={props.name || ""}
            onChange={handleEventNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete='off'
            required
            id="shortdesc"
            name="shortdesc"
            label="Short Description"
            fullWidth
            value={props.desc || ""}
            onChange={handleDescChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              minDate={Date.now()}
              fullWidth
              required
              variant="inline"
              format="dd MMM yyyy hh:mm a zzz"
              margin="normal"
              id="startDate"
              label="Start Date"
              name="startDate"
              value={props.startDate}
              onChange={handleStartDateChange}
              
            />
          </MuiPickersUtilsProvider>

        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              minDate={Date.now()}
              fullWidth
              required
              variant="inline"
              format="dd MMM yyyy hh:mm a zzz"
              margin="normal"
              id="endDate"
              label="End Date"
              name="endDate"
              value={props.endDate}
              onChange={handleendDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              minDate={Date.now()}
              fullWidth
              required
              variant="inline"
              format="dd MMM yyyy hh:mm a zzz"
              margin="normal"
              id="regEndDate"
              label="Registration End Date"
              name="regEndDate"
              value={props.regEndDate}
              onChange={handleRegEndDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-age-native-simple">Mode</InputLabel>
            <Select
              fullWidth
              native
              label="Mode"
              inputProps={{
                name: 'eventMode',
                id: 'eventMode',
              }}
              value={props.eventMode || ""}
              onChange={handleEventModeChange}
            >
              <option aria-label="None" value="" />
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            id="combo-box-demo"
            options={eventTypes}
            getOptionLabel={(option) => option}
            onChange={handleeventTypsChange}
            value={props.eventType}
            renderInput={(params) => <TextField fullWidth required {...params} label="Type" />}
          />
        </Grid>

        
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel htmlFor="outlined-age-native-simple">Registration</InputLabel>
            <Select
              fullWidth
              native
              label="Registration"
              inputProps={{
                name: 'registrationMode',
                id: 'registaration mode',
              }}
              value={props.registrationMode || ""}
              onChange={handleRegistrationModeChange}
            >
              <option aria-label="None" value="" />
              <option value="form">Our Platform(Ellipse)</option>
              <option value="link">Other</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
              <FormLabel component="legend">Entry Fee</FormLabel>
              <RadioGroup aria-label="address" name="address" defaultValue="Free" onChange={handleFeeTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="Free" control={<Radio color="default" />} label="Free" />
                <FormControlLabel value="Paid" control={<Radio color="default" />} label="Paid" />
              </RadioGroup>
        </Grid>
      </Grid>
      
      <div className={classes.buttons}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >Next
        </Button>
      </div>
    </form>
  );
}