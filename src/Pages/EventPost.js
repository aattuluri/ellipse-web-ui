import React, { useEffect } from 'react';
// import Copyright from '../Components/copyright';
import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { MuiPickersUtilsProvider, DateTimePicker, } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Typography } from '@material-ui/core';

//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EventPost = ({ history }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error'
  });
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setendDate] = React.useState(null);
  const [regEndDate, setRegEndDate] = React.useState(null);
  const [eventType, setEventType] = React.useState(null);
  const [eventThemes, setEventThemes] = React.useState(null);
  const [selectedrequirements, setSelectedRequirements] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageName, setImageName] = React.useState("");
  const [addressType,setAddressType] = React.useState("");
  const { vertical, horizontal, open, message, type } = state;

  const u = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const user = JSON.parse(u);

  const eventTypes = ["Hackathon", "Coding Contest", "Webinar"];
  const requirements = ["Laptop", "Basic HTML", "C++", "Machine Learning"];
  const colleges = ["VIT University","GITAM University","SRM University"];

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleendDateChange = (date) => {
    setendDate(date);
  };
  const handleRegEndDateChange = (date) => {
    setRegEndDate(date)
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleClose = async (event, reason) => {
    if (message === "Signedup successfully") {
      // history.replace("/otpverification")
    }
    setState({ ...state, open: false });
  };

  async function handleEventPost(event) {
    event.preventDefault();
    // setLoading(true);
    const { eventName, shortdesc, eventMode,regLink,regFees,organizer,about } = event.target.elements;
    try {
      getBase64(image, (result) => {
        var data = new FormData();
        const payload = {
          user_id: user._id,
          name: eventName.value,
          description: shortdesc.value,
          start_time: startDate,
          finish_time: endDate,
          registrationEndTime: regEndDate,
          eventMode: eventMode.value,
          eventType: eventType,
          tags: eventThemes,
          // poster: result,
          regLink: regLink.value,
          fees: regFees.value,
          about: about.value,
          organizer: organizer.value,
          requirements: selectedrequirements,
        };
        data = JSON.stringify(payload);
        console.log(data);
        fetch('https://ellipseserver1.herokuapp.com/api/events', {
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
      setLoading(false);
      setState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
        message: error.message,
        type: "error"
      })
    }
  }

  function handleeventTypsChange(event, value) {
    setEventType(value);
  }

  function handleeventTagsChange(event, values) {
    setEventThemes(values);
  }
  function handleRequirementsChange(event,values){
    setSelectedRequirements(values);
  }

  function handleChange(event) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      const fileName = event.target.files[0].name;
      setImageName(fileName);
    }

  }

  function handleAddressTypeChange(evemt,value){
    setAddressType(value);
  }


  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
      <div className={classes.paper}>
      <Typography variant='h4' >Post your event with ease</Typography>
        <form className={classes.form} onSubmit={handleEventPost}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                required
                id="eventName"
                name="eventName"
                label="Event name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                required
                id="shortdesc"
                name="shortdesc"
                label="Short Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  minDate={Date.now()}
                  fullWidth
                  required
                  variant="inline"
                  format="dd MMM yyyy hh:mm a zzz"
                  margin="normal"
                  id="startDate"
                  label="Event Start Date"
                  name="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  minDate={Date.now()}
                  fullWidth
                  required
                  variant="inline"
                  format="dd MMM yyyy hh:mm a zzz"
                  margin="normal"
                  id="endDate"
                  label="Event End Date"
                  name="endDate"
                  value={endDate}
                  onChange={handleendDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
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
                  value={regEndDate}
                  onChange={handleRegEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="outlined-age-native-simple">Event Mode</InputLabel>
                <Select
                  fullWidth
                  native
                  label="Event Mode"
                  inputProps={{
                    name: 'eventMode',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
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
                renderInput={(params) => <TextField fullWidth required {...params} label="Event Type" />}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={eventTypes.map((option) => option)}
                defaultValue={[eventTypes[1]]}
                freeSolo
                onChange={handleeventTagsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Event Themes" placeholder="Event Themes" />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <input
                id="contained-button-file"
                required
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}>

              </input>

              <TextField
                autoComplete='off'
                required
                id="eventposter"
                name="eventposter"
                label="Event Poster"
                component="span"
                value={imageName}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <label htmlFor="contained-button-file">
                        <IconButton component="span" >
                          <CameraAltIcon></CameraAltIcon>
                        </IconButton>
                      </label>

                    </InputAdornment>
                  ),
                }}
              />

            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                required
                id="regLink"
                name="regLink"
                label="Registration Link"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                required
                id="regFees"
                name="regFees"
                label="Registration Fees"
                fullWidth
                helperText={"Enter 0 if your event is free"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline={true}
                rows="5"
                variant='outlined'
                placeholder="Enter everything about your event in detail"
                autoComplete='off'
                required
                id="about"
                name="about"
                label="About"
                fullWidth

              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                required
                id="organizer"
                name="organizer"
                label="Organizer"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={requirements.map((option) => option)}
                defaultValue={[requirements[1]]}
                freeSolo
                onChange={handleRequirementsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Requirements" placeholder="Requirements" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Address</FormLabel>
              <RadioGroup aria-label="address" name="address" defaultValue="College/University" onChange={handleAddressTypeChange} style={{display: "inline"}}>
                <FormControlLabel value="College/University" control={<Radio color="default" />} label="College/University" />
                <FormControlLabel value="Other" control={<Radio color="default" />} label="Others" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                // required
                id="building"
                name="building"
                label="Room No & Building"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                options={colleges}
                getOptionLabel={(option) => option}
                onChange={handleeventTypsChange}
                renderInput={(params) => <TextField fullWidth required {...params} label="Venue College" />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" name="terms" />}
                label="I accept the terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {loading ? <CircularProgress color="primary" size={24} /> : "Post"}
          </Button>
        </form>
      </div>

      {/* </Grid> */}
      {/* <Box mt={2}>
        <Copyright />
      </Box> */}
    </Container>
  );
}

export default withRouter(EventPost);



