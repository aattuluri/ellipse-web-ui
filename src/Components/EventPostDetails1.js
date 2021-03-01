import React from 'react';


//MaterialUI imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
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
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CameraAltIcon from '@material-ui/icons/CameraAlt';



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

  const token = localStorage.getItem('token');
  const classes = useStyles();
  const [startDateError, setStartDateError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);
  const [regEndDateError, setRegEndDateError] = React.useState(false);
  const [eventTypes, setEventTypes] = React.useState([]);


  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/event/get_event_types', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        value.forEach((v) => {
          setEventTypes((eventTypes) => [...eventTypes, v.title]);
        })
      })
    })
  }, [token])

  const handleChange = (event) => {
    if (event.target.files[0]) {
      props.setPoster(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]);
      props.setImageUrl(url)
      const fileName = event.target.files[0].name;
      props.setImageName(fileName);
    }
  }

  const handleEventNameChange = (event) => {
    props.setName(event.target.value)
  }

  const handleDescChange = (event) => {
    props.setDesc(event.target.value);
  }

  const handleStartDateChange = (date) => {
    setStartDateError(false);
    props.setStartDate(date);
  };
  const handleendDateChange = (date) => {
    setEndDateError(false);
    props.setEndDate(date);
  };
  const handleRegEndDateChange = (date) => {
    setRegEndDateError(false);
    props.setRegEndDate(date);
  };

  const handleEventModeChange = (event) => {
    props.setEventMode(event.target.value);
  }
  const handleeventTypsChange = (event, value) => {
    props.setEventType(value);
  }

  const handleNext = (event) => {
    event.preventDefault();
    if (props.startDate === null) {
      setStartDateError(true)
    }
    else if (props.endDate === null) {
      setEndDateError(true);
    }
    else if (props.regEndDate === null) {
      setRegEndDateError(true)
    }
    else {
      props.handleNext();
    }
  }
  const handleFeeTypeChange = (event, value) => {
    props.setFeeType(value)
  }

  const handleRegFees = (event) => {
    props.setFees(event.target.value);
  }

  return (
    <form className={classes.form} onSubmit={handleNext}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <input id="poster-file" type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }}></input>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={<label htmlFor="poster-file">
              <IconButton style={{ backgroundColor: "black" }} color="primary" aria-label="upload picture" component="span">
                <EditIcon></EditIcon>
              </IconButton>
            </label>}>
            <img height="140" width="150" alt="poster" src={props.imageUrl} ></img>

          </Badge>
          <TextField
            autoComplete='off'
            required
            id="eventposter"
            name="eventposter"
            label="Event Poster"
            component="span"
            value={props.imageName || ''}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <label htmlFor="poster-file">
                    <IconButton component="span" >
                      <CameraAltIcon></CameraAltIcon>
                    </IconButton>
                  </label>

                </InputAdornment>
              ),
            }}
          />
        </Grid>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils} required >
            <DateTimePicker
              inputProps={{ required: true }}
              minDate={Date.now()}
              fullWidth
              required
              variant="dialog"
              format="dd MMM yyyy hh:mm a zzz"
              margin="normal"
              id="startDate"
              label="Start Date"
              name="startDate"
              value={props.startDate}
              onChange={handleStartDateChange}
              error={startDateError}
              helperText={startDateError && "Fill this field"}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              minDate={Date.now()}
              fullWidth
              required
              variant="dialog"
              format="dd MMM yyyy hh:mm a zzz"
              margin="normal"
              id="endDate"
              label="End Date"
              name="endDate"
              value={props.endDate}
              onChange={handleendDateChange}
              error={endDateError}
              helperText={endDateError && "Fill this field"}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              minDate={Date.now()}
              fullWidth
              required
              variant="dialog"
              format="dd MMM yyyy hh:mm a zzz"
              margin="normal"
              id="regEndDate"
              label="Registration End Date"
              name="regEndDate"
              value={props.regEndDate}
              onChange={handleRegEndDateChange}
              error={regEndDateError}
              helperText={regEndDateError && "Fill this field"}
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
        {/* <Grid item xs={12}>
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
        </Grid> */}
        <Grid item xs={12}>
          <FormLabel component="legend">Entry Fee</FormLabel>
          <RadioGroup aria-label="address" name="address" value={props.feeType} onChange={handleFeeTypeChange} style={{ display: "inline" }}>
            <FormControlLabel value="Free" control={<Radio color="default" />} label="Free" />
            <FormControlLabel value="Paid" control={<Radio color="default" />} label="Paid" />
          </RadioGroup>
        </Grid>
        {props.feeType === "Paid" && <Grid item xs={12} lg={6}>
          <TextField
            autoComplete='off'
            required
            id="regFees"
            name="regFees"
            label="Registration Fees"
            fullWidth
            value={props.regFees || ""}
            onChange={handleRegFees}
          />
        </Grid>}
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