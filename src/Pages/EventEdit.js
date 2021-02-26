import React from 'react';
// import Copyright from '../Components/copyright';
import { withRouter } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';

//MaterialUI imports
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { MuiPickersUtilsProvider, DateTimePicker, } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import RoundEditDialog from '../Components/EditRoundDialog';

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
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: theme.palette.primary.light
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
  const [addressType, setAddressType] = React.useState("");
  const [feeType, setFeeType] = React.useState("Free");
  const [collegeName, setCollegeName] = React.useState(null);
  const [regMode, setRegMode] = React.useState(null);
  const [organizer, setOrganizer] = React.useState(null);
  const [participantType, setParticipantsType] = React.useState("open");
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageurl] = React.useState(null);
  const [imageUpdated, setImageUpdated] = React.useState(false);
  const [venue, setVenue] = React.useState(null);
  const [venueCollege, setVenueCollege] = React.useState(null);
  const { vertical, horizontal, open, message, type } = state;
  const [colleges, setColleges] = React.useState([]);
  // const [collegesNames, setCollegesName] = React.useState([]);

  const token = localStorage.getItem('token');
  const [eventTags, setEventTags] = React.useState([]);
  const [requirements, setRequirements] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [platformDetails, setPlatformDetails] = React.useState('');
  const [isTeamed, setIsTeamed] = React.useState(false);
  const [teamSize, setTeamSize] = React.useState({});
  const [rounds, setRounds] = React.useState([]);
  const [rules, setRules] = React.useState(null);
  const [themes, setThemes] = React.useState(null);
  const [prizes, setPrizes] = React.useState([]);
  const [prizeTitle, setPrizeTitle] = React.useState(null);
  const [prize, setPrize] = React.useState(null);
  const [prizeDesc, setPrizeDesc] = React.useState(null);
  const [roundsDialogOpen, setRoundsDialogOpen] = React.useState(false);
  const [selectedEditRound, setSelectedEditRound] = React.useState({});



  // const eventTypes = ["Hackathon", "Coding Contest", "Webinar"];
  // const requirements = ["Laptop", "Basic HTML", "C++", "Machine Learning"];
  // const colleges = ["VIT University", "GITAM University", "SRM University"];

  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/colleges', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        setColleges(value);
        // value.forEach((v) => {
        //   setCollegesName((collegesNames) => [...collegesNames, v.name])
        // })
      })
    })
  }, [token])

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleendDateChange = (date) => {
    setendDate(date);
  };
  const handleRegEndDateChange = (date) => {
    setRegEndDate(date)
  };
  React.useEffect(() => {
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
    setVenue(event.venue);
    setVenueCollege(event.venue_college);
    setPlatformDetails(event.platform_details);
    setAddressType(event.venue_type);
    setIsTeamed(event.isTeamed);
    setTeamSize(event.team_size);
    setRounds(event.rounds);
    setRules(event.rules);
    setPrizes(event.prizes);
    setThemes(event.themes);
    if (event.o_allowed === true) {
      setParticipantsType("open")
    }
    else {
      setParticipantsType("onlycollege")
    }
    fetch(process.env.REACT_APP_API_URL + '/api/event/get_event_keywords', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      response.json().then(value => {
        value.forEach((v) => {
          if (v.type === "EventTags") {
            setEventTags((eventTags) => [...eventTags, v.title]);
          }
          else if (v.type === "EventRequirements") {
            setRequirements((r) => [...r, v.title]);
          }
          else {
            setEventTypes((r) => [...r, v.title]);
          }
        })
      })
    })

  }, [token, event])


  const handleClose = async (event, reason) => {
    if (message === "Saved changes successfully") {
      window.location.reload(false);
    }
    setState({ ...state, open: false });
  };

  const handleRoundEditDialogClose = () => {
    setRoundsDialogOpen(false);
  };

  async function handleEventPost(e) {
    e.preventDefault();
    setLoading(true);
    var oAllowed = false;
    console.log(rounds);
    if (participantType === "open") {
      oAllowed = true
    }
    try {
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
        reg_link: regLink,
        fee: regFees,
        about: about,
        fee_type: feeType,
        college: collegeName,
        organizer: organizer,
        requirements: selectedrequirements,
        o_allowed: oAllowed,
        reg_mode: regMode,
        venue_type: addressType,
        venue: venue,
        venue_college: venueCollege,
        platform_details: platformDetails,
        rounds: rounds,
        rules: rules,
        prizes: prizes,
        themes: themes
      };
      data = JSON.stringify(payload);
      fetch(process.env.REACT_APP_API_URL + '/api/updateevent', {
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
            event = value.event;
            if (imageUpdated) {
              var data2 = new FormData()
              data2.append("image", image);
              fetch(process.env.REACT_APP_API_URL + `/api/event/uploadimage?id=${event._id}`, {
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
            else {
              setLoading(false);
              setState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                message: "Saved changes successfully",
                type: "success"
              })
            }
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


  function handleAddressTypeChange(evemt, value) {
    setAddressType(value);
  }
  function handleName(event) {
    setName(event.target.value)
  }
  function handleDesc(event) {
    setDesc(event.target.value);
  }
  function handleFeeTypeChange(event, value) {
    setFeeType(value);
  }

  function handleCollegeChange(event, value) {
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
  function handleVenue(event) {
    setVenue(event.target.value);
  }
  // function handleVenueCollegeChange(event, value) {
  //   setVenueCollege(value);
  // }

  function handlePlatformChange(event) {
    setPlatformDetails(event.target.value);
  }

  function handleChange(event) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]);
      setImageurl(url)
      setImageUpdated(true);
    }

  }

  const handleRoundEditButton = (data) => () => {
    setSelectedEditRound(data);
    setRoundsDialogOpen(true);
  }

  const handlePrizeAddButton = () => {
    setPrizes(prizes => [...prizes, { title: prizeTitle,prize: prize, desc: prizeDesc }]);
    setPrizeTitle(null);
    setPrizeDesc(null);
  }

  const handlePrizeDeleteButton = (index, data) => () => {
    var currentPrizes = prizes;
    currentPrizes.splice(index);
    setPrizes(currentPrizes);
  }


  const handlePrizeFieldChange = (title) => (event) => {
    if (title === "title") {
        setPrizeTitle(event.target.value)
    }
    else if (title === "desc") {
        setPrizeDesc(event.target.value);
    }
    else {
        setPrize(event.target.value);
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
                <img height="160" width="150" alt="poster" src={imageUpdated ? imageUrl : process.env.REACT_APP_API_URL + `/api/image?id=${event.poster_url}`} ></img>
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
                  variant="dialog"
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
                  variant="dialog"
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
                  variant="dialog"
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
                <InputLabel htmlFor="event mode">Event Mode</InputLabel>
                <Select
                  fullWidth
                  native
                  label="Event Mode"
                  value={eventMode || ""}
                  onChange={handleEventMode}
                  inputProps={{
                    name: 'eventMode',
                    id: 'event mode',
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
                id="event type"
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
                id="event themes"
                options={eventTags.map((option) => option)}
                // defaultValue={[eventTypes[1]]}
                freeSolo
                value={eventThemes || []}
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
                id="collegename"
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
                    id: 'registration mode',
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
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                id="requirements"
                options={requirements.map((option) => option)}
                freeSolo
                value={selectedrequirements}
                onChange={handleRequirementsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Prerequisites" placeholder="Requirements" />
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
              <RadioGroup aria-label="address" name="address" value={addressType} onChange={handleAddressTypeChange} style={{ display: "inline" }}>
                <FormControlLabel value="College/University" control={<Radio color="default" />} label="College/University" />
                <FormControlLabel value="Other" control={<Radio color="default" />} label="Others" />
              </RadioGroup>
            </Grid>}
            <Grid item xs={12}>
              <FormLabel required component="legend">Participation Type</FormLabel>
              <RadioGroup required aria-label="address" name="teamed" value={isTeamed ? "team" : "individual"} style={{ display: "inline" }}>
                <FormControlLabel disabled value="individual" control={<Radio color="default" />} label="Individual" />
                <FormControlLabel disabled value="team" control={<Radio color="default" />} label="Team" />
              </RadioGroup>
            </Grid>
            {isTeamed && <Grid item xs={12} lg={6}>
              <TextField
                disabled
                autoComplete='off'
                required
                type="number"
                id="maxTeam"
                name="minTeam"
                label="Minimum Team Members"
                fullWidth
                value={teamSize.min_team_size || ""}
              // onChange={(e)=>{props.setMinTeamSize(e.target.value)}}
              />
            </Grid>}
            {isTeamed && <Grid item xs={12} lg={6}>
              <TextField
                disabled
                autoComplete='off'
                required
                type="number"
                id="maxTeam"
                name="maxTeam"
                label="Maximum Team Members"
                fullWidth
                value={teamSize.max_team_size || ""}
              // onChange={(e)=>{props.setMaxTeamSize(e.target.value)}}
              />
            </Grid>}
            {eventMode === "Offline" &&
              <Grid item xs={12} lg={6}>
                <TextField
                  autoComplete='off'
                  multiline={true}
                  helperText="Enter venue details (Ex: VIT, Vellore)"
                  rows="5"
                  variant='outlined'
                  // required
                  value={venue || ""}
                  onChange={handleVenue}
                  id="building"
                  name="building"
                  label="Room No & Building"
                  fullWidth
                />
              </Grid>
            }
            <Grid item xs={12}>
              <TextField
                multiline={true}
                rows="5"
                variant='outlined'
                placeholder="Enter short description of your event"
                autoComplete='off'
                // required
                value={about || ""}
                id="about"
                name="about"
                label="About"
                fullWidth
              />
            </Grid>
            {eventMode === "Online" && <Grid item xs={12}>
              <TextField
                multiline={true}
                helperText="Enter link for the platform, you can also add it later"
                rows="5"
                variant='outlined'
                placeholder="Enter details about your online platform"
                autoComplete='off'
                // required
                id="platform"
                name="platform"
                label="Platform"
                fullWidth
                onChange={handlePlatformChange}
                value={platformDetails || ""}
              />
            </Grid>}
            {regMode === "form" && <Grid item xs={12}>
              <Typography>Registration Fields</Typography>
              <Paper component="ul" className={classes.root}>
                {event.reg_fields.map((data) => {
                  return (
                    <li key={data.key}>
                      <Chip
                        label={data.title}
                        className={classes.chip}
                      />
                    </li>
                  );
                })}
              </Paper>
            </Grid>}

            {regMode === "form" && <Grid item xs={12}>
              <Typography>Rounds</Typography>
              <Paper component="ul" className={classes.root}>
                {rounds.map((data) => {
                  return (
                    <li key={data.key}>
                      <Chip
                        label={data.title}
                        className={classes.chip}
                      />
                      <IconButton onClick={handleRoundEditButton(data)}><EditIcon></EditIcon></IconButton>
                    </li>
                  );
                })}
              </Paper>
            </Grid>}
            <Grid item xs={12}>
              <TextField
                multiline={true}
                helperText="Enter all rules and regulation including eligibility for participation"
                rows="5"
                variant='outlined'
                placeholder="Enter all rules and regulation including eligibility for participation"
                autoComplete='off'
                onChange={(e) => { setRules(e.target.value) }}
                value={rules}
                id="rules"
                name="rules"
                label="Rules"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline={true}
                helperText="Enter your event themes like healthcare, fintech"
                rows="5"
                variant='outlined'
                placeholder="Enter your event themes like healthcare, fintech"
                autoComplete='off'
                onChange={(e) => { setThemes(e.target.value) }}
                value={themes}
                id="themes"
                name="themes"
                label="Themes"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.root}>
                <FormLabel component="legend">Prizes</FormLabel>
                <Box display="flex" style={{ marginTop: "10px" }}>
                  <Box>
                    <TextField onChange={handlePrizeFieldChange("title")} value={prizeTitle || ""} label="Prize Title" variant="outlined" style={{ marginRight: "5px" }}></TextField>
                  </Box>
                  <Box>
                  <TextField onChange={handlePrizeFieldChange("prize")} value={prize || ""} label="Prize" variant="outlined"></TextField>
                  </Box>
                  <Box>
                    <TextField onChange={handlePrizeFieldChange("desc")} value={prizeDesc || ""} label="Prize Description" variant="outlined"></TextField>
                  </Box>
                  <Box>
                    <IconButton onClick={handlePrizeAddButton}>Add</IconButton>
                  </Box>
                </Box>
              </FormControl>
            </Grid>
            <Grid>
              <Paper component="ul" className={classes.root}>
                {prizes.map((data, index) => {
                  return (
                    <li key={data.key}>
                      <Chip
                        label={data.title}
                        onDelete={handlePrizeDeleteButton(index, data)}
                        className={classes.chip}
                      />
                    </li>
                  );
                })}
              </Paper>
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
      <RoundEditDialog
        open={roundsDialogOpen}
        handleClose={handleRoundEditDialogClose}
        rounds={rounds}
        setRounds={setRounds}
        roundData={selectedEditRound}
      ></RoundEditDialog>
    </Container>
  );
}

export default withRouter(EventEdit);
