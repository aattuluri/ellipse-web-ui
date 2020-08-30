import React from 'react';
// import Copyright from '../Components/copyright';
// import useStyles from '../Themes/SignupPageStyles';
import { withRouter } from 'react-router';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
// import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { MuiPickersUtilsProvider, DateTimePicker, } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Icon from '@material-ui/core/Icon';
// import { set } from 'date-fns';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
//function for alert
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: theme.palette.secondary.main,
    // padding: theme.spacing(3),
    borderRadius: 30,

  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EventEdit = (props) => {
  var event = props.event;
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error'
  });

  const [name, setName] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setendDate] = React.useState(null);
  const [regEndDate, setRegEndDate] = React.useState(null);
  const [eventMode, setEventMode] = React.useState(null);
  const [eventType, setEventType] = React.useState(null);
  const [eventThemes, setEventThemes] = React.useState([]);
  const [regLink, setRegLink] = React.useState(null);
  const [regFees, setRegFees] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [selectedrequirements, setSelectedRequirements] = React.useState([]);
  // const [image, setImage] = React.useState(null);
  // const [imageName, setImageName] = React.useState("");
  // const [addressType,setAddressType] = React.useState("");
  const [feeType, setFeeType] = React.useState("Free");
  const [collegeName, setCollegeName] = React.useState(null);
  const [regMode, setRegMode] = React.useState(null);
  const [organizer, setOrganizer] = React.useState(null);
  const [participantType, setParticipantsType] = React.useState("open");
  const [image, setImage] = React.useState(null);
  const [imageUrl,setImageurl] = React.useState(null);
  const [imageUpdated,setImageUpdated] = React.useState(false);
  const { vertical, horizontal, open, message, type } = state;



  const token = localStorage.getItem('token');


  const eventTypes = ["Hackathon", "Coding Contest", "Webinar"];
  const requirements = ["Laptop", "Basic HTML", "C++", "Machine Learning"];
  const colleges = ["VIT University", "GITAM University", "SRM University"];

  const handleStartDateChange = (date) => {
    console.log(date)
    setStartDate(date);
  };
  const handleendDateChange = (date) => {
    setendDate(date);
  };
  const handleRegEndDateChange = (date) => {
    setRegEndDate(date)
  };
  console.log(regEndDate);
  React.useEffect(() => {
    console.log(event);
    setEventThemes(event.tags);
    setEventType(event.event_type);
    setName(event.name);
    setDesc(event.description);
    setStartDate(event.start_time);
    setendDate(event.finish_time);
    setRegEndDate(event.registration_end_time);
    setEventMode(event.event_mode);
    setRegLink(event.reg_link);
    setAbout(event.about);
    setRegFees(event.fees);
    setSelectedRequirements(event.requirements);
    setFeeType(event.fee_type);
    setCollegeName(event.college_name);
    setRegMode(event.reg_mode);
    setOrganizer(event.organizer);
    // setParticipantsType(event.o_allowed)
    if (event.o_allowed === true) {
      setParticipantsType("open")
    }
    else {
      setParticipantsType("onlycollege")
    }

  }, [token, event])


  const handleClose = async (event, reason) => {
    if (message === "Saved changes successfully") {
      // history.replace()
      // history.replace("/otpverification")
    }
    setState({ ...state, open: false });
  };

  async function handleEventPost(e) {
    e.preventDefault();
    setLoading(true);
    var oAllowed = false;
    if (participantType === "open") {
      oAllowed = true
    }
    // console
    try {
      console.log("started");
      // getBase64(image, (result) => {
      var data = new FormData();
      const payload = {
        eventId: event._id,
        name: name,
        description: desc,
        start_time: startDate,
        finish_time: endDate,
        registration_end_time: regEndDate,
        event_mode: eventMode,
        event_type: eventType,
        tags: eventThemes,
        // poster: result,
        reg_link: regLink,
        fee: regFees,
        about: about,
        fee_type: feeType,
        college: collegeName,
        organizer: organizer,
        requirements: selectedrequirements,
        o_allowed: oAllowed,
        reg_mode: regMode
      };
      data = JSON.stringify(payload);
      console.log(data);
      fetch(process.env.REACT_APP_API_URL+'/api/updateevent', {
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
            event = value.event;
            if (imageUpdated) {
              var data2 = new FormData()
              data2.append("image", image);
              fetch(process.env.REACT_APP_API_URL+`/api/event/uploadimage?id=${event._id}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
                  method: 'POST',
                  body: data2
              }).then(res => {
                  if (res.status === 200) {
                      setLoading(false);
                      setState({
                          open: true,
                          vertical: 'top',
                          horizontal: 'center',
                          message: "successful",
                          type: "success",
                          autoHide: 300
                      })
                  }
              })
          }
          else{
            setLoading(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: "Saved changes successfully",
              type: "success"
            })
          }
            // history.replace("/home")
            
          })
        }
        else {
          result.json().then(value => {
            console.log(value);
            setLoading(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: value,
              type: "error"
            })
          })
        }
      })

      // })
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
  function handleRequirementsChange(event, values) {
    setSelectedRequirements(values);
  }

  // function handleChange(event) {
  //   if (event.target.files[0]) {
  //     setImage(event.target.files[0]);
  //     const fileName = event.target.files[0].name;
  //     setImageName(fileName);
  //   }

  // }

  function handleAddressTypeChange(evemt, value) {
    // setAddressType(value);
  }
  function handleName(event) {
    setName(event.target.value)
  }
  function handleDesc(event) {
    setDesc(event.target.value);
  }
  function handleFeeTypeChange(event, value) {
    // props.setFeeType(value)
    setFeeType(value);
  }

  function handleCollegeChange(event, value) {
    // props.setCollegeName(value);
    setCollegeName(value);
  }
  function handleEventMode(event) {
    setEventMode(event.target.value);
  }

  function handleRegLink(event) {
    setRegLink(event.target.value);
  }
  function handleFees(event) {
    setRegFees(event.target.value);
  }
  function handleParticipantsTypeChange(event, value) {
    setParticipantsType(value)
  }


  function handleChange(event) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    //   setImageAsFile(imageFile => (image))
      const url = URL.createObjectURL(event.target.files[0]);
    //   const fileType = event.target.files[0].type;
      setImageurl(url)
      setImageUpdated(true);
    //   setImageType(fileType.substr(fileType.indexOf('/') + 1));
    }

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
        <form className={classes.form} novalidate onSubmit={handleEventPost}>
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <input id="contained-button-file" type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }}></input>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<label htmlFor="contained-button-file">
                  <IconButton style={{ backgroundColor: "black" }} color="primary" aria-label="upload picture" component="span">
                    <EditIcon></EditIcon>
                  </IconButton>
                </label>}>
                <img height="160" width="150" alt="poster" src={imageUpdated ? imageUrl : process.env.REACT_APP_API_URL+`/api/image?id=${event.poster_url}`} ></img>
              </Badge>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                // required
                id="eventName"
                name="eventName"
                label="Event name"
                value={name || ""}
                onChange={handleName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                // required
                id="shortdesc"
                name="shortdesc"
                label="Short Description"
                fullWidth
                value={desc || ""}
                onChange={handleDesc}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  // minDate={Date.now()}
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
                  // minDate={Date.now()}
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
                  // minDate={Date.now()}
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
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">Event Mode</InputLabel>
                <Select
                  fullWidth
                  native
                  label="Event Mode"
                  value={eventMode || ""}
                  onChange={handleEventMode}
                  inputProps={{
                    name: 'eventMode',
                    id: 'outlined-age-native-simple',
                  }}
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
                value={eventType || ""}
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
                value={eventThemes || ""}
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
            {/* <Grid item xs={12} lg={6}>
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
                // required
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

            </Grid> */}
            <Grid item xs={12}>
              <FormLabel component="legend">Entry Fee</FormLabel>
              <RadioGroup aria-label="address" name="address" value={feeType || ""} onChange={handleFeeTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="Free" control={<Radio color="default" />} label="Free" />
                <FormControlLabel value="Paid" control={<Radio color="default" />} label="Paid" />
              </RadioGroup>
            </Grid>
            {regMode !== "form" &&
              <Grid item xs={12} lg={6}>
                <TextField
                  autoComplete='off'
                  // required
                  id="regLink"
                  name="regLink"
                  label="Registration Link"
                  fullWidth
                  value={regLink || ""}
                  onChange={handleRegLink}
                />
              </Grid>}
            {feeType === "Paid" && <Grid item xs={12} lg={6}>
              <TextField
                autoComplete='off'
                // required
                id="regFees"
                name="regFees"
                value={regFees || ""}
                label="Registration Fees"
                onChange={handleFees}
                fullWidth
              // helperText={"Enter 0 if your event is free"}
              />
            </Grid>}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                disabled
                id="combo-box-demo"
                options={colleges}
                getOptionLabel={(option) => option}
                value={collegeName || ""}
                onChange={handleCollegeChange}
                renderInput={(params) => <TextField fullWidth required {...params} label="College" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <InputLabel htmlFor="outlined-age-native-simple">Registration</InputLabel>
                <Select
                  fullWidth
                  native
                  disabled
                  label="Registration"
                  inputProps={{
                    name: 'registrationMode',
                    id: 'outlined-age-native-simple',
                  }}
                  value={regMode || ""}
                // onChange={handleRegistrationModeChange}
                >
                  <option aria-label="None" value="" />
                  <option value="form">Our Platform(Ellipse)</option>
                  <option value="link">Other</option>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <TextField
                disabled
                autoComplete='off'
                required
                id="organizer"
                name="organizer"
                label="Organizer"
                fullWidth
                value={organizer || ""}
              />
            </Grid> */}
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={requirements.map((option) => option)}
                // defaultValue={[requirements[1]]}
                freeSolo
                value={selectedrequirements.length !== 0 && selectedrequirements}
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
              <FormLabel component="legend">Participation</FormLabel>
              <RadioGroup name="participanttype" value={participantType} onChange={handleParticipantsTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="open" control={<Radio color="default" />} label="Open for all" />
                <FormControlLabel value="onlycollege" control={<Radio color="default" />} label={`Only ${collegeName}`} />
              </RadioGroup>
            </Grid>
            {eventMode === "Offline" && <Grid item xs={12}>
              <FormLabel component="legend">Address</FormLabel>
              <RadioGroup aria-label="address" name="address" defaultValue="College/University" onChange={handleAddressTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="College/University" control={<Radio color="default" />} label="College/University" />
                <FormControlLabel value="Other" control={<Radio color="default" />} label="Others" />
              </RadioGroup>
            </Grid>}
            {eventMode === "Offline" &&
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
            }
            {eventMode === "Offline" && <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                options={colleges}
                getOptionLabel={(option) => option}
                // onChange={handleeventTypsChange}
                renderInput={(params) => <TextField fullWidth required {...params} label="Venue College" />}
              />
            </Grid>}
            <Grid item xs={12}>
              <TextField
                multiline={true}
                rows="5"
                variant='outlined'
                placeholder="Enter everything about your event in detail"
                autoComplete='off'
                // required
                value={about || ""}
                id="about"
                name="about"
                label="About"
                fullWidth
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
            {loading ? <CircularProgress color="primary" size={24} /> : "Save Changes"}
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

export default withRouter(EventEdit);



